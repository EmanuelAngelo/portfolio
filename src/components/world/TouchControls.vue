<script setup>
import { useLocale } from '../../i18n/index.js';
const { t } = useLocale();
const emit = defineEmits(['press', 'release']);
function press(event, key) {
  event.preventDefault();
  try {
    event.currentTarget.setPointerCapture?.(event.pointerId);
  } catch {
    /* Global release still clears the key. */
  }
  emit('press', key);
}
</script>
<template>
  <div class="touchpad" :aria-label="t('Controles de movimento')">
    <button
      :aria-label="t('Mover para cima')"
      @pointerdown="press($event, 'w')"
      @pointerup="emit('release', 'w')"
      @pointercancel="emit('release', 'w')"
      @lostpointercapture="emit('release', 'w')"
    >
      ↑
    </button>
    <div>
      <button
        v-for="direction in [
          { key: 'a', label: 'esquerda', icon: '←' },
          { key: 's', label: 'baixo', icon: '↓' },
          { key: 'd', label: 'direita', icon: '→' },
        ]"
        :key="direction.key"
        :aria-label="t(`Mover para ${direction.label}`)"
        @pointerdown="press($event, direction.key)"
        @pointerup="emit('release', direction.key)"
        @pointercancel="emit('release', direction.key)"
        @lostpointercapture="emit('release', direction.key)"
      >
        {{ direction.icon }}
      </button>
    </div>
  </div>
</template>
