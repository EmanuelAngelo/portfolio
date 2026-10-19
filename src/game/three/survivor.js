import * as THREE from 'three';

/** Original procedural 3D model. Front is local +Z; all clothing is actual geometry. */
export function createSurvivor(assets) {
  const root = new THREE.Group();
  root.name = 'survivor';
  const body = new THREE.Group();
  root.add(body);
  const { mesh } = assets;
  const skin = '#e2c3a7',
    shirt = '#1d211f',
    pants = '#50594d',
    leather = '#292c25';
  // Adult proportions: eight head lengths, tapered torso and articulated limbs.
  mesh(body, 'round', [0.29, 0.32, 0.17], [0, 0.63, 0], shirt);
  mesh(body, 'round', [0.24, 0.14, 0.16], [0, 0.44, 0], pants);
  mesh(body, 'box', [0.25, 0.025, 0.17], [0, 0.485, 0], '#25291f');
  mesh(body, 'box', [0.04, 0.025, 0.008], [0.015, 0.485, 0.09], '#91866a');
  mesh(body, 'cylinder', [0.075, 0.07, 0.075], [0, 0.82, 0], skin);
  const head = new THREE.Group();
  head.position.y = 0.91;
  body.add(head);
  mesh(head, 'sphere', [0.16, 0.205, 0.16], [0, 0, 0], skin);
  mesh(head, 'round', [0.105, 0.07, 0.09], [0, -0.06, 0.035], skin);
  mesh(head, 'round', [0.035, 0.045, 0.035], [0, -0.008, 0.085], '#cda98c');
  for (const side of [-1, 1]) {
    mesh(head, 'sphere', [0.03, 0.05, 0.026], [side * 0.08, -0.005, 0], skin);
    mesh(head, 'sphere', [0.014, 0.009, 0.006], [side * 0.035, 0.025, 0.074], '#272a23');
    mesh(head, 'box', [0.025, 0.006, 0.007], [side * 0.034, 0.04, 0.073], '#20231e');
  }
  const hairGeometry = assets.geometry(
    'hair',
    () => new THREE.SphereGeometry(0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.56),
  );
  const hair = new THREE.Mesh(hairGeometry, assets.material('#141816'));
  hair.scale.set(0.174, 0.225, 0.175);
  hair.position.set(0, 0.008, -0.008);
  hair.castShadow = true;
  head.add(hair);
  mesh(head, 'round', [0.145, 0.075, 0.04], [0, -0.005, -0.065], '#171c18');
  const legs = [],
    knees = [],
    arms = [],
    elbows = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(side * 0.075, 0.43, 0);
    body.add(leg);
    legs.push(leg);
    mesh(leg, 'round', [0.105, 0.2, 0.12], [0, -0.09, 0], pants);
    mesh(leg, 'round', [0.035, 0.075, 0.1], [side * 0.055, -0.08, 0], '#626a55');
    const knee = new THREE.Group();
    knee.position.y = -0.19;
    leg.add(knee);
    knees.push(knee);
    mesh(knee, 'round', [0.082, 0.19, 0.085], [0, -0.085, 0], pants);
    mesh(knee, 'round', [0.095, 0.065, 0.17], [0, -0.18, 0.04], leather);
    mesh(knee, 'box', [0.097, 0.016, 0.17], [0, -0.21, 0.04], '#171b18');
    for (let n = 0; n < 3; n++)
      mesh(knee, 'box', [0.065, 0.006, 0.009], [0, -0.15, 0.03 + n * 0.025], '#6e705f');
    const arm = new THREE.Group();
    arm.position.set(side * 0.165, 0.755, 0);
    body.add(arm);
    arms.push(arm);
    mesh(arm, 'round', [0.105, 0.12, 0.13], [0, -0.045, 0], shirt);
    mesh(arm, 'cylinder', [0.07, 0.12, 0.07], [0, -0.13, 0], skin);
    const elbow = new THREE.Group();
    elbow.position.y = -0.18;
    arm.add(elbow);
    elbows.push(elbow);
    mesh(elbow, 'cylinder', [0.06, 0.13, 0.06], [0, -0.055, 0], skin);
    mesh(elbow, 'round', [0.058, 0.065, 0.043], [0, -0.14, 0.008], skin);
    if (side === -1) mesh(elbow, 'round', [0.066, 0.022, 0.064], [0, -0.105, 0], '#262c25');
  }
  const bag = new THREE.Group();
  bag.name = 'military-backpack';
  body.add(bag);
  mesh(bag, 'round', [0.27, 0.32, 0.14], [0, 0.65, -0.135], '#566044');
  mesh(bag, 'round', [0.25, 0.07, 0.15], [0, 0.79, -0.14], '#707653');
  mesh(bag, 'round', [0.19, 0.12, 0.055], [0, 0.565, -0.22], '#414d36');
  for (const side of [-1, 1]) {
    mesh(bag, 'round', [0.065, 0.14, 0.1], [side * 0.16, 0.61, -0.14], '#48553a');
    mesh(bag, 'box', [0.025, 0.25, 0.012], [side * 0.07, 0.65, -0.214], '#303b2a');
    mesh(bag, 'box', [0.032, 0.025, 0.016], [side * 0.07, 0.69, -0.226], '#9a9477');
    const strap = mesh(body, 'round', [0.028, 0.3, 0.02], [side * 0.095, 0.65, 0.092], '#606b48');
    strap.rotation.z = side * -0.13;
    mesh(body, 'round', [0.027, 0.04, 0.21], [side * 0.1, 0.79, -0.03], '#606b48');
  }
  for (let i = 0; i < 3; i++)
    mesh(bag, 'box', [0.2, 0.011, 0.01], [0, 0.61 + i * 0.045, -0.219], '#7e8260');
  mesh(bag, 'cylinder', [0.07, 0.27, 0.07], [0, 0.83, -0.13], '#7b7c62').rotation.z = Math.PI / 2;
  let heading = 0;
  return {
    root,
    update(state, time, elapsed = 1 / 60) {
      root.position.set(state.player.x, 0.03, state.player.y);
      if (state.facing) {
        const desired = Math.atan2(state.facing.x, state.facing.y);
        const delta = Math.atan2(Math.sin(desired - heading), Math.cos(desired - heading));
        heading += delta * (elapsed <= 0 ? 1 : Math.min(1, elapsed * 14));
      }
      root.rotation.y = heading;
      const phase = time * 10;
      const stride = state.moving ? Math.sin(phase) * 0.58 : 0;
      body.position.y = state.moving ? Math.abs(Math.cos(phase)) * 0.014 : 0;
      legs.forEach((leg, i) => {
        leg.rotation.x = stride * (i ? -1 : 1);
      });
      knees.forEach((knee, i) => {
        knee.rotation.x = state.moving ? Math.max(0, Math.sin(phase + i * Math.PI)) * 0.65 : 0.04;
      });
      arms.forEach((arm, i) => {
        arm.rotation.x = stride * (i ? 0.7 : -0.7);
      });
      elbows.forEach((elbow) => {
        elbow.rotation.x = -0.12 - Math.abs(stride) * 0.15;
      });
    },
  };
}
