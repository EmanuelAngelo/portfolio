<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-obsidian/80 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'"
    style="padding-top: env(safe-area-inset-top)"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
      <button
        type="button"
        @click="scrollTo('hero')"
        class="font-mono text-xs sm:text-sm text-gold tracking-widest hover:text-gold/80 transition-colors flex-shrink-0"
      >
        EA<span class="text-foreground/40">_DEV</span>
      </button>

      <nav class="hidden lg:flex items-center gap-0.5 xl:gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          @click="scrollTo(item.id)"
          class="group relative px-2 xl:px-4 py-2 font-mono text-[10px] xl:text-xs tracking-wider text-foreground/60 hover:text-gold transition-colors overflow-hidden whitespace-nowrap"
        >
          {{ item.label }}
          <span
            class="absolute bottom-0 left-2 xl:left-3 right-2 xl:right-3 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          />
        </button>

        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 xl:ml-4 px-3 xl:px-4 py-2 border border-gold/30 text-gold font-mono text-[10px] xl:text-xs tracking-wider hover:bg-gold/10 transition-all whitespace-nowrap"
        >
          LINKEDIN
        </a>

        <button
          type="button"
          @click="toggleTheme"
          class="ml-1 xl:ml-2 inline-flex h-9 w-9 xl:h-10 xl:w-10 items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-all flex-shrink-0"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <Moon v-if="theme === 'dark'" :size="18" />
          <Sun v-else :size="18" />
        </button>
      </nav>

      <div class="lg:hidden flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <button
          type="button"
          @click="toggleTheme"
          class="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-all"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <Moon v-if="theme === 'dark'" :size="18" />
          <Sun v-else :size="18" />
        </button>

        <button
          type="button"
          @click="mobileOpen = !mobileOpen"
          class="text-foreground/60 hover:text-gold transition-colors p-2"
          :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="mobileOpen"
        >
          <Menu v-if="!mobileOpen" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </div>
  </header>

  <transition name="fade">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl overflow-y-auto overscroll-contain"
      style="padding-top: calc(4.5rem + env(safe-area-inset-top)); padding-bottom: env(safe-area-inset-bottom)"
      @click.self="mobileOpen = false"
    >
      <nav class="flex flex-col gap-1 px-4 sm:px-6 max-w-lg mx-auto">
        <button
          v-for="(item, i) in navItems"
          :key="item.id"
          type="button"
          @click="scrollTo(item.id)"
          class="text-left py-3.5 sm:py-4 border-b border-border/10 font-mono text-base sm:text-lg tracking-wider text-foreground/60 hover:text-gold transition-all"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          {{ item.label }}
        </button>

        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 text-center py-3.5 sm:py-4 border border-gold/30 text-gold font-mono text-base sm:text-lg tracking-wider"
          @click="mobileOpen = false"
        >
          LINKEDIN
        </a>

        <button
          type="button"
          @click="toggleTheme"
          class="mt-2 inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 border border-gold/30 text-gold font-mono text-base sm:text-lg tracking-wider hover:bg-gold/10 transition-all"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <Moon v-if="theme === 'dark'" :size="18" />
          <Sun v-else :size="18" />
          <span>{{ theme === 'dark' ? 'LIGHT_MODE' : 'DARK_MODE' }}</span>
        </button>
      </nav>
    </div>
  </transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Menu, Moon, Sun, X } from 'lucide-vue-next';
import { useTheme } from '../../composables/useTheme';

const { theme, toggleTheme } = useTheme();

const linkedinUrl = 'https://www.linkedin.com/in/emanuelangelo/';

const navItems = [
  { id: 'about', label: '01_ABOUT' },
  { id: 'experience', label: '02_EXPERIENCE' },
  { id: 'skills', label: '03_SKILLS' },
  { id: 'impact', label: '04_IMPACT' },
  { id: 'showcase', label: '05_CASES' },
  { id: 'projects', label: '06_REPOS' },
  { id: 'contact', label: '07_CONTACT' },
];

const scrolled = ref(false);
const mobileOpen = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  mobileOpen.value = false;
};

watch(mobileOpen, (open) => {
  document.body.classList.toggle('menu-open', open);
});

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  document.body.classList.remove('menu-open');
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
