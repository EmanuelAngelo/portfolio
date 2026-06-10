<template>
  <section id="hero" class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden blueprint-grid">
    <div class="absolute inset-0">
      <img
        :src="heroImageUrl"
        alt=""
        class="w-full h-full object-cover opacity-20"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
    </div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block" aria-hidden="true">
      <div class="absolute left-[10%] top-0 code-stream opacity-[0.04]">
        <div class="font-mono text-xs text-gold whitespace-nowrap leading-8">
          <div v-for="(line, i) in codeLinesA" :key="`a-${i}`">{{ line }}</div>
        </div>
      </div>
      <div
        class="absolute right-[15%] top-0 code-stream opacity-[0.03]"
        :style="{ animationDelay: '-10s' }"
      >
        <div class="font-mono text-xs text-gold whitespace-nowrap leading-8">
          <div v-for="(line, i) in codeLinesB" :key="`b-${i}`">{{ line }}</div>
        </div>
      </div>
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center pb-28 sm:pb-32 pt-24 sm:pt-28">
      <div
        class="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 border border-gold/20 bg-obsidian/50 backdrop-blur-sm mb-8 sm:mb-12 transition-all duration-700 max-w-full"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <span class="w-2 h-2 rounded-full bg-lime pulse-glow flex-shrink-0" />
        <span class="font-mono text-[10px] sm:text-xs tracking-wider sm:tracking-widest text-foreground/50 truncate">
          {{ $t('industrial.hero.status') }}
        </span>
      </div>

      <h1
        class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-inter font-black tracking-tighter leading-[0.95] sm:leading-none transition-all duration-700 break-words"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        style="transition-delay: 140ms"
      >
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-gold">
          EMANUEL
        </span>
        <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold to-foreground">
          ANGELO
        </span>
      </h1>

      <p
        class="mt-6 sm:mt-8 font-mono text-xs sm:text-sm md:text-base tracking-wide sm:tracking-widest text-gold/80 uppercase transition-opacity duration-700 px-2 max-w-2xl mx-auto leading-relaxed"
        :class="mounted ? 'opacity-100' : 'opacity-0'"
        style="transition-delay: 420ms"
      >
        {{ $t('industrial.hero.title') }}
      </p>

      <div class="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2">
        <div class="w-px h-12 sm:h-16 bg-gradient-to-b from-gold/60 to-transparent mx-auto scroll-indicator" />
        <span class="font-mono text-[10px] sm:text-xs text-foreground/30 tracking-widest mt-2 block">{{ $t('industrial.hero.scroll') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const heroImageUrl = '/hero-industrial.svg';

const CODE_LINES = [
  'from django.db import models',
  'class ProjectAPI(ViewSet):',
  '    queryset = Project.objects.all()',
  '    serializer = ProjectSerializer',
  'SELECT p.name, COUNT(*) as total',
  'FROM projects p JOIN tasks t',
  'ON p.id = t.project_id',
  'GROUP BY p.name ORDER BY total DESC;',
  'import { ref, computed } from "vue"',
  'const data = ref([])',
  'const filtered = computed(() =>',
  '  data.value.filter(d => d.active))',
  'docker-compose up --build -d',
  'python manage.py migrate',
  'npm run build && npm run serve',
  'git push origin main --force',
  'CREATE INDEX idx_perf ON reports',
  'ALTER TABLE users ADD COLUMN role',
  'def optimize_pipeline(data):',
  '    return ETL(data).transform()',
];

const mounted = ref(false);

const codeLinesA = computed(() => [...CODE_LINES, ...CODE_LINES]);
const codeLinesB = computed(() => [...CODE_LINES].reverse().concat(CODE_LINES));

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true;
  });
});
</script>
