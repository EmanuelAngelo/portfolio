<script setup>
import { useLocale } from '../../i18n/index.js';
import LanguageSwitch from './LanguageSwitch.vue';
const { t } = useLocale();
defineEmits(['home', 'map', 'profile', 'contact']);
</script>
<template>
  <header>
    <a class="brand" href="#" :aria-label="t('Voltar ao início')" @click.prevent="$emit('home')">
      <span class="logo" aria-hidden="true">e<span>a</span><i>■</i></span>
      <span
        >EMANUEL ANGELO<small>{{ t('OPERAÇÕES / DESENVOLVEDOR') }}</small></span
      >
    </a>
    <nav :aria-label="t('Navegação principal')">
      <button @click="$emit('map')">
        ◈ <span>{{ t('Abrir mapa') }}</span>
      </button>
      <button class="profile-button" @click="$emit('profile')">{{ t('Sobre mim') }}</button>
      <button class="contact" @click="$emit('contact')">
        {{ t('Vamos conversar') }}<span>↗</span>
      </button>
      <LanguageSwitch />
    </nav>
  </header>
</template>
