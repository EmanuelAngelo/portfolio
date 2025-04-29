<template>
  <footer class="z-10 text-primary border-t-1 border-t-primary bg-white">
      <div class="container p-8 flex justify-between items-center">
          <p>Todos direitos reservados</p>
          <div class="flex space-x-4">
              <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="hover:opacity-70 transition-opacity"
              >
                  <img :src="social.icon" :alt="social.name" class="w-6 h-6">
              </a>
          </div>
      </div>
  </footer>
</template>
<script setup>
const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/emanuelangelo',
        icon: 'https://img.icons8.com/ios-filled/50/github.png' // ou URL do CDN
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/emanuelangelo',
        icon: 'https://img.icons8.com/ios-filled/50/linkedin.png' // ou URL do CDN
    },
    {
        name: 'Youtube',
        url: 'https://www.youtube.com/@devemanuel?sub_confirmation=1',
        icon: 'https://img.icons8.com/ios-filled/50/youtube-play.png' // ou URL do CDN
    }
]
</script>
<style scoped>
.footer-logo {
    width: 80px; 
    height: auto; 
    display: block; 
}

/* Estilos para os ícones */
.social-icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease;
}

.social-icon:hover {
    transform: scale(1.1);
    opacity: 0.8;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>
