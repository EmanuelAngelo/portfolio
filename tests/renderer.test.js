import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorldScene, createWorldRenderer } from '../src/game/renderer.js';
import { createCamera } from '../src/game/geometry.js';
import { createGameState, advanceMovement } from '../src/game/movement.js';
import { zones } from '../src/data/zones.js';

test('The scene contains original 3D geometry, perspective camera, backpack and animated limbs', () => {
  const world = createWorldScene(zones);
  const state = createGameState();
  const camera = createCamera(390, 844);
  world.update(state, camera, 1);
  assert.ok(world.camera.isPerspectiveCamera);
  assert.ok(world.scene.getObjectByName('military-backpack'));
  assert.equal(world.buildings.length, zones.length);
  let meshes = 0;
  world.scene.traverse((object) => {
    if (!object.isMesh) return;
    meshes++;
    assert.ok([...object.geometry.attributes.position.array].every(Number.isFinite));
  });
  assert.ok(meshes > 50);
  const initial = world.survivor.root.position.clone();
  advanceMovement(state, new Set(['d']), 0.04);
  world.update(state, camera, 1.04);
  assert.notDeepEqual(world.survivor.root.position.toArray(), initial.toArray());
  assert.ok(Number.isFinite(world.survivor.root.rotation.y));
  state.target = { x: 6, y: 8 };
  world.update(state, camera, 1.08);
  assert.equal(world.marker.visible, true);
  assert.equal(world.marker.position.x, 6);
  state.target = null;
  world.update(state, camera, 1.12);
  assert.equal(world.marker.visible, false);
  world.dispose();
  assert.equal(world.scene.children.length, 0);
});

test('WebGL adapter resizes once per viewport, renders after clicks and disposes resources', () => {
  let draws = 0,
    sizes = 0,
    disposed = false;
  const gpu = {
    shadowMap: {},
    setPixelRatio() {},
    setSize() {
      sizes++;
    },
    render(scene, camera) {
      assert.ok(camera.isPerspectiveCamera);
      draws++;
    },
    dispose() {
      disposed = true;
    },
  };
  const renderer = createWorldRenderer({}, zones, () => gpu);
  const state = createGameState();
  renderer.draw(state, createCamera(390, 844), 1);
  state.target = { x: 6, y: 8 };
  renderer.draw(state, createCamera(390, 844), 2);
  renderer.draw(state, createCamera(1440, 900), 3);
  assert.equal(draws, 3);
  assert.equal(sizes, 2);
  renderer.dispose();
  assert.equal(disposed, true);
});
