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
    for (const point of [
      { x: 0, y: 12 },
      { x: 11, y: 0 },
      { x: 11, y: 12 },
    ]) {
      const screen = projectPoint(point, camera);
      assert.ok(screen.x >= 0 && screen.x <= width);
      assert.ok(screen.y >= 70 && screen.y <= height - 45);
    }
    const pins = layoutPins(zones, camera);
    if (width <= 650) {
      for (let i = 0; i < pins.length; i++) {
        assert.ok(pins[i].position.x >= 57.5 && pins[i].position.x <= width - 57.5);
        for (let j = i + 1; j < pins.length; j++) {
          const a = pins[i].position,
            b = pins[j].position;
          assert.ok(
            Math.abs(a.x - b.x) >= 115 || Math.abs(a.y - b.y) >= 40,
            'Destination labels overlap',
          );
        }
      }
    }
    let paths = 0;
    const context = new Proxy(
      {
        createRadialGradient: () => ({ addColorStop() {} }),
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
    createWorldRenderer(context, zones).draw(createGameState(), camera, 1);
    assert.ok(paths > 100, 'Island artwork must render');
  });
}

test('All six destinations are reachable and trigger exactly one arrival', () => {
  for (const zone of zones) {
    const state = createGameState();
    state.target = { x: zone.x + 0.5, y: zone.y + 1.8, zoneId: zone.id };
    const arrivals = [];
    for (let frame = 0; frame < 600; frame++) {
      const result = advanceMovement(state, new Set(), 1 / 60);
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
