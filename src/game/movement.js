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
const SPEED = 2.8;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export function clampDestination(point) {
  return { x: clamp(point.x, 0.2, 10.8), y: clamp(point.y, 0.2, 11.8) };
}
export function createGameState() {
  return { player: { x: 5.4, y: 6 }, target: null, moving: false };
}
/** Time-based movement is independent of frame rate and input source. */
export function advanceMovement(state, keys, elapsedSeconds) {
  const horizontal =
    Number(keys.has('d') || keys.has('arrowright')) -
    Number(keys.has('a') || keys.has('arrowleft'));
  const vertical =
    Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
  let dx = horizontal + vertical;
  let dy = vertical - horizontal;
  let arrivedZoneId = null;
  if (state.target) {
    dx = state.target.x - state.player.x;
    dy = state.target.y - state.player.y;
    if (Math.hypot(dx, dy) < 0.07) {
      arrivedZoneId = state.target.zoneId ?? null;
      state.target = null;
      dx = 0;
      dy = 0;
    }
  }
  const distance = Math.hypot(dx, dy);
  state.moving = distance > 0.01;
  if (state.moving) {
    const step = Math.min(SPEED * clamp(elapsedSeconds, 0, 0.04), distance);
    state.player = clampDestination({
      x: state.player.x + (dx / distance) * step,
      y: state.player.y + (dy / distance) * step,
    });
  }
  return arrivedZoneId;
}
export function findNearbyZone(player, zones) {
  return (
    zones.find((zone) => Math.hypot(zone.x + 0.5 - player.x, zone.y + 1.6 - player.y) < 1.5) ?? null
  );
}
