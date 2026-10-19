<script setup>
import { useLocale } from '../../i18n/index.js';
const { t } = useLocale();
import { ref, watch } from 'vue';
import { profile } from '../../data/profile.js';
import ProjectsList from './ProjectsList.vue';
import LanguageSwitch from '../layout/LanguageSwitch.vue';
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
    <LanguageSwitch class="dialog-language" />
    <button class="close" :aria-label="t('Fechar janela')" @click="emit('close')">
      {{ t('×') }}
    </button>
    <template v-if="mode === 'zone' && zone">
      <span class="tag"
        >{{ t('Distrito') }}{{ zones.findIndex((item) => item.id === zone.id) + 1 }} /
        {{ zones.length }} · {{ t(zone.sub) }}</span
      >
      <h2 id="dialog-title" class="panelTitle">{{ t(zone.title) }}</h2>
      <p class="panelIntro">{{ t(zone.intro) }}</p>
      <article v-for="job in zone.jobs" :key="`${job.company}-${job.period}`" class="entry">
        <small>{{ t(job.period) }}</small>
        <h3>{{ t(job.company) }}</h3>
        <strong>{{ t(job.role) }}</strong>
        <p>{{ t(job.description) }}</p>
        <div class="chips">
          <span v-for="skill in job.skills" :key="skill">{{ t(skill) }}</span>
        </div>
      </article>
      <ProjectsList v-if="zone.projects" :projects="zone.projects" />
      <p class="note">
        {{ t('Experiências e projetos apresentados no portfólio emanuelangelo.com.') }}
      </p>
    </template>
    <template v-else-if="mode === 'map'">
      <span class="tag">{{ t('Selecione seu próximo destino') }}</span>
      <h2 id="dialog-title" class="panelTitle">{{ t('Um mapa. Muitas histórias.') }}</h2>
      <p class="panelIntro">
        {{
          t(
            'Escolha um destino. O personagem caminha até a entrada; use E ou Entrar para conhecer.',
          )
        }}
      </p>
      <div class="zoneList">
        <button v-for="(item, index) in zones" :key="item.id" @click="emit('select', item)">
          <small>{{
            visitedIds.includes(item.id) ? t('✓ EXPLORADO') : `0${index + 1} · ${t('DESCOBRIR')}`
          }}</small
          >{{ t(item.name) }} ↗
        </button>
      </div>
      <div class="dialog-navigation">
        <button class="panelLink" @click="emit('navigate', 'profile')">
          {{ t('Sobre mim ↗') }}</button
        ><button class="panelLink" @click="emit('navigate', 'contact')">
          {{ t('Vamos conversar ↗') }}
        </button>
      </div>
      <p class="note">
        {{
          t(
            'Escolha um setor para caminhar até a entrada e use E ou Entrar. Se o 3D estiver indisponível, este menu abre o conteúdo diretamente.',
          )
        }}
      </p>
    </template>
    <template v-else-if="mode === 'profile'">
      <span class="tag">{{ t('O desenvolvedor por trás do mundo') }}</span>
      <h2 id="dialog-title" class="panelTitle">{{ profile.name }}.</h2>
      <p class="panelIntro">
        {{
          t(
            'Desenvolvedor Full Stack com foco em Python, Django e Vue.js. Conecto lógica de backend, interfaces intuitivas e dados para criar soluções que simplificam o trabalho.',
          )
        }}
      </p>
      <article class="entry">
        <small>{{ t(profile.location) }}</small>
        <h3>{{ t('Da operação à criação de sistemas.') }}</h3>
        <p>
          {{
            t(
              'Minha trajetória passa por infraestrutura hospitalar, sistemas para educação, implantação de ERP e dados de projetos de energia. Cada distrito representa uma dessas experiências.',
            )
          }}
        </p>
        <div class="chips">
          <span v-for="skill in profile.skills" :key="skill">{{ t(skill) }}</span>
        </div>
      </article>
      <a class="panelLink" :href="profile.resume" target="_blank" rel="noopener noreferrer">{{
        t('Ver currículo ↗')
      }}</a
      ><a class="panelLink" :href="profile.github" target="_blank" rel="noopener noreferrer"
        >GitHub ↗</a
      >
    </template>
    <template v-else-if="mode === 'contact'">
      <span class="tag">{{ t('Próximo capítulo') }}</span>
      <h2 id="dialog-title" class="panelTitle">{{ t('Vamos construir algo juntos?') }}</h2>
      <p class="panelIntro">
        {{
          t(
            'Tem uma ideia, um processo para melhorar ou uma oportunidade? Vamos conversar sobre como transformar isso em uma solução.',
          )
        }}
      </p>
      <a class="panelLink" :href="profile.whatsapp" target="_blank" rel="noopener noreferrer">{{
        t('Conversar no WhatsApp ↗')
      }}</a
      ><a class="panelLink" :href="profile.linkedin" target="_blank" rel="noopener noreferrer"
        >LinkedIn ↗</a
      >
      <article class="entry">
        <small>{{ t('CONTATO DIRETO') }}</small>
        <p>
          <a :href="`mailto:${profile.email}`">{{ profile.email }} ↗</a>
        </p>
        <p>{{ t('São Luís, MA · Disponível para colaboração remota') }}</p>
      </article>
    </template>
    <template v-else-if="mode === 'help'">
      <span class="tag">{{ t('Guia de exploração') }}</span>
      <h2 id="dialog-title" class="panelTitle">{{ t('Seu próximo passo é por aqui.') }}</h2>
      <article class="entry">
        <h3>{{ t('01 · Caminhe pelo mundo') }}</h3>
        <p>
          {{
            t(
              'Use W, A, S, D ou as setas. Você também pode clicar no chão para definir um destino. No celular e no tablet, use os botões de direção ou toque no cenário.',
            )
          }}
        </p>
      </article>
      <article class="entry">
        <h3>{{ t('02 · Descubra os distritos') }}</h3>
        <p>
          {{
            t(
              'Clique no nome de um distrito para caminhar até ele. Perto dos edifícios, pressione E ou toque em “Explorar” para conhecer a experiência.',
            )
          }}
        </p>
      </article>
      <article class="entry">
        <h3>{{ t('03 · Escolha seu ritmo') }}</h3>
        <p>
          {{
            t(
              '“Explorar mapa” permite escolher um destino. Ao chegar, use E ou Entrar. Seu passaporte é salvo neste navegador quando o armazenamento está disponível. Use Esc ou o botão de fechar para sair de uma janela.',
            )
          }}
        </p>
      </article>
    </template>
  </dialog>
</template>
