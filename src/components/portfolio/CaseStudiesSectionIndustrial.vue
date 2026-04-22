<template>
  <section id="showcase" ref="target" class="relative py-32 px-6">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{ $t('industrial.showcase.label') }}</span>
        <h2 class="mt-4 text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.showcase.headingA') }} <span class="text-gold">{{ $t('industrial.showcase.headingB') }}</span>
        </h2>
        <p class="mt-4 max-w-3xl text-lg text-foreground/40">{{ $t('industrial.showcase.headingC') }}</p>
      </div>

      <div class="space-y-10">
        <article
          v-for="(item, index) in caseStudies"
          :key="item.key"
          class="industrial-card border border-border/10 bg-card/15 overflow-hidden transition-all duration-700"
          :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${160 + index * 90}ms` }"
        >
          <div class="grid xl:grid-cols-[1.15fr,0.85fr] gap-0">
            <div class="relative min-h-[320px] border-b xl:border-b-0 xl:border-r border-border/10 bg-obsidian/50">
              <img
                :src="item.slides[activeSlide[item.key]].src"
                :alt="item.slides[activeSlide[item.key]].alt"
                class="w-full h-full object-cover"
              />

              <div class="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 bg-gradient-to-b from-obsidian/85 to-transparent">
                <div>
                  <div class="font-mono text-[11px] tracking-[0.25em] text-gold/70 uppercase">{{ item.badge }}</div>
                  <div class="mt-1 text-sm text-foreground/55">{{ item.slides[activeSlide[item.key]].caption }}</div>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-obsidian/70 text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors"
                    :aria-label="$t('industrial.showcase.prev')"
                    @click="changeSlide(item.key, -1)"
                  >
                    <ChevronLeft :size="18" />
                  </button>
                  <button
                    type="button"
                    class="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-obsidian/70 text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors"
                    :aria-label="$t('industrial.showcase.next')"
                    @click="changeSlide(item.key, 1)"
                  >
                    <ChevronRight :size="18" />
                  </button>
                </div>
              </div>

              <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent">
                <div class="flex items-center gap-2 mb-3">
                  <button
                    v-for="(slide, slideIndex) in item.slides"
                    :key="slide.src"
                    type="button"
                    class="h-1.5 rounded-full transition-all"
                    :class="slideIndex === activeSlide[item.key] ? 'w-10 bg-gold' : 'w-4 bg-white/25 hover:bg-white/45'"
                    :aria-label="`${$t('industrial.showcase.goTo')} ${slideIndex + 1}`"
                    @click="setSlide(item.key, slideIndex)"
                  />
                </div>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="metric in item.metrics"
                    :key="metric"
                    class="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 font-mono text-[11px] tracking-wider text-gold/80"
                  >
                    {{ metric }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-6 md:p-8">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 class="text-2xl md:text-3xl font-inter font-bold tracking-tight">{{ item.title }}</h3>
                  <p class="mt-1 font-mono text-xs tracking-[0.22em] text-foreground/40 uppercase">{{ item.category }}</p>
                </div>

                <div class="flex items-center gap-1 text-gold">
                  <Star v-for="starIndex in 5" :key="starIndex" :size="16" class="fill-current" />
                </div>
              </div>

              <p class="mt-5 text-foreground/65 leading-relaxed">{{ item.summary }}</p>

              <div class="mt-6 grid sm:grid-cols-3 gap-4">
                <div class="rounded-2xl border border-border/10 bg-card/35 p-4">
                  <div class="font-mono text-[11px] tracking-[0.22em] text-foreground/35 uppercase">{{ $t('industrial.showcase.problem') }}</div>
                  <div class="mt-2 text-sm text-foreground/70 leading-relaxed">{{ item.problem }}</div>
                </div>
                <div class="rounded-2xl border border-border/10 bg-card/35 p-4">
                  <div class="font-mono text-[11px] tracking-[0.22em] text-foreground/35 uppercase">{{ $t('industrial.showcase.solution') }}</div>
                  <div class="mt-2 text-sm text-foreground/70 leading-relaxed">{{ item.solution }}</div>
                </div>
                <div class="rounded-2xl border border-border/10 bg-card/35 p-4">
                  <div class="font-mono text-[11px] tracking-[0.22em] text-foreground/35 uppercase">{{ $t('industrial.showcase.result') }}</div>
                  <div class="mt-2 text-sm text-foreground/70 leading-relaxed">{{ item.result }}</div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl border border-gold/15 bg-gold/5 p-5">
                <div class="font-mono text-[11px] tracking-[0.24em] text-gold/65 uppercase">{{ $t('industrial.showcase.clientFeedback') }}</div>
                <p class="mt-3 text-base md:text-lg leading-relaxed text-foreground/80">“{{ item.review }}”</p>
                <div class="mt-4 text-sm text-foreground/45">
                  <span class="font-semibold text-foreground/70">{{ item.author }}</span>
                  <span> · {{ item.role }}</span>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-xs font-semibold tracking-[0.2em] text-obsidian uppercase hover:bg-gold/90 transition-colors"
                  @click="openWhatsApp(item.title)"
                >
                  {{ $t('industrial.showcase.cta') }}
                  <ArrowUpRight :size="15" />
                </button>
                <span class="font-mono text-xs tracking-wider text-foreground/35">{{ $t('industrial.showcase.ctaHint') }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useInViewOnce } from '../../composables/useInViewOnce';

const { target, inView } = useInViewOnce({ rootMargin: '-120px' });
const { t, locale } = useI18n();

const WHATSAPP_NUMBER = '5598988123003';

const caseStudies = computed(() => {
  void locale.value;
  return [
    {
      key: 'operations',
      badge: t('industrial.showcase.items.operations.badge'),
      title: t('industrial.showcase.items.operations.title'),
      category: t('industrial.showcase.items.operations.category'),
      summary: t('industrial.showcase.items.operations.summary'),
      problem: t('industrial.showcase.items.operations.problem'),
      solution: t('industrial.showcase.items.operations.solution'),
      result: t('industrial.showcase.items.operations.result'),
      review: t('industrial.showcase.items.operations.review'),
      author: t('industrial.showcase.items.operations.author'),
      role: t('industrial.showcase.items.operations.role'),
      metrics: [
        t('industrial.showcase.items.operations.metrics.0'),
        t('industrial.showcase.items.operations.metrics.1'),
        t('industrial.showcase.items.operations.metrics.2'),
      ],
      slides: [
        {
          src: '/projetos_entregues/materialDeConstrucao/materialDashboard.png',
          alt: t('industrial.showcase.items.operations.slides.0.alt'),
          caption: t('industrial.showcase.items.operations.slides.0.caption'),
        },
        {
          src: '/projetos_entregues/materialDeConstrucao/materialLogin.png',
          alt: t('industrial.showcase.items.operations.slides.1.alt'),
          caption: t('industrial.showcase.items.operations.slides.1.caption'),
        },
        {
          src: '/projetos_entregues/materialDeConstrucao/materialMateriais.png',
          alt: t('industrial.showcase.items.operations.slides.2.alt') || t('industrial.showcase.items.operations.slides.1.alt'),
          caption: t('industrial.showcase.items.operations.slides.2.caption') || t('industrial.showcase.items.operations.slides.1.caption'),
        },
      ],
    },
  ];
});

const activeSlide = reactive({
  operations: 0,
});

function setSlide(key, index) {
  activeSlide[key] = index;
}

function changeSlide(key, step) {
  const total = caseStudies.value.find((item) => item.key === key)?.slides.length || 1;
  activeSlide[key] = (activeSlide[key] + step + total) % total;
}

function openWhatsApp(projectTitle) {
  const text = t('industrial.showcase.prefilledMessage', { project: projectTitle });
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
</script>
