<script setup>
import { ref, watch } from 'vue';
import { profile } from '../../data/profile.js';
import ProjectsList from './ProjectsList.vue';
const props = defineProps({
  mode: { type: String, default: null },
  zone: { type: Object, default: null },
  zones: { type: Array, required: true },
  visitedIds: { type: Array, required: true },
});
const emit = defineEmits(['close', 'select', 'navigate']);
const dialog = ref(null);
watch(
  () => props.mode,
  (mode) => {
    if (mode && !dialog.value.open) dialog.value.showModal();
    if (!mode && dialog.value.open) dialog.value.close();
    if (mode) dialog.value.scrollTop = 0;
  },
  { flush: 'post' },
);
function clickBackdrop(event) {
  if (event.target !== dialog.value) return;
  const bounds = dialog.value.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    emit('close');
}
</script>
<template>
  <dialog
    ref="dialog"
    aria-labelledby="dialog-title"
    @cancel.prevent="emit('close')"
    @click="clickBackdrop"
    @close="emit('close')"
  >
    <button class="close" aria-label="Fechar janela" @click="emit('close')">×</button>
    <template v-if="mode === 'zone' && zone">
      <span class="tag"
        >Distrito {{ zones.findIndex((item) => item.id === zone.id) + 1 }} / {{ zones.length }} ·
        {{ zone.sub }}</span
      >
      <h2 id="dialog-title" class="panelTitle">{{ zone.title }}</h2>
      <p class="panelIntro">{{ zone.intro }}</p>
      <article v-for="job in zone.jobs" :key="`${job.company}-${job.period}`" class="entry">
        <small>{{ job.period }}</small>
        <h3>{{ job.company }}</h3>
        <strong>{{ job.role }}</strong>
        <p>{{ job.description }}</p>
        <div class="chips">
          <span v-for="skill in job.skills" :key="skill">{{ skill }}</span>
        </div>
      </article>
      <ProjectsList v-if="zone.projects" :projects="zone.projects" />
      <p class="note">Experiências e projetos apresentados no portfólio emanuelangelo.com.</p>
    </template>
    <template v-else-if="mode === 'map'">
      <span class="tag">Selecione seu próximo destino</span>
      <h2 id="dialog-title" class="panelTitle">Um mapa. Muitas histórias.</h2>
      <p class="panelIntro">Acesse cada distrito diretamente, no seu ritmo.</p>
      <div class="zoneList">
        <button v-for="(item, index) in zones" :key="item.id" @click="emit('select', item)">
          <small>{{
            visitedIds.includes(item.id) ? '✓ EXPLORADO' : `0${index + 1} · DESCOBRIR`
          }}</small
          >{{ item.name }} ↗
        </button>
      </div>
      <div class="dialog-navigation">
        <button class="panelLink" @click="emit('navigate', 'profile')">Sobre mim ↗</button
        ><button class="panelLink" @click="emit('navigate', 'contact')">Vamos conversar ↗</button>
      </div>
      <p class="note">
        No cenário, clique no nome de um distrito para caminhar até ele. Aqui você acessa o conteúdo
        sem precisar jogar.
      </p>
    </template>
    <template v-else-if="mode === 'profile'">
      <span class="tag">O desenvolvedor por trás do mundo</span>
      <h2 id="dialog-title" class="panelTitle">{{ profile.name }}.</h2>
      <p class="panelIntro">
        Desenvolvedor Full Stack com foco em Python, Django e Vue.js. Conecto lógica de backend,
        interfaces intuitivas e dados para criar soluções que simplificam o trabalho.
      </p>
      <article class="entry">
        <small>{{ profile.location }}</small>
        <h3>Da operação à criação de sistemas.</h3>
        <p>
          Minha trajetória passa por infraestrutura hospitalar, sistemas para educação, implantação
          de ERP e dados de projetos de energia. Cada distrito representa uma dessas experiências.
        </p>
        <div class="chips">
          <span v-for="skill in profile.skills" :key="skill">{{ skill }}</span>
        </div>
      </article>
      <a class="panelLink" :href="profile.resume" target="_blank" rel="noopener noreferrer"
        >Ver currículo ↗</a
      ><a class="panelLink" :href="profile.github" target="_blank" rel="noopener noreferrer"
        >GitHub ↗</a
      >
    </template>
    <template v-else-if="mode === 'contact'">
      <span class="tag">Próximo capítulo</span>
      <h2 id="dialog-title" class="panelTitle">Vamos construir algo juntos?</h2>
      <p class="panelIntro">
        Tem uma ideia, um processo para melhorar ou uma oportunidade? Vamos conversar sobre como
        transformar isso em uma solução.
      </p>
      <a class="panelLink" :href="profile.whatsapp" target="_blank" rel="noopener noreferrer"
        >Conversar no WhatsApp ↗</a
      ><a class="panelLink" :href="profile.linkedin" target="_blank" rel="noopener noreferrer"
        >LinkedIn ↗</a
      >
      <article class="entry">
        <small>CONTATO DIRETO</small>
        <p>
          <a :href="`mailto:${profile.email}`">{{ profile.email }} ↗</a>
        </p>
        <p>São Luís, MA · Disponível para colaboração remota</p>
      </article>
    </template>
    <template v-else-if="mode === 'help'">
      <span class="tag">Guia de exploração</span>
      <h2 id="dialog-title" class="panelTitle">Seu próximo passo é por aqui.</h2>
      <article class="entry">
        <h3>01 · Caminhe pelo mundo</h3>
        <p>
          Use W, A, S, D ou as setas. Você também pode clicar no chão para definir um destino. No
          celular e no tablet, use os botões de direção ou toque no cenário.
        </p>
      </article>
      <article class="entry">
        <h3>02 · Descubra os distritos</h3>
        <p>
          Clique no nome de um distrito para caminhar até ele. Perto dos edifícios, pressione E ou
          toque em “Explorar” para conhecer a experiência.
        </p>
      </article>
      <article class="entry">
        <h3>03 · Escolha seu ritmo</h3>
        <p>
          “Explorar mapa” abre todas as seções diretamente. Seu passaporte é salvo neste navegador
          quando o armazenamento está disponível. Use Esc ou o botão de fechar para sair de uma
          janela.
        </p>
      </article>
    </template>
  </dialog>
</template>
