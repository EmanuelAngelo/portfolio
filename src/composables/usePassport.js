import { computed, ref } from 'vue';
import { readPassport, writePassport } from '../services/passport.js';
export function usePassport(zones) {
  let storage;
  try {
    storage = window.localStorage;
  } catch {
    /* Private mode can block storage access. */
  }
  const visitedIds = ref(
    readPassport(
      storage,
      zones.map((zone) => zone.id),
    ),
  );
  const progress = computed(() => (visitedIds.value.length / zones.length) * 100);
  function visit(id) {
    if (!zones.some((zone) => zone.id === id) || visitedIds.value.includes(id)) return;
    visitedIds.value = [...visitedIds.value, id];
    writePassport(storage, visitedIds.value);
  }
  return { visitedIds, progress, visit };
}
