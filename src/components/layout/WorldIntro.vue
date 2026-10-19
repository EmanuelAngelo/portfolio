<script setup>
defineProps({ exploring: Boolean });
defineEmits(['start']);
</script>
<template>
  <section class="intro" :class="{ exploring }">
    <div class="eyebrow"><i></i> SURVIVOR LOG · SECTOR 01</div>
    <h1>Reconstrua a rota.<br />Descubra meu <em>percurso.</em></h1>
    <p>
      Sou Emanuel. Código, dados e pessoas são minhas ferramentas.<br />Explore os setores que
      registram minha história.
    </p>
    <button class="primary" @click="$emit('start')">Selecionar setor <span>↗</span></button>
    <div class="location"><span>◎</span> SÃO LUÍS, BRASIL <b>·</b> FULL STACK DEVELOPER</div>
  </section>
</template>
