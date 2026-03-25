<template>
  <section id="impact" ref="target" class="relative py-32 px-6">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.impact.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.impact.headingA') }} <span class="text-gold">{{ $t('industrial.impact.headingB') }}</span>
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, i) in impacts"
          :key="item.label"
          class="industrial-card group relative p-6 border border-border/10 bg-card/20 hover:border-gold/30 hover:bg-card/40 transition-all overflow-hidden"
          :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDuration: '600ms', transitionDelay: `${160 + i * 110}ms` }"
        >
          <div class="absolute -top-12 -right-12 w-24 h-24 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <component :is="item.icon" :size="20" class="text-gold/60 mb-4" />

          <div class="text-4xl md:text-5xl font-inter font-black text-gold text-gold-glow mb-2">
            {{ item.metric }}
          </div>
          <h3 class="font-mono text-xs tracking-wider text-foreground uppercase mb-3">{{ item.label }}</h3>
          <p class="text-sm text-foreground/40 leading-relaxed">{{ item.description }}</p>
          <div class="mt-4 pt-3 border-t border-border/10">
            <span class="font-mono text-xs text-gold/40 tracking-wider">{{ item.company }}</span>
          </div>
        </div>
      </div>

      <div
        class="industrial-card mt-20 p-8 border border-border/10 bg-card/10 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        style="transition-delay: 720ms"
      >
        <h3 class="font-mono text-xs tracking-widest text-gold/60 uppercase mb-8">{{ $t('industrial.impact.sectors') }}</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="s in sectors" :key="s.name" class="flex items-center gap-3">
            <span class="text-sm" :style="{ color: s.color }">▸</span>
            <span class="font-mono text-sm tracking-wider" :style="{ color: s.color }">{{ s.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Clock, Shield, TrendingDown, Zap } from 'lucide-vue-next';
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });

const { t, locale } = useI18n();

const impacts = computed(() => {
  void locale.value;
  return [
    {
      icon: TrendingDown,
      metric: t('industrial.impact.cards.onboarding.metric'),
      label: t('industrial.impact.cards.onboarding.label'),
      description: t('industrial.impact.cards.onboarding.desc'),
      company: t('industrial.impact.cards.onboarding.company'),
    },
    {
      icon: Clock,
      metric: t('industrial.impact.cards.analysis.metric'),
      label: t('industrial.impact.cards.analysis.label'),
      description: t('industrial.impact.cards.analysis.desc'),
      company: t('industrial.impact.cards.analysis.company'),
    },
    {
      icon: Shield,
      metric: t('industrial.impact.cards.sla.metric'),
      label: t('industrial.impact.cards.sla.label'),
      description: t('industrial.impact.cards.sla.desc'),
      company: t('industrial.impact.cards.sla.company'),
    },
    {
      icon: Zap,
      metric: t('industrial.impact.cards.delivery.metric'),
      label: t('industrial.impact.cards.delivery.label'),
      description: t('industrial.impact.cards.delivery.desc'),
      company: t('industrial.impact.cards.delivery.company'),
    },
  ];
});

const sectors = [
  { name: 'Finanças', color: '#4A9EFF' },
  { name: 'Educação', color: '#8AFF00' },
  { name: 'Saúde', color: '#FF6B6B' },
  { name: 'Energia', color: '#FFB800' },
];
</script>
