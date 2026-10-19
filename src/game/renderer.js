import * as THREE from 'three';
import { configureCamera } from './geometry.js';
import { createAssets, disposeScene } from './three/primitives.js';
import { createEnvironment } from './three/environment.js';
import { createSurvivor } from './three/survivor.js';

/** Scene creation is independent from the GPU so models and animation can be tested in Node. */
export function createWorldScene(zones) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#252f2b');
  scene.fog = new THREE.FogExp2('#252f2b', 0.032);
  scene.add(new THREE.HemisphereLight('#d9dfcd', '#414a37', 2.1));
  const sun = new THREE.DirectionalLight('#fff0cc', 3);
  sun.position.set(-3, 12, 5);
  sun.target.position.set(5.5, 0, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -13,
    right: 13,
    top: 13,
    bottom: -13,
    near: 0.1,
    far: 40,
  });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);
  const assets = createAssets();
  const buildings = createEnvironment(scene, assets, zones);
  const survivor = createSurvivor(assets);
  scene.add(survivor.root);
  const marker = new THREE.Mesh(
    new THREE.RingGeometry(0.13, 0.17, 32),
    new THREE.MeshBasicMaterial({ color: '#d0bd85', side: THREE.DoubleSide, depthWrite: false }),
  );
  marker.rotation.x = -Math.PI / 2;
  marker.visible = false;
  scene.add(marker);
  const camera = new THREE.PerspectiveCamera(44, 1, 0.05, 100);
  const ray = new THREE.Ray();
  let lastTime = null;
  function update(state, config, time = 0) {
    const dt = lastTime === null ? 1 / 60 : Math.min(0.05, Math.max(0, time - lastTime));
    lastTime = time;
    configureCamera(camera, config);
    survivor.update(state, time, dt);
    marker.visible = Boolean(state.target);
    if (state.target) {
      marker.position.set(state.target.x, 0.06, state.target.y);
      marker.scale.setScalar(1 + Math.sin(time * 4) * 0.1);
    }
    // Fade only structures between camera and character; roofs never conceal the player.
    const subject = new THREE.Vector3(state.player.x, 0.6, state.player.y);
    const distance = camera.position.distanceTo(subject);
    ray.set(camera.position, subject.clone().sub(camera.position).normalize());
    for (const { group, bounds } of buildings) {
      const hit = ray.intersectBox(bounds, new THREE.Vector3());
      const blocked = Boolean(hit && hit.distanceTo(camera.position) < distance);
      group.children.forEach((part) => {
        part.material.transparent = blocked || part.userData.baseTransparent;
        part.material.opacity = blocked
          ? Math.min(0.22, part.userData.baseOpacity)
          : part.userData.baseOpacity;
        part.material.depthWrite = !blocked && part.userData.baseDepthWrite;
        part.castShadow = !blocked;
      });
    }
    scene.updateMatrixWorld(true);
  }
  return { scene, camera, survivor, marker, buildings, update, dispose: () => disposeScene(scene) };
}

export function createWorldRenderer(
  canvas,
  zones,
  rendererFactory = (options) => new THREE.WebGLRenderer(options),
) {
  const gpu = rendererFactory({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  gpu.outputColorSpace = THREE.SRGBColorSpace;
  gpu.toneMapping = THREE.ACESFilmicToneMapping;
  gpu.toneMappingExposure = 1.08;
  gpu.shadowMap.enabled = true;
  gpu.shadowMap.type = THREE.PCFSoftShadowMap;
  const world = createWorldScene(zones);
  let dimensions = '';
  return {
    draw(state, camera, time) {
      const key = `${camera.width}:${camera.height}`;
      if (key !== dimensions) {
        gpu.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, camera.compact ? 1.5 : 2));
        gpu.setSize(camera.width, camera.height, false);
        dimensions = key;
      }
      world.update(state, camera, time);
      gpu.render(world.scene, world.camera);
    },
    dispose() {
      world.dispose();
      gpu.dispose();
    },
  };
}
