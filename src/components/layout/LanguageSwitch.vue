<script setup>
import { useLocale } from '../../i18n/index.js';
const { locale, t, setLocale } = useLocale();
</script>
<template>
  <label class="language-picker">
    <span class="sr-only">{{ t('Idioma') }}</span>
    <select :value="locale" :aria-label="t('Idioma')" @change="setLocale($event.target.value)">
      <option value="pt-BR">PT-BR</option>
      <option value="en">EN</option>
    </select>
  </label>
</template>
