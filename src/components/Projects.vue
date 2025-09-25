<template>
  <section id="projects">
    <h2
      class="text-4xl font-bold text-black mb-4 text-center"
      data-aos="fade-up"
    >
      Meus projetos Git
    </h2>

    <div class="py-8 xl:px-16 px-4 sm:py-16">
      <!-- Container principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Projetos -->
        <div
          data-aos="fade-up"
          v-for="element in projects"
          :key="element.id"
          class="flex flex-col rounded-3xl bg-white"
        >
          <img
            :src="element.image"
            alt="project img"
            class="w-full rounded-lg object-cover h-48 md:h-64"
          />
          <div class="flex flex-col justify-start p-6 space-y-4">
            <span
              class="bg-primary2 w-28 text-center p-2 rounded-3xl text-black"
            >
              {{ element.category }}
            </span>
            <h3 class="uppercase font-semibold text-primary text-base">
              {{ element.title }}
            </h3>
            <p
              class="text-[14px] leading-[20px] text-gray-500 tracking-[0.03rem]"
            >
              {{ element.description }}
            </p>
            <div class="flex items-center gap-3 pt-6 flex-col sm:flex-row">
              <button
                class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"
              >
                <span
                  class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-primary border-2 border-transparent"
                ></span>
                <span class="relative flex items-center justify-center">
                  <a :href="element.webURL">Live Preview</a>
                </span>
              </button>
              <button
                class="border border-primary px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"
              >
                <div
                  class="hover:scale-105 transition-all ease-in-out flex justify-center items-center relative"
                >
                  <a :href="element.gitURL" class="pl-2 text-primary"
                    >Code Source</a
                  >
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";

const projects = ref([]);
const loading = ref(true);

async function fetchGitHubRepos() {
  try {
    const response = await fetch(
      "https://api.github.com/users/EmanuelAngelo/repos?sort=updated&direction=desc"
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Lista de repositórios para excluir (em minúsculas)
    const excludedRepos = ["portfolio", "emanuelangelo"];

    projects.value = repos
      .filter((repo) => {
        const repoName = repo.name.toLowerCase();
        return (
          !repo.fork && !repo.archived && !excludedRepos.includes(repoName)
        );
      })
      .slice(0, 4) // Pega apenas os 4 mais recentes após a filtragem
      .map((repo) => ({
        id: repo.id,
        title: formatRepoName(repo.name),
        category: repo.language || "Code",
        description: repo.description || "Projeto sem descrição disponível",
        gitURL: repo.html_url,
        webURL: repo.homepage || "#",
        image: getProjectImage(repo.name),
        updated_at: new Date(repo.updated_at),
      }));
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

function formatRepoName(name) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/^\w/, (l) => l.toUpperCase());
}

function getProjectImage(repoName) {
  const imageMap = {
    "cobranerd": "/cobranerd.png",
    "menu-icons-interativos": "/menuicons.png",
    "gastos_a_dois": "/gastos_a_dois.png",    // Adicione outros mapeamentos específicos aqui
  };

  // Retorna imagem específica ou o GIF padrão
  return (
    imageMap[repoName.toLowerCase()] ||
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDFpZHhmcWFjZ3RidmprdDVteGE4ZWRlbnJmM3Z1cmowYWQ4MnJ3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J3t49Ncr918aboQ/giphy.gif"
  );
}

onMounted(() => {
  // Adicionando cache simples para evitar muitas requisições
  const cacheKey = "github_projects_cache";
  const cacheExpiry = 2 * 60 * 60 * 1000; // 2 horas em milissegundos

  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < cacheExpiry) {
      projects.value = data;
      loading.value = false;
      return;
    }
  }

  fetchGitHubRepos().then(() => {
    if (projects.value.length > 0) {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: projects.value,
          timestamp: Date.now(),
        })
      );
    }
  });
});
</script>
