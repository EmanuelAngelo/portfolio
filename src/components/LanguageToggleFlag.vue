<template>
  <div class="fixed bottom-6 left-6 z-50">
    <button
      type="button"
      class="rounded-full bg-white/90 p-2 shadow-md hover:scale-105 transition"
      @click="isOpen = !isOpen"
      aria-label="Open language selector"
      title="Language"
    >
      <img
        :src="currentFlag"
        :alt="currentLabel"
        class="h-8 w-8 rounded-full object-cover"
      />
    </button>

    <div
      v-if="isOpen"
      class="mt-2 flex flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-md"
    >
      <button
        v-for="opt in otherOptions"
        :key="opt.locale"
        type="button"
        class="flex items-center gap-2 rounded-xl p-2 hover:bg-gray-100 transition"
        @click="selectLocale(opt.locale)"
      >
        <img :src="opt.flag" :alt="opt.label" class="h-7 w-7 rounded-full object-cover" />
        <span class="text-sm text-gray-700 font-medium">{{ opt.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { persistLocale } from '../i18n';

const BR_FLAG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1280px-Flag_of_Brazil.svg.png';
const UK_FLAG = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1280px-Flag_of_the_United_Kingdom.svg.png';
const ES_FLAG = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1280px-Flag_of_Spain.svg.png';

const { locale } = useI18n();
const currentLocale = computed(() => String(locale.value));

const isOpen = ref(false);

const options = computed(() => [
  { locale: 'pt', flag: BR_FLAG, label: 'Português (BR)' },
  { locale: 'en', flag: UK_FLAG, label: 'English' },
  { locale: 'es', flag: ES_FLAG, label: 'Español' },
]);

const currentOption = computed(() =>
  options.value.find((o) => o.locale === currentLocale.value) || options.value[1]
);

const otherOptions = computed(() =>
  options.value.filter((o) => o.locale !== currentOption.value.locale)
);

const currentFlag = computed(() => currentOption.value.flag);
const currentLabel = computed(() => currentOption.value.label);

function selectLocale(nextLocale) {
  locale.value = persistLocale(nextLocale);
  isOpen.value = false;
}
</script>
