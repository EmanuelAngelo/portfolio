<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="project in projects" :key="project.id">
        <v-card class="mx-auto fixed-card" max-width="344" hover>
          <v-card-item>
            <v-card-title>
              {{ project.name }}
            </v-card-title>

            <v-card-subtitle>
              Topicos: {{ project.topics.join(', ') }}
            </v-card-subtitle>
            <v-card-subtitle>
              Linguagem: {{ project.language }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn :href="project.html_url" target="_blank" color="teal-accent-4" text="Projeto" variant="text"
              @click="reveal = true"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'MeusProjetos',
  setup() {
    const projects = ref([]);

    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/EmanuelAngelo/repos');
        const data = await response.json();
        projects.value = data;
      } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
      }
    };

    onMounted(() => {
      fetchGitHubProjects();
    });

    return {
      projects,
    };
  },
});
</script>

<style scoped>
@media (max-width: 600px) {
  .fixed-card {
    height: 400px;
    /* Altura maior para telas menores, se necessário */
  }
}

.fixed-card {
  height: 290px;
  /* Defina a altura fixa desejada */
  max-width: 344px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
