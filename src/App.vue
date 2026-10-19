<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import WorldHeader from './components/layout/WorldHeader.vue';
import WorldIntro from './components/layout/WorldIntro.vue';
import WorldHud from './components/world/WorldHud.vue';
import TouchControls from './components/world/TouchControls.vue';
import ContentDialog from './components/content/ContentDialog.vue';
import { zones } from './data/zones.js';
import { useWorld } from './composables/useWorld.js';
import { usePassport } from './composables/usePassport.js';

const canvas = ref(null);
const panel = ref(null);
const activeZone = ref(null);
const toast = ref('');
let toastTimer;
const paused = computed(() => panel.value !== null);
const { visitedIds, progress, visit } = usePassport(zones);
const {
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
} = useWorld(canvas, zones, paused, openZone);
function openZone(zone) {
  if (!zone) return;
  activeZone.value = zone;
  visit(zone.id);
  panel.value = 'zone';
}
function closePanel() {
  panel.value = null;
  focus();
}
function travelTo(zone) {
  if (!available.value) {
    openZone(zone);
    return;
  }
  panel.value = null;
  requestAnimationFrame(() => navigate(zone));
}
function start() {
  panel.value = 'map';
  toast.value = 'Escolha um destino. Na entrada, use E ou Entrar.';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.value = '';
  }, 3000);
}
onBeforeUnmount(() => clearTimeout(toastTimer));
</script>
<template>
  <main :class="{ 'compact-game': compact }">
    <canvas
      ref="canvas"
      id="world"
      tabindex="0"
      aria-label="Distrito em 3D. Use WASD ou setas para andar, E para explorar. O menu Explorar mapa permite acessar todo o conteúdo."
      @pointerdown="moveTo"
    ></canvas>
    <WorldHeader
      @home="reset"
      @map="panel = 'map'"
      @profile="panel = 'profile'"
      @contact="panel = 'contact'"
    />
    <WorldIntro :exploring="exploring" @start="start" />
    <div class="game-status" aria-live="polite">
      <span class="status-dot"></span>
      <span
        >{{
          nearbyZone
            ? nearbyZone.name
            : walking
              ? 'Explorando a ilha'
              : 'Sua próxima experiência está logo ali'
        }}<small>{{
          nearbyZone
            ? 'Você chegou. Toque em Entrar para conhecer.'
            : 'Segure o direcional ou toque no caminho.'
        }}</small></span
      >
    </div>
    <div id="labels" aria-label="Destinos do mundo">
      <button
        v-for="zone in pins"
        :key="zone.id"
        class="pin"
        :class="{ visited: visitedIds.includes(zone.id) }"
        :style="{ left: `${zone.position.x}px`, top: `${zone.position.y}px` }"
        :aria-label="`Entrar em ${zone.name}`"
        @click="openZone(zone)"
      >
        <span class="num">0{{ zones.findIndex((item) => item.id === zone.id) + 1 }}</span
        ><span
          ><b>{{ zone.name }}</b
          ><small>{{ zone.sub }}</small></span
        ><span class="pin-arrow">↗</span>
      </button>
    </div>
    <WorldHud
      :visited="visitedIds.length"
      :total="zones.length"
      :progress="progress"
      :mini-player="miniPlayer"
      @map="panel = 'map'"
      @help="panel = 'help'"
    />
    <div v-if="nearbyZone && !paused" class="interact">
      <button @click="openZone(nearbyZone)">
        <kbd>E</kbd
        ><span
          >Entrar <small>{{ nearbyZone.name }}</small></span
        >
        ↗
      </button>
    </div>
    <TouchControls @press="pressDirection" @release="releaseDirection" />
    <ContentDialog
      :mode="panel"
      :zone="activeZone"
      :zones="zones"
      :visited-ids="visitedIds"
      @close="closePanel"
      @select="travelTo"
      @navigate="panel = $event"
    />
    <div id="toast" role="status" :class="{ show: toast }">{{ toast }}</div>
    <div v-if="!available" class="canvas-fallback">
      <p>O cenário 3D precisa de WebGL 2. Você pode acessar todas as experiências pelo mapa.</p>
      <button class="primary" @click="panel = 'map'">Explorar todas as experiências ↗</button>
    </div>
  </main>
</template>
