import * as THREE from 'three';
import { batchStatic } from './primitives.js';
import { createLandmark } from './buildings.js';

export function createEnvironment(scene, assets, zones) {
  const { mesh, material } = assets;
  const ground = new THREE.Group();
  ground.name = 'district';
  scene.add(ground);
  const buildings = [];
  mesh(ground, 'box', [60, 0.2, 60], [5.5, -0.18, 6], '#343d30');
  mesh(ground, 'box', [11.4, 0.1, 12.4], [5.5, -0.05, 6], '#59634a');
  const road = '#454947',
    curb = '#929080';
  for (const [x, z, w, d] of [
    [5.5, 6, 1.4, 12],
    [5.5, 4.7, 11, 1.2],
    [5.5, 8.85, 11, 1.15],
  ]) {
    mesh(ground, 'box', [w + 0.16, 0.035, d + 0.12], [x, 0, z], curb);
    mesh(ground, 'box', [w, 0.024, d], [x, 0.025, z], road);
  }
  for (let i = 0; i < 12; i++)
    mesh(ground, 'box', [0.025, 0.006, 0.32], [5.5, 0.041, i + 0.2], '#b4aa73');
  for (const z of [4.7, 8.85])
    for (let i = 0; i < 11; i++)
      mesh(ground, 'box', [0.3, 0.006, 0.025], [i + 0.2, 0.042, z], '#c3b995');
  for (let i = 0; i < 50; i++) {
    const x = ((i * 1.731) % 10.8) + 0.1,
      z = i % 2 ? 4.9 : 8.6;
    const crack = mesh(ground, 'box', [0.13, 0.003, 0.008], [x, 0.044, z], '#262f29');
    crack.rotation.y = i * 2.3;
  }
  for (const zone of zones) {
    const group = createLandmark(assets, zone);
    scene.add(group);
    batchStatic(group);
    group.children.forEach((part) => {
      part.material = part.material.clone();
      part.userData.baseOpacity = part.material.opacity;
      part.userData.baseTransparent = part.material.transparent;
      part.userData.baseDepthWrite = part.material.depthWrite;
    });
    buildings.push({ group, bounds: new THREE.Box3().setFromObject(group) });
  }
  // Existing central collision footprint becomes a concrete rainwater reservoir.
  mesh(ground, 'box', [1.75, 0.16, 1.65], [5.525, 0.08, 6.625], '#868d7b');
  mesh(ground, 'box', [1.45, 0.02, 1.35], [5.525, 0.18, 6.625], '#425e55');
  for (const side of [-1, 1]) {
    mesh(ground, 'box', [1.75, 0.25, 0.1], [5.525, 0.2, 6.625 + side * 0.78], '#a0a18c');
    mesh(ground, 'box', [0.1, 0.25, 1.6], [5.525 + side * 0.82, 0.2, 6.625], '#a0a18c');
  }
  // Vegetation is outside walkable streets; broadleaf crowns are volumetric meshes.
  for (let i = 0; i < 32; i++) {
    const edge = i % 4,
      along = (i * 1.71) % 13;
    const x = edge === 0 ? -0.65 : edge === 1 ? 11.7 : along - 1;
    const z = edge === 2 ? -0.7 : edge === 3 ? 12.8 : along;
    const h = 1.3 + (i % 3) * 0.3;
    mesh(ground, 'cylinder', [0.13, h, 0.13], [x, h / 2, z], '#665542');
    for (let j = 0; j < 3; j++)
      mesh(
        ground,
        'sphere',
        [0.9, 0.9, 0.85],
        [x + Math.sin(j * 2.1) * 0.27, h + j * 0.14, z + Math.cos(j * 2.1) * 0.23],
        ['#475a39', '#536441', '#68714b'][j],
      );
  }
  // Street lamps and benches sit within the reservoir's existing obstacle boundary.
  for (const x of [4.7, 6.35]) {
    mesh(ground, 'cylinder', [0.035, 1.9, 0.035], [x, 0.95, 5.8], '#42493c');
    mesh(ground, 'box', [0.24, 0.06, 0.13], [x, 1.92, 5.8], '#575d4a');
    mesh(
      ground,
      'box',
      [0.2, 0.025, 0.1],
      [x, 1.88, 5.8],
      material('#efd8a7', { emissive: '#a58e53', emissiveIntensity: 0.4 }),
    );
  }
  batchStatic(ground);
  return buildings;
}
