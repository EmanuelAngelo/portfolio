
<template>
  <v-container>
    <v-row v-if="loading" class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-progress-circular :size="50" color="primary" indeterminate>
          <span class="mdi mdi-git"></span>
        </v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="project in sortedProjects"
        :key="project.id"
        cols="12"
        md="4"
      >
        <v-card
          v-if="shouldRenderCard(project)"
          class="mx-auto fixed-card"
          max-width="344"
          hover
        >
          <v-card-item>
            <v-card-title>{{ project.name }}</v-card-title>

            <v-card-subtitle v-if="project.topics && project.topics.length > 0">
              Tópicos: {{ project.topics.join(", ") }}
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
                <v-btn
                  :href="project.html_url"
                  target="_blank"
                  color="teal-accent-4"
                  variant="text"
                >
                  Projeto Git
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  v-if="project.homepage"
                  :href="project.homepage"
                  target="_blank"
                  color="teal-accent-4"
                  variant="text"
                >
                  Produção
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "MeusProjetos",
  setup() {
    // Lista de projetos
    const projects = ref([]);
    const loading = ref(true);

    // Função para buscar projetos do GitHub
    const fetchGitHubProjects = async () => {
      const startTime = Date.now();

      try {
        const response = await fetch(
          "https://api.github.com/users/EmanuelAngelo/repos"
        );
        const data = await response.json();
        projects.value = data;
      } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
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

    // Ordena projetos por data de criação
    const sortedProjects = ref([]);

    watch(projects, () => {
      sortedProjects.value = [...projects.value].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime(); // Ordena em ordem decrescente
      });
    });

    // Define se o card deve ser renderizado
    const shouldRenderCard = (project) => {
      return project.topics && project.topics.length > 0 && project.language;
    };

    return {
      projects,
      sortedProjects,
      loading,
      shouldRenderCard,
    };
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.fixed-card {
  height: 290px;
  max-width: 344px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-progress-circular .mdi {
  font-size: 32px;
}

@media (max-width: 600px) {
  .fixed-card {
    height: 400px;
  }
}
</style>
