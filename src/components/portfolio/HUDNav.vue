<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-obsidian/80 backdrop-blur-xl border-b border-gold/10' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <button
        type="button"
        @click="scrollTo('hero')"
        class="font-mono text-sm text-gold tracking-widest hover:text-gold/80 transition-colors"
      >
        EA<span class="text-foreground/40">_DEV</span>
      </button>

      <nav class="hidden md:flex items-center gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          @click="scrollTo(item.id)"
          class="group relative px-4 py-2 font-mono text-xs tracking-wider text-foreground/60 hover:text-gold transition-colors overflow-hidden"
        >
          {{ item.label }}
          <span
            class="absolute bottom-0 left-3 right-3 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          />
        </button>

        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-4 px-4 py-2 border border-gold/30 text-gold font-mono text-xs tracking-wider hover:bg-gold/10 transition-all"
        >
          LINKEDIN
        </a>

        <button
          type="button"
          @click="toggleTheme"
          class="ml-2 inline-flex h-10 w-10 items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-all"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <Moon v-if="theme === 'dark'" :size="18" />
          <Sun v-else :size="18" />
        </button>
      </nav>

      <div class="md:hidden flex items-center gap-2">
        <button
          type="button"
          @click="toggleTheme"
          class="inline-flex h-10 w-10 items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-all"
          :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <Moon v-if="theme === 'dark'" :size="18" />
          <Sun v-else :size="18" />
        </button>

        <button
          type="button"
          @click="mobileOpen = !mobileOpen"
          class="text-foreground/60 hover:text-gold transition-colors p-2"
          aria-label="Abrir menu"
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
      class="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl pt-20 px-6"
      @click.self="mobileOpen = false"
    >
      <nav class="flex flex-col gap-2">
        <button
          v-for="(item, i) in navItems"
          :key="item.id"
          type="button"
          @click="scrollTo(item.id)"
          class="text-left py-4 border-b border-border/10 font-mono text-lg tracking-wider text-foreground/60 hover:text-gold transition-all"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          {{ item.label }}
        </button>

        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 text-center py-4 border border-gold/30 text-gold font-mono text-lg tracking-wider"
        >
          LINKEDIN
        </a>

        <button
          type="button"
          @click="toggleTheme"
          class="mt-2 inline-flex items-center justify-center gap-2 py-4 border border-gold/30 text-gold font-mono text-lg tracking-wider hover:bg-gold/10 transition-all"
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Menu, Moon, Sun, X } from 'lucide-vue-next';
import { useTheme } from '../../composables/useTheme';

const { theme, toggleTheme } = useTheme();

const linkedinUrl = 'https://www.linkedin.com/in/emanuelangelo/';

const navItems = [
  { id: 'about', label: '01_ABOUT' },
  { id: 'experience', label: '02_EXPERIENCE' },
  { id: 'skills', label: '03_SKILLS' },
  { id: 'impact', label: '04_IMPACT' },
  { id: 'projects', label: '05_PROJECTS' },
  { id: 'contact', label: '06_CONTACT' },
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

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
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
