<template>
  <section id="skills" ref="target" class="relative py-32 px-6 blueprint-grid">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.skills.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.skills.headingA') }} <span class="text-gold">{{ $t('industrial.skills.headingB') }}</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div
          v-for="(cat, ci) in categories"
          :key="cat.titleKey"
          class="p-6 border border-border/10 bg-card/20 hover:border-gold/20 transition-colors"
          :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDuration: '600ms', transitionDelay: `${160 + ci * 110}ms` }"
        >
          <h3 class="font-mono text-sm tracking-widest text-gold mb-6 uppercase">{{ $t(cat.titleKey) }}</h3>

          <div class="space-y-4">
            <div v-for="(skill, si) in cat.skills" :key="skill.name">
              <div class="flex justify-between mb-1.5">
                <span class="font-mono text-xs tracking-wider text-foreground/70">{{ skill.name }}</span>
                <span class="font-mono text-xs text-foreground/30">{{ skill.level }}%</span>
              </div>

              <div class="h-1 bg-obsidian/60 overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-gold/80 to-gold transition-[width]"
                  :style="{
                    width: inView ? `${skill.level}%` : '0%',
                    transitionDuration: '900ms',
                    transitionDelay: `${420 + ci * 120 + si * 70}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const categories = [
  {
    titleKey: 'industrial.skills.categories.backend',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Django/DRF', level: 92 },
      { name: 'GoLang', level: 65 },
      { name: 'REST APIs', level: 90 },
      { name: 'ETL', level: 80 },
    ],
  },
  {
    titleKey: 'industrial.skills.categories.frontend',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React.js', level: 70 },
      { name: 'TypeScript', level: 68 },
      { name: 'HTML/CSS', level: 92 },
    ],
  },
  {
    titleKey: 'industrial.skills.categories.data',
    skills: [
      { name: 'SQL Server', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Power BI', level: 85 },
      { name: 'Snowflake', level: 60 },
      { name: 'KNIME', level: 55 },
    ],
  },
  {
    titleKey: 'industrial.skills.categories.devops',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'Git', level: 90 },
      { name: 'TOTVS RM', level: 88 },
      { name: 'Linux', level: 75 },
      { name: 'ITIL', level: 70 },
    ],
  },
];
</script>
