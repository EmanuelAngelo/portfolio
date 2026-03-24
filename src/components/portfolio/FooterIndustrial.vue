<template>
  <footer class="py-12 px-6 border-t border-border/10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="font-mono text-xs text-foreground/30 tracking-wider">
        &copy; {{ year }} EMANUEL ANGELO. {{ $t('industrial.footer.operational') }}
      </div>

      <div class="flex items-center gap-4">
        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center border border-border/10 text-foreground/40 hover:text-gold hover:border-gold/30 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin :size="16" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { Linkedin } from 'lucide-vue-next';

const linkedinUrl = 'https://www.linkedin.com/in/emanuelangelo/';
const year = computed(() => new Date().getFullYear());
</script>
