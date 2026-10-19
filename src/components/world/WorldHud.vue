<script setup>
import { useLocale } from '../../i18n/index.js';
const { t } = useLocale();
defineProps({
  visited: { type: Number, required: true },
  total: { type: Number, required: true },
  progress: { type: Number, required: true },
  miniPlayer: { type: Object, required: true },
});
defineEmits(['help', 'map']);
</script>
<template>
  <div class="worldCaption">
    <span>{{ t('SETOR 01 — OPERAÇÕES') }}</span
    ><small>{{ t('Registro de uma cidade em reconstrução.') }}</small>
  </div>
  <aside class="mission" :aria-label="t('Progresso da exploração')">
    <div class="missionHead">
      <span>{{ t('DIÁRIO DE CAMPO / EXPLORAÇÃO') }}</span
      ><span>{{ visited }} / {{ total }}</span>
    </div>
    <p>{{ t('Rastreie minha jornada') }}</p>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="visited"
      :aria-valuemax="total"
      aria-valuemin="0"
      :aria-label="t('Distritos visitados')"
    >
      <i :style="{ width: `${progress}%` }"></i>
    </div>
    <small>{{
      t(
        visited === total
          ? 'Mapa completo. Pronto para o próximo capítulo.'
          : 'Explore os setores e recupere cada capítulo.',
      )
    }}</small>
  </aside>
  <button class="map" :aria-label="t('Abrir mapa do mundo')" @click="$emit('map')">
    <span class="mapTitle">{{ t('MAPA DE CAMPO') }}<span>↗</span></span>
    <svg viewBox="0 0 170 100" aria-hidden="true">
      <path d="M85 4 166 49 85 94 4 49Z" fill="#263f43" stroke="#526265" />
      <path d="M45 26 126 71M44 71 126 26" stroke="#526265" stroke-width="6" />
      <g fill="#dd9b6b">
        <circle cx="85" cy="20" r="4" />
        <circle cx="131" cy="47" r="4" />
        <circle cx="85" cy="79" r="4" />
        <circle cx="35" cy="47" r="4" />
      </g>
      <circle :cx="miniPlayer.x" :cy="miniPlayer.y" r="4" fill="#9fe7cd" stroke="white" />
    </svg>
    <small
      >● <span>{{ t('Posição do sobrevivente') }}</span></small
    >
  </button>
  <footer>
    <div class="controls">
      <span class="keys"
        ><kbd>W</kbd><span><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></span
      ><span
        >{{ t('Mover') }}<span class="muted">{{ t('ou use as setas') }}</span></span
      ><i></i><span class="mouse">⌖</span
      ><span
        >{{ t('Clique para caminhar')
        }}<span class="muted">{{ t('nos locais para explorar') }}</span></span
      >
    </div>
    <div class="footerRight">
      <button :aria-label="t('Como jogar')" @click="$emit('help')">?</button
      ><span>{{ t('FEITO DE CÓDIGO & CURIOSIDADE') }}</span
      ><span class="live">{{ t('● MUNDO ONLINE') }}</span>
    </div>
    <button class="mobile-passport" @click="$emit('map')">
      {{ t('◈ Passaporte') }} {{ visited }} / {{ total }}
    </button>
  </footer>
</template>
