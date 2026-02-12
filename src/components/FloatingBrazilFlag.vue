<template>
  <div class="floating-flag" @click="switchToPortuguese">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png" alt="Bandeira do Brasil" class="flag-img" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
function switchToPortuguese() {
  locale.value = 'pt';
}
</script>

<style scoped>
.floating-flag {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
  cursor: pointer;
  background: rgba(255, 255, 255, 0);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 8px;
  transition: transform 0.2s;
}
.floating-flag:hover {
  transform: scale(1.1) rotate(-5deg);
}
.flag-img {
  width: 32px;
  height: 32px;
  display: block;
}
</style>
