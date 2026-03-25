<template>
  <section id="about" ref="target" class="relative py-32 px-6">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.about.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.about.headingA') }} <span class="text-gold">{{ $t('industrial.about.headingB') }}</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <div
          class="space-y-6 transition-all duration-700"
          :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
          style="transition-delay: 120ms"
        >
          <p class="text-lg leading-relaxed text-foreground/70">
            {{ $t('industrial.about.p1a') }}
            <span class="text-gold font-semibold"> {{ $t('industrial.about.p1b') }}</span>
            {{ ' ' + $t('industrial.about.p1c') }}
          </p>
          <p class="text-lg leading-relaxed text-foreground/70">
            {{ $t('industrial.about.p2') }}
          </p>
          <p class="text-lg leading-relaxed text-foreground/70">
            {{ $t('industrial.about.p3') }}
          </p>

          <div class="flex flex-wrap gap-2 pt-4">
            <span
              v-for="tech in techTags"
              :key="tech"
              class="px-3 py-1.5 border border-border/10 bg-card/20 font-mono text-xs tracking-wider text-foreground/60 hover:border-gold/30 hover:text-gold transition-colors"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="space-y-6">
          <div
            v-for="(comp, i) in competencies"
            :key="comp.titleKey"
            class="industrial-card group flex gap-4 p-5 border border-border/10 bg-card/20 hover:border-gold/20 hover:bg-card/40 transition-all duration-300"
            :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
            :style="{ transitionDuration: '700ms', transitionDelay: `${180 + i * 90}ms` }"
          >
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/20 bg-gold/5 text-gold group-hover:bg-gold/10 transition-colors">
              <component :is="comp.icon" :size="18" />
            </div>
            <div>
              <h3 class="font-mono text-sm tracking-wider text-foreground mb-1">{{ $t(comp.titleKey) }}</h3>
              <p class="text-sm text-foreground/50 leading-relaxed">{{ $t(comp.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BarChart3, Code2, Database, Globe } from 'lucide-vue-next';
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const techTags = [
  'Python',
  'Django/DRF',
  'Vue.js',
  'SQL Server',
  'PostgreSQL',
  'Power BI',
  'Snowflake',
  'Docker',
  'Git',
  'KNIME',
  'TOTVS RM',
];

const competencies = [
  {
    icon: Database,
    titleKey: 'industrial.about.competencies.backendTitle',
    descKey: 'industrial.about.competencies.backendDesc',
  },
  {
    icon: Code2,
    titleKey: 'industrial.about.competencies.frontendTitle',
    descKey: 'industrial.about.competencies.frontendDesc',
  },
  {
    icon: BarChart3,
    titleKey: 'industrial.about.competencies.processTitle',
    descKey: 'industrial.about.competencies.processDesc',
  },
  {
    icon: Globe,
    titleKey: 'industrial.about.competencies.globalTitle',
    descKey: 'industrial.about.competencies.globalDesc',
  },
];
</script>
