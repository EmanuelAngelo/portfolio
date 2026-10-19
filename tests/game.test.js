import { createObstacles, isWalkable, findPath, entranceOf } from '../src/game/collision.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createCamera, projectPoint, unprojectPoint, layoutPins } from '../src/game/geometry.js';
import { advanceMovement, createGameState, findNearbyZone } from '../src/game/movement.js';
import { zones } from '../src/data/zones.js';
import { createWorldRenderer } from '../src/game/renderer.js';

const viewports = [
  [320, 568],
  [390, 844],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [844, 390],
  [1440, 900],
  [1920, 1080],
];
for (const [width, height] of viewports) {
  test(`Projection, map bounds and rendering at ${width}x${height}`, () => {
    const camera = createCamera(width, height);
    for (const point of [
      { x: 0, y: 0 },
      { x: 11, y: 12 },
      { x: 3.2, y: 7.5 },
    ]) {
      const screen = projectPoint(point, camera);
      const result = unprojectPoint(screen, camera);
      assert.ok(Math.abs(result.x - point.x) < 1e-9);
      assert.ok(Math.abs(result.y - point.y) < 1e-9);
    }
    if (camera.compact) {
      const screen = projectPoint({ x: 5.5, y: 8 }, camera);
      assert.ok(Math.abs(screen.x - width / 2) < 1e-9);
      assert.ok(screen.y > 100 && screen.y < height - 100);
      assert.ok(camera.scale >= 58, 'Character must remain large on small displays');
    }
    const pins = layoutPins(zones, camera);
    let paths = 0;
    const context = new Proxy(
      {
        createRadialGradient: () => ({ addColorStop() {} }),
        ellipse(...args) {
          assert.ok(args.length >= 7, 'Canvas ellipse requires seven arguments');
          assert.ok(args.slice(0, 7).every(Number.isFinite));
          assert.ok(args[2] >= 0 && args[3] >= 0);
        },
        lineTo(x, y) {
          assert.ok(Number.isFinite(x) && Number.isFinite(y));
          paths++;
        },
      },
      {
        get: (object, key) => object[key] ?? (() => {}),
        set: (object, key, value) => {
          object[key] = value;
          return true;
        },
      },
    );
    const renderer = createWorldRenderer(context, zones);
    const state = createGameState();
    renderer.draw(state, camera, 1);
    state.target = { x: 6, y: 8 };
    renderer.draw(state, camera, 2);
    assert.ok(paths > 100, 'Island artwork must render');
  });
}

test('All six destinations are reachable and trigger exactly one arrival', () => {
  for (const zone of zones) {
    const state = createGameState();
    const obstacles = createObstacles(zones);
    const entrance = entranceOf(zone);
    state.path = findPath(state.player, entrance, obstacles);
    assert.ok(state.path.length);
    state.target = { ...entrance, zoneId: zone.id };
    const arrivals = [];
    for (let frame = 0; frame < 1800; frame++) {
      const result = advanceMovement(state, new Set(), 1 / 60, obstacles);
      assert.ok(isWalkable(state.player, obstacles), `Collision on path to ${zone.id}`);
      if (result) arrivals.push(result);
    }
    assert.deepEqual(arrivals, [zone.id]);
    assert.equal(findNearbyZone(state.player, zones)?.id, zone.id);
  }
});

test('Keyboard movement is screen-oriented, bounded and frame-rate independent', () => {
  for (const [key, signX, signY] of [
    ['w', -1, -1],
    ['a', -1, 1],
    ['s', 1, 1],
    ['d', 1, -1],
  ]) {
    const state = createGameState();
    const initial = { ...state.player };
    advanceMovement(state, new Set([key]), 0.04);
    assert.equal(Math.sign(state.player.x - initial.x), signX);
    assert.equal(Math.sign(state.player.y - initial.y), signY);
    for (let i = 0; i < 3000; i++) advanceMovement(state, new Set([key]), 0.04);
    assert.ok(state.player.x >= 0.2 && state.player.x <= 10.8);
    assert.ok(state.player.y >= 0.2 && state.player.y <= 11.8);
  }
  const slow = createGameState(),
    fast = createGameState();
  for (let i = 0; i < 30; i++) advanceMovement(slow, new Set(['d']), 1 / 30);
  for (let i = 0; i < 120; i++) advanceMovement(fast, new Set(['d']), 1 / 120);
  assert.ok(Math.hypot(slow.player.x - fast.player.x, slow.player.y - fast.player.y) < 1e-9);
});

test('Sustained keyboard input cannot pass through a building or fountain', () => {
  const obstacles = createObstacles(zones);
  for (const zone of zones) {
    const state = createGameState();
    state.player = entranceOf(zone);
    for (let i = 0; i < 400; i++) {
      advanceMovement(state, new Set(['w', 'd']), 1 / 60, obstacles);
      assert.ok(isWalkable(state.player, obstacles));
    }
    assert.ok(state.player.y >= zone.y + 1.6, 'Cannot cross the facade');
  }
});

test('Every destination can be reached from every other entrance without crossing walls', () => {
  const obstacles = createObstacles(zones);
  for (const from of zones)
    for (const to of zones) {
      const path = findPath(entranceOf(from), entranceOf(to), obstacles);
      assert.ok(path.length, `${from.id} -> ${to.id}`);
      assert.ok(path.every((point) => isWalkable(point, obstacles)));
    }
});
