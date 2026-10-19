import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Shared geometries and materials; disposed together with the world. */
export function createAssets() {
  const geometries = new Map();
  const materials = new Map();
  function material(color, options = {}) {
    const key = color + JSON.stringify(options);
    if (!materials.has(key))
      materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.92, ...options }));
    return materials.get(key);
  }
  function geometry(key, make) {
    if (!geometries.has(key)) geometries.set(key, make());
    return geometries.get(key);
  }
  function mesh(parent, shape, size, position, color, options = {}) {
    const g = geometry(shape, () => {
      if (shape === 'round') return new RoundedBoxGeometry(1, 1, 1, 2, 0.12);
      if (shape === 'sphere') return new THREE.SphereGeometry(0.5, 12, 8);
      if (shape === 'cylinder') return new THREE.CylinderGeometry(0.5, 0.5, 1, 10);
      if (shape === 'cone') return new THREE.ConeGeometry(0.5, 1, 9);
      return new THREE.BoxGeometry(1, 1, 1);
    });
    const object = new THREE.Mesh(g, typeof color === 'string' ? material(color, options) : color);
    object.scale.set(...size);
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  return { material, geometry, mesh };
}

/** Merge static parts by material. Each building keeps its own group for occlusion fading. */
export function batchStatic(group) {
  group.updateMatrixWorld(true);
  const batches = new Map();
  const old = [];
  const inverse = group.matrixWorld.clone().invert();
  group.traverse((object) => {
    if (!object.isMesh) return;
    const geometry = object.geometry.clone();
    geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld));
    if (!batches.has(object.material)) batches.set(object.material, []);
    batches.get(object.material).push(geometry);
    old.push(object);
  });
  old.forEach((object) => object.removeFromParent());
  for (const [material, geometries] of batches) {
    const geometry = mergeGeometries(geometries);
    geometries.forEach((item) => item.dispose());
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
}

export function disposeScene(scene) {
  const geometries = new Set(),
    materials = new Set(),
    textures = new Set();
  scene.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.material) for (const material of [object.material].flat()) materials.add(material);
  });
  for (const material of materials) {
    for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    material.dispose();
  }
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => texture.dispose());
  scene.clear();
}
