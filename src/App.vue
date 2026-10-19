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
function start() {
  navigate(zones[0]);
  toast.value = 'Use WASD ou clique no cenário. Sua jornada começa!';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.value = '';
  }, 3000);
}
onBeforeUnmount(() => clearTimeout(toastTimer));
</script>
<template>
  <main>
    <canvas
      ref="canvas"
      id="world"
      tabindex="0"
      aria-label="Mundo isométrico. Use WASD ou setas para andar, E para explorar. O menu Explorar mapa permite acessar todo o conteúdo."
      @pointerdown="moveTo"
    ></canvas>
    <WorldHeader
      @home="reset"
      @map="panel = 'map'"
      @profile="panel = 'profile'"
      @contact="panel = 'contact'"
    />
    <WorldIntro :exploring="exploring" @start="start" />
    <div id="labels" aria-label="Destinos do mundo">
      <button
        v-for="(zone, index) in pins"
        :key="zone.id"
        class="pin"
        :class="{ visited: visitedIds.includes(zone.id) }"
        :style="{ left: `${zone.position.x}px`, top: `${zone.position.y}px` }"
        :aria-label="`Ir para ${zone.name}`"
        @click="navigate(zone)"
      >
        <span class="num">0{{ index + 1 }}</span
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
        <kbd>E</kbd><span>Explorar {{ nearbyZone.name }}</span> ↗
      </button>
    </div>
    <TouchControls @press="pressDirection" @release="releaseDirection" />
    <ContentDialog
      :mode="panel"
      :zone="activeZone"
      :zones="zones"
      :visited-ids="visitedIds"
      @close="closePanel"
      @select="openZone"
      @navigate="panel = $event"
    />
    <div id="toast" role="status" :class="{ show: toast }">{{ toast }}</div>
    <div v-if="!available" class="canvas-fallback">
      <p>Este navegador não disponibilizou o cenário.</p>
      <button class="primary" @click="panel = 'map'">Explorar todas as experiências ↗</button>
    </div>
  </main>
</template>
