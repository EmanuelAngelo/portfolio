<script setup>
defineProps({ exploring: Boolean });
defineEmits(['start']);
</script>
<template>
  <section class="intro" :class="{ exploring }">
    <div class="eyebrow"><i></i> PORTFÓLIO INTERATIVO · V.01</div>
    <h1>Cada experiência,<br />um novo <em>mundo.</em></h1>
    <p>
      Sou Emanuel. Conecto código, dados e pessoas.<br />Explore os lugares que construíram minha
      história.
    </p>
    <button class="primary" @click="$emit('start')">Escolher destino <span>↗</span></button>
    <div class="location"><span>◎</span> SÃO LUÍS, BRASIL <b>·</b> FULL STACK DEVELOPER</div>
  </section>
</template>
