<template>
  <button
    type="button"
    class="fixed bottom-6 left-6 z-50 rounded-full bg-white/90 p-2 shadow-md hover:scale-105 transition"
    @click="toggle"
    :aria-label="currentLocale === 'pt' ? 'Switch to English' : 'Mudar para Português'"
    title="Language"
  >
    <img
      v-if="currentLocale === 'pt'"
      :src="UK_FLAG"
      alt="English"
      class="h-8 w-8 rounded-full object-cover"
    />
    <img
      v-else
      :src="BR_FLAG"
      alt="Português"
      class="h-8 w-8 rounded-full object-cover"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { persistLocale } from '../i18n';

const BR_FLAG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png';
const UK_FLAG = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png';

const { locale } = useI18n();
const currentLocale = computed(() => String(locale.value));

function toggle() {
  const next = currentLocale.value === 'pt' ? 'en' : 'pt';
  locale.value = persistLocale(next);
}
</script>
