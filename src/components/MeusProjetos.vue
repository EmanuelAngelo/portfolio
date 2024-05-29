<template>
  <v-container>
    <v-row v-if="loading" class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-progress-circular :size="50" color="primary" indeterminate><span
            class="mdi mdi-git"></span></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" v-for="project in sortedProjects" :key="project.id">
        <v-card v-if="shouldRenderCard(project)" class="mx-auto fixed-card" max-width="344" hover>
          <v-card-item>
            <v-card-title>
              {{ project.name }}
            </v-card-title>

            <v-card-subtitle v-if="project.topics && project.topics.length > 0">
              Tópicos: {{ project.topics.join(', ') }}
            </v-card-subtitle>
            <v-card-subtitle v-if="project.language">
              Linguagem: {{ project.language }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn :href="project.html_url" target="_blank" color="teal-accent-4" variant="text"
                  @click="reveal = true">Projeto Git</v-btn>
              </v-col>
              <v-col>
                <v-btn v-if="project.homepage" :href="project.homepage" target="_blank" color="teal-accent-4"
                  variant="text" @click="reveal = true">Producao</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';

interface Project {
  id: number;
  name: string;
  topics: string[];
  language: string;
  description: string;
  html_url: string;
  created_at: string;
}

export default defineComponent({
  name: 'MeusProjetos',
  setup() {
    const projects = ref<Project[]>([]);
    const loading = ref(true);

    const fetchGitHubProjects = async () => {
      const startTime = Date.now();

      try {
        const response = await fetch('https://api.github.com/users/EmanuelAngelo/repos');
        const data = await response.json();
        projects.value = data;
      } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = 3000 - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => {
            loading.value = false;
          }, remainingTime);
        } else {
          loading.value = false;
        }
      }
    };

    onMounted(() => {
      fetchGitHubProjects();
    });

    const sortedProjects = ref<Project[]>([]);

    watch(projects, () => {
      sortedProjects.value = [...projects.value].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime(); // Ordena em ordem decrescente (mais recente primeiro)
      });
    });

    const shouldRenderCard = (project: Project) => {
      return project.topics && project.topics.length > 0 && project.language;
    }

    return {
      projects,
      sortedProjects,
      loading,
      shouldRenderCard,
    };
  },
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.fixed-card {
  height: 290px;
  /* Defina a altura fixa desejada */
  max-width: 344px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-progress-circular .mdi {
  font-size: 32px;
  /* Defina o tamanho desejado */
}

@media (max-width: 600px) {
  .fixed-card {
    height: 400px;
    /* Altura maior para telas menores, se necessário */
  }
}
</style>
