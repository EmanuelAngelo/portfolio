import { canWalkSegment, entranceOf } from './collision.js';
export const MOVEMENT_KEYS = new Set([
  'w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowdown',
  'arrowleft',
  'arrowright',
]);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export function clampDestination(point) {
  return { x: clamp(point.x, 0.2, 10.8), y: clamp(point.y, 0.2, 11.8) };
}
export function createGameState() {
  return { player: { x: 5.5, y: 8 }, target: null, path: [], moving: false };
}
export function advanceMovement(state, keys, elapsedSeconds, obstacles = []) {
  const horizontal =
    Number(keys.has('d') || keys.has('arrowright')) -
    Number(keys.has('a') || keys.has('arrowleft'));
  const vertical =
    Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
  let dx = horizontal + vertical,
    dy = vertical - horizontal;
  const waypoint = state.path?.[0] ?? state.target;
  if (waypoint && !horizontal && !vertical) {
    dx = waypoint.x - state.player.x;
    dy = waypoint.y - state.player.y;
    if (Math.hypot(dx, dy) < 0.025) {
      state.path?.shift();
      if (!state.path?.length) {
        const id = state.target?.zoneId ?? null;
        state.target = null;
        state.moving = false;
        return id;
      }
      return null;
    }
  }
  const distance = Math.hypot(dx, dy);
  state.moving = false;
  if (distance < 0.001) return null;
  const step = Math.min(3 * clamp(elapsedSeconds, 0, 0.04), distance);
  const next = clampDestination({
    x: state.player.x + (dx / distance) * step,
    y: state.player.y + (dy / distance) * step,
  });
  const before = state.player;
  if (canWalkSegment(before, next, obstacles)) state.player = next;
  else if (horizontal || vertical) {
    const slideX = { x: next.x, y: before.y },
      slideY = { x: before.x, y: next.y };
    if (canWalkSegment(before, slideX, obstacles)) state.player = slideX;
    else if (canWalkSegment(before, slideY, obstacles)) state.player = slideY;
  } else {
    state.path = [];
    state.target = null;
  }
  state.moving = Math.hypot(state.player.x - before.x, state.player.y - before.y) > 0.0001;
  return null;
}
export function findNearbyZone(player, zones) {
  return (
    zones.find((zone) => {
      const entrance = entranceOf(zone);
      return Math.hypot(player.x - entrance.x, player.y - entrance.y) < 0.85;
    }) ?? null
  );
}
