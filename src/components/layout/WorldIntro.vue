<script setup>
import { useLocale } from '../../i18n/index.js';
const { t } = useLocale();
defineProps({ exploring: Boolean });
defineEmits(['start']);
</script>
<template>
  <section class="intro" :class="{ exploring }">
    <div class="eyebrow"><i></i>{{ t('DIÁRIO DE CAMPO · SETOR 01') }}</div>
    <h1>
      {{ t('Reconstrua a rota.') }}<br />{{ t('Descubra meu') }} <em>{{ t('percurso.') }}</em>
    </h1>
    <p>
      {{ t('Sou Emanuel. Código, dados e pessoas são minhas ferramentas.') }}<br />{{
        t('Explore os setores que registram minha história.')
      }}
    </p>
    <button class="primary" @click="$emit('start')">
      {{ t('Selecionar setor') }}<span>↗</span>
    </button>
    <div class="location">
      <span>◎</span>{{ t('SÃO LUÍS, BRASIL') }}<b>·</b>{{ t('DESENVOLVEDOR FULL STACK') }}
    </div>
  </section>
</template>
