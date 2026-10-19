<script setup>
import { onBeforeUnmount, ref } from 'vue';
import { loadRepositories } from '../../services/repositories.js';
const props = defineProps({ projects: { type: Array, required: true } });
const items = ref(props.projects);
const loading = ref(false);
const message = ref('');
let controller;
async function refresh() {
  controller?.abort();
  controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  loading.value = true;
  message.value = '';
  try {
    items.value = await loadRepositories(controller.signal);
  } catch {
    message.value = 'Atualização indisponível. Exibindo os projetos do portfólio.';
  } finally {
    clearTimeout(timer);
    loading.value = false;
  }
}
onBeforeUnmount(() => controller?.abort());
</script>
<template>
  <article v-for="project in items" :key="project.url" class="entry">
    <small>{{ project.language }} · GITHUB</small>
    <h3>{{ project.name }}</h3>
    <p>{{ project.description }}</p>
    <a class="panelLink" :href="project.url" target="_blank" rel="noopener noreferrer"
      >Explorar repositório ↗</a
    >
  </article>
  <button class="refresh-projects" :disabled="loading" @click="refresh">
    {{ loading ? 'Atualizando…' : 'Atualizar projetos do GitHub ↻' }}
  </button>
  <p v-if="message" class="note" role="status">{{ message }}</p>
</template>
