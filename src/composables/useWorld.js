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
  const camera = shallowRef(createCamera(1440, 900));
  const player = shallowRef({ ...state.player });
  const nearbyZone = shallowRef(null);
  const exploring = ref(false);
  const available = ref(true);
  const miniPlayer = computed(() => miniMapPoint(player.value));
  const pins = computed(() => layoutPins(zones, camera.value));

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
    state.target = { x: zone.x + 0.5, y: zone.y + 1.8, zoneId: zone.id };
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
    state.target = clampDestination(point);
    exploring.value = true;
    focus();
  }
  function pressDirection(key) {
    if (paused.value) return;
    keys.add(key);
    state.target = null;
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
    camera.value = createCamera(width, height);
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
      const arrivedId = advanceMovement(state, keys, elapsed);
      player.value = { ...state.player };
      nearbyZone.value = findNearbyZone(state.player, zones);
      if (arrivedId) onArrive(zones.find((zone) => zone.id === arrivedId));
    }
    renderer?.draw(state, camera.value, reducedMotion?.matches ? 0 : time / 1000);
    frameId = requestAnimationFrame(frame);
  }
  watch(paused, (value) => {
    stop();
    if (value) state.target = null;
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
    listen(document, 'visibilitychange', stop);
    listen(window, 'keydown', (event) => {
      if (paused.value || event.ctrlKey || event.metaKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (MOVEMENT_KEYS.has(key)) {
        event.preventDefault();
        pressDirection(key);
      }
      if (key === 'e' && nearbyZone.value) {
        event.preventDefault();
        onArrive(nearbyZone.value);
      }
    });
    listen(window, 'keyup', (event) => releaseDirection(event.key.toLowerCase()));
    frameId = requestAnimationFrame(frame);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId);
    cleanup.forEach((dispose) => dispose());
    stop();
  });
  return {
    pins,
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
