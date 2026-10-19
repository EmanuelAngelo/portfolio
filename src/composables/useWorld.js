import { createObstacles, findPath, entranceOf } from '../game/collision.js';
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { createCamera, miniMapPoint, layoutPins, unprojectPoint } from '../game/geometry.js';
import {
  advanceMovement,
  clampDestination,
  createGameState,
  findNearbyZone,
  MOVEMENT_KEYS,
} from '../game/movement.js';
import { createWorldRenderer } from '../game/renderer.js';

/** Owns animation and browser input; releases every resource when the view unmounts. */
export function useWorld(canvas, zones, paused, onArrive) {
  const state = createGameState();
  const keys = new Set();
  const obstacles = createObstacles(zones);
  const camera = shallowRef(createCamera(1440, 900));
  const player = shallowRef({ ...state.player });
  const nearbyZone = shallowRef(null);
  const exploring = ref(false);
  const available = ref(true);
  const miniPlayer = computed(() => miniMapPoint(player.value));
  const pins = computed(() =>
    layoutPins(
      zones.filter((zone) => zone.id === nearbyZone.value?.id),
      camera.value,
    ),
  );
  const compact = computed(() => camera.value.compact);
  const walking = ref(false);

  let renderer;
  let frameId;
  let previousTime = 0;
  let reducedMotion;
  const cleanup = [];

  function listen(target, event, handler) {
    target.addEventListener(event, handler);
    cleanup.push(() => target.removeEventListener(event, handler));
  }
  function stop() {
    keys.clear();
    state.moving = false;
    previousTime = 0;
  }
  function focus() {
    canvas.value?.focus({ preventScroll: true });
  }
  function navigate(zone) {
    keys.clear();
    const destination = entranceOf(zone);
    state.path = findPath(state.player, destination, obstacles);
    state.target = state.path.length ? { ...state.path.at(-1), zoneId: zone.id } : null;
    exploring.value = true;
    focus();
  }
  function moveTo(event) {
    if (paused.value || !canvas.value) return;
    const rect = canvas.value.getBoundingClientRect();
    const point = unprojectPoint(
      { x: event.clientX - rect.left, y: event.clientY - rect.top },
      camera.value,
    );
    keys.clear();
    state.path = findPath(state.player, clampDestination(point), obstacles);
    state.target = state.path.length ? { ...state.path.at(-1) } : null;
    exploring.value = true;
    focus();
  }
  function pressDirection(key) {
    if (paused.value) return;
    keys.add(key);
    state.target = null;
    state.path = [];
    exploring.value = true;
  }
  function releaseDirection(key) {
    keys.delete(key);
  }
  function reset() {
    stop();
    Object.assign(state, createGameState());
    player.value = { ...state.player };
    exploring.value = false;
    focus();
  }
  function resize() {
    const width = window.innerWidth;
    const height = window.visualViewport?.height ?? window.innerHeight;
    camera.value = createCamera(width, height, state.player);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.value.width = Math.round(width * ratio);
    canvas.value.height = Math.round(height * ratio);
    canvas.value.style.height = `${height}px`;
    canvas.value.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function frame(time) {
    const elapsed = previousTime ? (time - previousTime) / 1000 : 0;
    previousTime = time;
    if (!paused.value && !document.hidden) {
      advanceMovement(state, keys, elapsed, obstacles);
      walking.value = state.moving;
      player.value = { ...state.player };
      nearbyZone.value = findNearbyZone(state.player, zones);
      if (camera.value.compact) {
        const desired = createCamera(camera.value.width, camera.value.height, state.player);
        const blend = reducedMotion?.matches ? 1 : 1 - Math.exp(-8 * Math.min(elapsed, 0.04));
        camera.value = {
          ...desired,
          originX: camera.value.originX + (desired.originX - camera.value.originX) * blend,
          originY: camera.value.originY + (desired.originY - camera.value.originY) * blend,
        };
      }
    }
    renderer?.draw(state, camera.value, reducedMotion?.matches ? 0 : time / 1000);
    frameId = requestAnimationFrame(frame);
  }
  watch(paused, (value) => {
    stop();
    if (value) {
      state.target = null;
      state.path = [];
    }
  });
  onMounted(() => {
    const context = canvas.value?.getContext('2d');
    if (!context) {
      available.value = false;
      return;
    }
    renderer = createWorldRenderer(context, zones);
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    resize();
    listen(window, 'resize', resize);
    if (window.visualViewport) listen(window.visualViewport, 'resize', resize);
    listen(window, 'blur', stop);
    listen(window, 'pointerup', () => keys.clear());
    listen(window, 'pointercancel', () => keys.clear());
    listen(document, 'visibilitychange', stop);
    listen(window, 'keydown', (event) => {
      if (paused.value || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target?.matches?.('input, textarea, select, [contenteditable=true]')) return;
      const key =
        { KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd' }[event.code] ?? event.key.toLowerCase();
      if (MOVEMENT_KEYS.has(key)) {
        event.preventDefault();
        pressDirection(key);
      }
      if (key === 'e' && nearbyZone.value) {
        event.preventDefault();
        onArrive(nearbyZone.value);
      }
    });
    listen(window, 'keyup', (event) =>
      releaseDirection(
        { KeyW: 'w', KeyA: 'a', KeyS: 's', KeyD: 'd' }[event.code] ?? event.key.toLowerCase(),
      ),
    );
    frameId = requestAnimationFrame(frame);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId);
    cleanup.forEach((dispose) => dispose());
    stop();
  });
  return {
    pins,
    compact,
    walking,
    miniPlayer,
    nearbyZone,
    exploring,
    available,
    navigate,
    moveTo,
    pressDirection,
    releaseDirection,
    reset,
    focus,
  };
}
