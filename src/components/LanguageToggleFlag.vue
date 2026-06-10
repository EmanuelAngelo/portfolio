<template>
  <div
    ref="root"
    class="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 z-40"
  >
    <button
      type="button"
      class="group inline-flex items-center gap-2 rounded-full border border-gold/20 bg-obsidian/80 backdrop-blur-xl px-3 py-2 text-foreground/70 hover:text-gold hover:border-gold/40 transition-colors shadow-lg"
      @click="toggleOpen"
      :aria-label="$t('industrial.language.label')"
      :title="$t('industrial.language.label')"
      :aria-expanded="isOpen"
    >
      <span class="w-2 h-2 rounded-full" :class="isOpen ? 'bg-lime pulse-glow' : 'bg-foreground/20'" />
      <span class="font-mono text-xs tracking-widest uppercase">{{ currentShort }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute bottom-full right-0 mb-2 flex flex-col gap-1 rounded-2xl border border-gold/15 bg-obsidian/95 backdrop-blur-xl p-2 min-w-[140px] shadow-xl"
      role="menu"
    >
      <button
        v-for="opt in otherOptions"
        :key="opt.locale"
        type="button"
        class="flex items-center justify-between gap-4 rounded-xl px-3 py-2 hover:bg-card/30 transition whitespace-nowrap"
        @click="selectLocale(opt.locale)"
        role="menuitem"
      >
        <span class="font-mono text-xs tracking-widest uppercase text-foreground/70">{{ opt.short }}</span>
        <span class="font-mono text-xs tracking-wider text-foreground/40">{{ opt.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { persistLocale } from '../i18n';

const { locale, t } = useI18n();
const currentLocale = computed(() => String(locale.value));

const isOpen = ref(false);

const root = ref(null);

const onDocClick = (e) => {
  if (!isOpen.value) return;
  const el = root.value;
  if (!el) return;
  if (el.contains(e.target)) return;
  isOpen.value = false;
};

onMounted(() => {
  document.addEventListener('click', onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick);
});

const options = computed(() => [
  { locale: 'pt', short: 'PT', label: t('industrial.language.pt') },
  { locale: 'en', short: 'EN', label: t('industrial.language.en') },
  { locale: 'es', short: 'ES', label: t('industrial.language.es') },
]);

const currentOption = computed(() =>
  options.value.find((o) => o.locale === currentLocale.value) || options.value[0]
);

const otherOptions = computed(() =>
  options.value.filter((o) => o.locale !== currentOption.value.locale)
);

const currentShort = computed(() => currentOption.value.short);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}

function selectLocale(nextLocale) {
  locale.value = persistLocale(nextLocale);
  isOpen.value = false;
}
</script>
