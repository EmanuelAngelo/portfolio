<script setup>
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
    <span>01 — THE LOGIC ISLAND</span><small>Um universo de soluções conectadas.</small>
  </div>
  <aside class="mission" aria-label="Progresso da exploração">
    <div class="missionHead">
      <span>SEU PASSAPORTE</span><span>{{ visited }} / {{ total }}</span>
    </div>
    <p>Conheça minha jornada</p>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="visited"
      :aria-valuemax="total"
      aria-valuemin="0"
      aria-label="Distritos visitados"
    >
      <i :style="{ width: `${progress}%` }"></i>
    </div>
    <small>{{
      visited === total
        ? 'Jornada completa. Vamos construir o próximo capítulo?'
        : 'Visite os distritos e descubra cada capítulo.'
    }}</small>
  </aside>
  <button class="map" aria-label="Abrir mapa do mundo" @click="$emit('map')">
    <span class="mapTitle">MAPA DO MUNDO <span>↗</span></span>
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
    <small>● <span>Você está aqui</span></small>
  </button>
  <footer>
    <div class="controls">
      <span class="keys"
        ><kbd>W</kbd><span><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span></span
      ><span>Mover<span class="muted">ou use as setas</span></span
      ><i></i><span class="mouse">⌖</span
      ><span>Clique para caminhar<span class="muted">nos locais para explorar</span></span>
    </div>
    <div class="footerRight">
      <button aria-label="Como jogar" @click="$emit('help')">?</button
      ><span>FEITO DE CÓDIGO &amp; CURIOSIDADE</span><span class="live">● MUNDO ONLINE</span>
    </div>
    <button class="mobile-passport" @click="$emit('map')">
      ◈ Passaporte {{ visited }} / {{ total }}
    </button>
  </footer>
</template>
