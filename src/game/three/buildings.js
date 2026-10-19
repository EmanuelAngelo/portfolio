import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import fontData from './sign-font.js';
const font = new FontLoader().parse(fontData);

/** Every landmark fits the existing collision footprint; +Z is its street entrance. */
export function createLandmark(assets, zone) {
  const group = new THREE.Group();
  group.name = `building-${zone.id}`;
  group.position.set(zone.x + 0.5, 0, zone.y + 0.4);
  const { mesh, material, geometry } = assets;
  const add = (shape, size, position, color, options) =>
    mesh(group, shape, size, position, color, options);
  const box = (size, position, color, options) => add('box', size, position, color, options);
  const steel = '#86969a',
    concrete = '#b7b6a6',
    glass = material('#416a77', { metalness: 0.35, roughness: 0.22 });
  function beam(from, to, width = 0.035, color = steel) {
    const start = new THREE.Vector3(...from),
      end = new THREE.Vector3(...to);
    const object = add(
      'cylinder',
      [width, start.distanceTo(end), width],
      start.clone().add(end).multiplyScalar(0.5).toArray(),
      color,
    );
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
    return object;
  }
  function sign(text, x, y, z, size = 0.12, color = '#f3f0dc') {
    const g = geometry(
      `sign:${text}:${size}`,
      () =>
        new TextGeometry(text, { font, size, depth: 0.006, curveSegments: 1, bevelEnabled: false }),
    );
    g.computeBoundingBox();
    const object = new THREE.Mesh(g, material(color));
    object.position.set(x - g.boundingBox.max.x / 2, y, z);
    group.add(object);
  }
  function windows(x, z, width, height, rows = 2, columns = 5) {
    box([width, height, 0.025], [x, height / 2 + 0.25, z], glass);
    for (let i = 0; i <= columns; i++)
      box(
        [0.024, height, 0.04],
        [x - width / 2 + (i * width) / columns, height / 2 + 0.25, z + 0.02],
        '#b1bfc0',
      );
    for (let i = 0; i <= rows; i++)
      box([width, 0.025, 0.045], [x, 0.25 + (i * height) / rows, z + 0.025], '#abb4af');
  }
  function roof(x, z, width, depth, y) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(0, 0.28);
    shape.lineTo(width / 2, 0);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    const r = new THREE.Mesh(g, material('#a75637'));
    r.position.set(x, y, z - depth / 2);
    r.castShadow = true;
    group.add(r);
    for (let i = 0; i <= 12; i++) {
      const rz = z - depth / 2 + (i * depth) / 12;
      beam([x - width / 2, y + 0.005, rz], [x, y + 0.285, rz], 0.012, '#ce7750');
      beam([x, y + 0.285, rz], [x + width / 2, y + 0.005, rz], 0.012, '#ce7750');
    }
  }
  function door(x, z, y = 0.46) {
    box([0.34, 0.72, 0.035], [x, y, z], '#274a4c');
    box([0.015, 0.15, 0.035], [x + 0.1, y - 0.05, z + 0.025], '#d8dac5');
  }
  function cross(x, y, z, color = '#36837a') {
    box([0.12, 0.4, 0.05], [x, y, z], color);
    box([0.36, 0.12, 0.055], [x, y, z], color);
  }
  box([2.5, 0.1, 1.95], [0.1, 0.04, 0], '#909484');
  if (zone.id === 'origin') {
    group.userData.landmark = 'barracks';
    // U-shaped barracks and parade court, inspired by the supplied Brazilian Army reference.
    box([2.3, 1.05, 0.52], [0.05, 0.6, -0.55], '#d3d3b7');
    roof(0.05, -0.55, 2.4, 0.64, 1.14);
    for (const side of [-1, 1]) {
      box([0.52, 1.05, 1.25], [side * 0.86, 0.6, 0.14], '#d3d3b7');
      roof(side * 0.86, 0.14, 0.64, 1.39, 1.14);
      box([0.53, 0.12, 1.26], [side * 0.86, 0.28, 0.14], '#3b6551');
      windows(side * 0.86, 0.777, 0.4, 0.7, 2, 2);
      for (let i = 0; i < 4; i++)
        box([0.025, 0.3, 0.15], [side * 0.585, 0.85, -0.3 + i * 0.27], '#365a4e');
    }
    windows(0, -0.275, 1.15, 0.65, 2, 5);
    box([1.1, 0.018, 0.9], [0, 0.105, 0.2], '#66764b');
    box([0.3, 0.025, 1.2], [0, 0.12, 0.18], '#aaa78e');
    beam([0.35, 0.1, 0.5], [0.35, 1.7, 0.5], 0.025, '#c5c5b0');
    box([0.4, 0.25, 0.012], [0.56, 1.5, 0.5], '#207447');
    const diamond = box([0.17, 0.17, 0.014], [0.56, 1.5, 0.51], '#e1bf40');
    diamond.rotation.z = Math.PI / 4;
    add('sphere', [0.105, 0.105, 0.02], [0.56, 1.5, 0.524], '#2c5594');
    box([1, 0.15, 0.07], [0, 0.98, -0.24], '#345941');
    sign('EXERCITO', 0, 0.94, -0.195, 0.115);
    sign('BASE', -0.86, 1.04, 0.8, 0.08);
  } else if (zone.id === 'energy') {
    group.userData.landmark = 'substation';
    box([2.4, 0.018, 1.8], [0.1, 0.1, 0], '#a0a49a');
    // Steel portal gantries, cross-bracing, insulators and curved overhead conductors.
    for (const z of [-0.65, 0.45]) {
      for (const x of [-0.92, 1.05]) {
        for (const offset of [-0.07, 0.07])
          beam([x + offset, 0.12, z], [x + offset, 1.65, z], 0.025);
        for (let j = 0; j < 5; j++) {
          beam([x - 0.07, 0.12 + j * 0.3, z], [x + 0.07, 0.42 + j * 0.3, z], 0.014);
          beam([x + 0.07, 0.12 + j * 0.3, z], [x - 0.07, 0.42 + j * 0.3, z], 0.014);
        }
      }
      beam([-1, 1.62, z], [1.15, 1.62, z], 0.06);
      beam([-1, 1.77, z], [1.15, 1.77, z], 0.035);
      for (let j = 0; j < 9; j++)
        beam([-1 + j * 0.24, 1.62, z], [-0.76 + j * 0.24, 1.77, z], 0.018);
    }
    for (const x of [-0.55, 0.25, 0.75]) {
      box([0.45, 0.43, 0.56], [x, 0.36, -0.1], '#788980');
      for (let i = 0; i < 6; i++)
        box([0.028, 0.37, 0.64], [x - 0.2 + i * 0.08, 0.36, -0.1], '#b2b8a6');
      for (const z of [-0.3, 0.12]) {
        beam([x, 0.58, z], [x, 1.12, z], 0.04, '#5c4835');
        for (let i = 0; i < 6; i++)
          add('cylinder', [0.11, 0.025, 0.11], [x, 0.64 + i * 0.075, z], '#7f6b51');
      }
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, 1.75, -0.65),
        new THREE.Vector3(x, 1.42, -0.1),
        new THREE.Vector3(x, 1.75, 0.45),
      ]);
      const cable = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 12, 0.012, 4, false),
        material('#343b37'),
      );
      group.add(cable);
    }
    for (let i = 0; i < 16; i++) {
      const x = -1.08 + i * 0.15;
      if (Math.abs(x) < 0.25) continue;
      beam([x, 0.1, 0.87], [x, 0.6, 0.87], 0.014, '#66766b');
    }
    box([0.62, 0.16, 0.04], [0, 0.72, 0.82], '#c8a442');
    sign('ENERGIA', 0, 0.68, 0.85, 0.09, '#232e2d');
  } else if (zone.id === 'erp') {
    group.userData.landmark = 'integration-hub';
    // Long glazed office wing, second stepped wing and an independent corporate totem.
    box([1.65, 1.65, 1.35], [-0.3, 0.9, -0.1], '#3b515d');
    box([0.65, 1.25, 1.45], [0.85, 0.7, 0], '#738b94');
    windows(-0.3, 0.59, 1.65, 1.4, 4, 7);
    windows(0.85, 0.74, 0.6, 1.03, 3, 2);
    for (let i = 0; i < 6; i++) box([0.025, 1.4, 1.36], [-1.1 + i * 0.31, 0.95, -0.1], '#b5c8ce');
    box([1.85, 0.075, 1.5], [-0.3, 1.78, -0.1], '#b4c3c1');
    box([0.85, 0.07, 0.4], [-0.15, 0.86, 0.72], '#39a9bd');
    door(-0.15, 0.615);
    box([0.56, 0.6, 0.12], [0.85, 0.4, 0.78], '#456273');
    sign('TOTVS', 0.85, 0.47, 0.85, 0.105);
    sign('PVT / RM', -0.3, 1.5, 0.65, 0.14);
    for (let i = 0; i < 4; i++)
      add('sphere', [0.2, 0.14, 0.16], [-0.95 + i * 0.2, 0.19, 0.8], '#5a754c');
  } else if (zone.id === 'education') {
    group.userData.landmark = 'university-campus';
    box([2.25, 1.15, 0.72], [0, 0.66, -0.45], '#cccbb9');
    box([0.55, 1.4, 1.35], [-0.87, 0.79, -0.02], '#c5c2b3');
    box([0.55, 0.9, 1.22], [0.87, 0.54, -0.04], '#bbbeb5');
    windows(0, -0.07, 1.3, 0.87, 2, 5);
    windows(-0.87, 0.67, 0.46, 1.12, 3, 2);
    windows(0.87, 0.59, 0.45, 0.67, 2, 2);
    box([1.7, 0.055, 0.98], [0, 1.04, 0.42], '#96acac', { transparent: true, opacity: 0.72 });
    for (const x of [-0.75, 0.75])
      box([0.095, 0.98, 0.1], [x, 0.55, 0.79], x < 0 ? '#b6a22e' : '#59334b');
    for (let i = 0; i < 7; i++) box([0.025, 0.06, 1.02], [-0.8 + i * 0.27, 1.08, 0.42], '#ced4ca');
    box([1.8, 0.12, 0.22], [0, 0.13, 0.75], '#ded5ba');
    door(0, -0.04);
    sign('UNDB', 0, 0.74, -0.025, 0.19);
    sign('CAMPUS', -0.86, 1.24, 0.72, 0.075, '#624251');
    // Open book sculpture in the forecourt.
    const left = box([0.17, 0.035, 0.24], [0.48, 0.3, 0.65], '#ede4c4');
    left.rotation.z = -0.2;
    const right = box([0.17, 0.035, 0.24], [0.65, 0.3, 0.65], '#ede4c4');
    right.rotation.z = 0.2;
    box([0.15, 0.15, 0.15], [0.56, 0.19, 0.65], '#6d6b62');
  } else if (zone.id === 'health') {
    group.userData.landmark = 'hospital';
    box([1.1, 1.8, 1.38], [-0.45, 0.99, -0.06], '#d4dad0');
    box([1.15, 0.9, 0.85], [0.62, 0.54, -0.3], '#adbdb1');
    windows(-0.45, 0.65, 1, 1.43, 4, 4);
    windows(0.62, 0.15, 0.95, 0.6, 2, 3);
    box([1.25, 0.1, 1.48], [-0.45, 1.93, -0.06], '#8d9c91');
    add('cylinder', [0.95, 0.03, 0.95], [-0.45, 2, -0.06], '#3e6e61');
    for (const x of [-0.59, -0.31]) box([0.055, 0.015, 0.36], [x, 2.022, -0.06], '#e6e3c4');
    box([0.3, 0.015, 0.055], [-0.45, 2.023, -0.06], '#e6e3c4');
    box([1.3, 0.09, 0.55], [0.5, 0.83, 0.58], '#36968d');
    for (const x of [-0.05, 1.05]) beam([x, 0.1, 0.8], [x, 0.82, 0.8], 0.04, '#b6c8bd');
    door(0.35, 0.17);
    cross(-0.9, 1.58, 0.69);
    sign('HUUFMA', -0.45, 1.81, 0.71, 0.1, '#286b63');
    // Ambulance parked under the emergency canopy, away from the playable road.
    box([0.32, 0.27, 0.57], [0.72, 0.3, 0.48], '#e1e0cd');
    box([0.27, 0.2, 0.2], [0.72, 0.27, 0.82], '#cedbd2');
    box([0.25, 0.1, 0.02], [0.72, 0.32, 0.93], '#4c7478');
    box([0.18, 0.035, 0.07], [0.72, 0.46, 0.55], '#d37e38');
    for (const x of [0.55, 0.89])
      for (const z of [0.3, 0.78]) add('sphere', [0.07, 0.13, 0.13], [x, 0.16, z], '#29352d');
    box([0.33, 0.05, 0.58], [0.72, 0.29, 0.48], '#3d927e');
  } else {
    group.userData.landmark = 'research-laboratory';
    // Cylindrical research tower with glass laboratory wing and rooftop exhaust systems.
    add('cylinder', [0.95, 1.3, 0.95], [-0.6, 0.74, -0.15], '#abb7b2');
    add('sphere', [1.04, 0.55, 1.04], [-0.6, 1.42, -0.15], '#668c94', {
      metalness: 0.5,
      roughness: 0.25,
    });
    box([1.25, 1.05, 0.06], [0.48, 0.63, -0.675], '#bcc6ba');
    box([0.06, 1.05, 1.25], [-0.115, 0.63, -0.08], '#bcc6ba');
    box([0.06, 1.05, 1.25], [1.075, 0.63, -0.08], '#bcc6ba');
    box([1.25, 0.05, 1.25], [0.48, 0.13, -0.08], '#d9dece');
    // A clear front allows the actual 3D workbench and sample bottles to be seen.
    box([1.18, 0.76, 0.025], [0.48, 0.67, 0.56], '#76c8cb', {
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    });
    for (const x of [-0.1, 0.48, 1.06]) box([0.025, 0.85, 0.035], [x, 0.65, 0.58], '#d7dfd3');
    box([1.3, 0.09, 1.32], [0.48, 1.2, -0.08], '#65787b');
    box([0.95, 0.055, 0.3], [0.48, 0.48, 0.27], '#e3e7d8');
    for (const x of [0.13, 0.82]) box([0.04, 0.35, 0.22], [x, 0.28, 0.27], '#a6b2a3');
    for (let i = 0; i < 4; i++) {
      add(
        'sphere',
        [0.11, 0.13, 0.11],
        [0.1 + i * 0.22, 0.57, 0.3],
        ['#4bb4aa', '#a99cc8', '#d6b25b', '#74a7cc'][i],
      );
      add('cylinder', [0.04, 0.09, 0.04], [0.1 + i * 0.22, 0.66, 0.3], '#d2e1dc');
    }
    for (const x of [0.15, 0.75]) {
      add('cylinder', [0.17, 0.53, 0.17], [x, 1.48, -0.3], '#a3afaa');
      add('cone', [0.29, 0.13, 0.29], [x, 1.8, -0.3], '#657773');
    }
    door(-0.6, 0.35);
    box([0.7, 0.2, 0.045], [0.48, 1.07, 0.6], '#456e80');
    sign('LAB', 0.48, 1.01, 0.63, 0.14);
    // Molecular sculpture: visible even at a distance.
    for (const [x, y, z] of [
      [-0.6, 1.9, -0.15],
      [-0.85, 2.12, -0.15],
      [-0.38, 2.12, -0.15],
    ])
      add('sphere', [0.14, 0.14, 0.14], [x, y, z], '#78c6c1');
    beam([-0.6, 1.9, -0.15], [-0.85, 2.12, -0.15], 0.035, '#d1e1d7');
    beam([-0.6, 1.9, -0.15], [-0.38, 2.12, -0.15], 0.035, '#d1e1d7');
  }
  return group;
}
