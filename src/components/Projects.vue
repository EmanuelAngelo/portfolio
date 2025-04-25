<template>
  <section id="projects">
    <h2 class="text-4xl font-bold text-black mb-4 text-center" data-aos="fade-up">
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
            <span class="bg-primary2 w-28 text-center p-2 rounded-3xl text-black">
              {{ element.category }}
            </span>
            <h3 class="uppercase font-semibold text-primary text-base">
              {{ element.title }}
            </h3>
            <p class="text-[14px] leading-[20px] text-gray-500 tracking-[0.03rem]">
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
                  <a :href="element.gitURL" class="pl-2 text-primary">Code Source</a>
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

// Função para buscar repositórios do GitHub
async function fetchGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/emanuelangelo/repos');
    const repos = await response.json();
    
    // Filtra e mapeia os repositórios para o formato que você precisa
    projects.value = repos
      .filter(repo => !repo.fork) // Remove forks se quiser
      .map(repo => ({
        id: repo.id,
        title: repo.name,
        category: repo.language || 'Code',
        description: repo.description || 'Projeto sem descrição',
        gitURL: repo.html_url,
        webURL: repo.homepage || '#',
        image: getProjectImage(repo.name) // Função para imagens padrão ou personalizadas
      }));
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    // Pode manter alguns projetos padrão em caso de erro
    projects.value = [
      {
        id: 1,
        image: "/default-project.png",
        title: "Exemplo",
        category: "Web",
        description: "Projeto exemplo carregado localmente",
        gitURL: "#",
        webURL: "#",
      }
    ];
  }
}

// Função auxiliar para obter imagens dos projetos
function getProjectImage(repoName) {
  const imageMap = {
    'cobranerd': '/cobranerd.png',
    'menu-icons-interativos': '/menuicons.png',
    // Adicione outros mapeamentos conforme necessário
  };
  
  // Retorna a imagem mapeada ou o GIF padrão
  return imageMap[repoName] || 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDFpZHhmcWFjZ3RidmprdDVteGE4ZWRlbnJmM3Z1cmowYWQ4MnJ3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J3t49Ncr918aboQ/giphy.gif';
}

// Chama a função quando o componente é montado
onMounted(() => {
  fetchGitHubRepos();
});
</script>
