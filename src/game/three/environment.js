import * as THREE from 'three';
import { batchStatic } from './primitives.js';

function masonryTexture() {
  const size = 128,
    data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const mortar = y % 16 < 2 || (x + (Math.floor(y / 16) % 2) * 16) % 32 < 2;
      const grain = ((x * 73 + y * 37 + x * y * 11) % 21) - 10;
      const color = mortar ? 106 : 190 + grain;
      const i = (y * size + x) * 4;
      data[i] = color;
      data[i + 1] = color;
      data[i + 2] = color;
      data[i + 3] = 255;
    }
  const texture = new THREE.DataTexture(data, size, size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

export function createEnvironment(scene, assets, zones) {
  const { mesh, material } = assets;
  const ground = new THREE.Group();
  ground.name = 'district';
  scene.add(ground);
  const brickMap = masonryTexture();
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
    const group = new THREE.Group();
    group.name = `building-${zone.id}`;
    scene.add(group);
    const x = zone.x + 0.5,
      z = zone.y + 0.4;
    const height = zone.id === 'erp' ? 2.1 : zone.id === 'education' ? 1.2 : 1.5;
    const colors = {
      energy: '#9b8766',
      erp: '#707e74',
      education: '#969082',
      health: '#b4b4a1',
      projects: '#896d59',
      contact: '#817c65',
    };
    const wall = new THREE.MeshStandardMaterial({
      color: colors[zone.id] || '#817c65',
      map: brickMap,
      bumpMap: brickMap,
      bumpScale: 0.015,
      roughness: 0.95,
    });
    mesh(group, 'box', [2.45, 0.1, 1.95], [x, 0.04, z], '#8c8b7b');
    mesh(group, 'box', [2.05, height, 1.6], [x, height / 2 + 0.09, z], wall);
    mesh(group, 'box', [2.16, 0.1, 1.72], [x, height + 0.1, z], '#53594f');
    for (const side of [-1, 1]) {
      mesh(group, 'box', [2.2, 0.16, 0.06], [x, height + 0.21, z + side * 0.84], '#858575');
      mesh(group, 'box', [0.06, 0.16, 1.7], [x + side * 1.07, height + 0.21, z], '#858575');
    }
    // Roof vents and ductwork; all accessories remain within the solid building footprint.
    mesh(group, 'box', [0.48, 0.24, 0.4], [x - 0.4, height + 0.27, z - 0.25], '#727b70');
    for (let i = 0; i < 5; i++)
      mesh(
        group,
        'box',
        [0.35, 0.014, 0.025],
        [x - 0.4, height + 0.4, z - 0.4 + i * 0.06],
        '#303d36',
      );
    mesh(group, 'cylinder', [0.1, 0.4, 0.1], [x + 0.7, height + 0.32, z - 0.4], '#989b8e');
    const rows = zone.id === 'erp' ? 3 : 1;
    for (let row = 0; row < rows; row++)
      for (const side of [-1, 1]) {
        const wx = x + side * 0.65,
          wy = 0.72 + row * 0.5;
        mesh(group, 'box', [0.42, 0.43, 0.04], [wx, wy, z + 0.82], '#464e43');
        mesh(
          group,
          'box',
          [0.34, 0.35, 0.025],
          [wx, wy, z + 0.846],
          row === 1 ? '#a69d70' : '#53675f',
        );
        mesh(group, 'box', [0.025, 0.35, 0.03], [wx, wy, z + 0.87], '#afb2a1');
        mesh(group, 'box', [0.4, 0.04, 0.09], [wx, wy - 0.23, z + 0.85], '#bab6a3');
      }
    mesh(group, 'box', [0.38, 0.78, 0.035], [x, 0.48, z + 0.82], '#35453f');
    mesh(group, 'box', [0.29, 0.29, 0.025], [x, 0.66, z + 0.85], '#8c9f8f');
    mesh(group, 'box', [0.025, 0.08, 0.035], [x + 0.12, 0.43, z + 0.875], '#cab995');
    mesh(group, 'box', [0.55, 0.055, 0.23], [x, 0.06, z + 0.94], '#aca48c');
    mesh(group, 'box', [0.65, 0.07, 0.28], [x, 0.95, z + 0.88], '#474f40');
    // A restrained colored fascia identifies each professional destination.
    mesh(group, 'box', [1.5, 0.16, 0.05], [x, Math.min(height - 0.12, 1.19), z + 0.83], zone.c);
    if (zone.id === 'health') {
      mesh(group, 'box', [0.13, 0.5, 0.06], [x, height + 0.43, z + 0.75], '#b75b4a');
      mesh(group, 'box', [0.45, 0.13, 0.06], [x, height + 0.43, z + 0.75], '#b75b4a');
    }
    if (zone.id === 'energy') {
      mesh(group, 'cylinder', [0.26, 0.65, 0.26], [x + 0.65, height + 0.47, z + 0.1], '#969c8b');
      for (let i = 0; i < 3; i++)
        mesh(
          group,
          'cylinder',
          [0.37, 0.035, 0.37],
          [x + 0.65, height + 0.3 + i * 0.15, z + 0.1],
          '#555f50',
        );
    }
    if (zone.id === 'projects') {
      const solar = mesh(group, 'box', [0.8, 0.035, 0.65], [x + 0.4, height + 0.28, z], '#2d444d');
      solar.rotation.x = -0.22;
    }
    batchStatic(group);
    group.children.forEach((part) => {
      part.material = part.material.clone();
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
