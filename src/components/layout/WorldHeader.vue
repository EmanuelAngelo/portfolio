<script setup>
defineEmits(['home', 'map', 'profile', 'contact']);
</script>
<template>
  <header>
    <a class="brand" href="#" aria-label="Voltar ao início" @click.prevent="$emit('home')">
      <span class="logo" aria-hidden="true">e<span>a</span><i>■</i></span>
      <span>EMANUEL ANGELO<small>DEVELOPER'S WORLD</small></span>
    </a>
    <nav aria-label="Navegação principal">
      <button @click="$emit('map')">◈ <span>Explorar mapa</span></button>
      <button class="profile-button" @click="$emit('profile')">Sobre mim</button>
      <button class="contact" @click="$emit('contact')">Vamos conversar <span>↗</span></button>
    </nav>
  </header>
</template>
