<template>
  <section id="showcase" ref="target" class="relative section-padding">
    <div class="max-w-7xl mx-auto">
      <div
        class="mb-12 sm:mb-16 md:mb-20 transition-all duration-700"
        :class="inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
      >
        <span class="font-mono text-xs tracking-widest text-gold/60 uppercase">{{
          $t('industrial.showcase.label')
        }}</span>
        <h2 class="mt-4 text-3xl sm:text-4xl md:text-6xl font-inter font-black tracking-tight">
          {{ $t('industrial.showcase.headingA') }}
          <span class="text-gold">{{ $t('industrial.showcase.headingB') }}</span>
        </h2>
        <p class="mt-4 max-w-3xl text-base sm:text-lg text-foreground/40">
          {{ $t('industrial.showcase.headingC') }}
        </p>
      </div>

      <div class="space-y-8 sm:space-y-10">
        <article
          v-for="(item, index) in caseStudies"
          :key="item.key"
          class="industrial-card border border-border/10 bg-card/15 overflow-hidden transition-all duration-700"
          :class="inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${160 + index * 90}ms` }"
        >
          <div class="grid xl:grid-cols-[1.15fr,0.85fr] gap-0">
            <div
              class="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] border-b xl:border-b-0 xl:border-r border-border/10 bg-obsidian/50"
            >
              <img
                :src="slideSrc(item)"
                :alt="item.slides[activeSlide[item.key]].alt"
                class="w-full h-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] object-cover object-top"
                loading="lazy"
                @error="onImageError(item.key, activeSlide[item.key])"
              />

              <div
                class="absolute inset-x-0 top-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 sm:p-4 bg-gradient-to-b from-obsidian/90 to-transparent"
              >
                <div class="min-w-0">
                  <div
                    class="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-gold/70 uppercase truncate"
                  >
                    {{ item.badge }}
                  </div>
                  <div class="mt-1 text-xs sm:text-sm text-foreground/55 line-clamp-2">
                    {{ item.slides[activeSlide[item.key]].caption }}
                  </div>
                </div>

                <div class="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    class="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/10 bg-obsidian/70 text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors"
                    :aria-label="$t('industrial.showcase.prev')"
                    @click="changeSlide(item.key, -1)"
                  >
                    <ChevronLeft :size="18" />
                  </button>
                  <button
                    type="button"
                    class="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-white/10 bg-obsidian/70 text-foreground/70 hover:text-gold hover:border-gold/30 transition-colors"
                    :aria-label="$t('industrial.showcase.next')"
                    @click="changeSlide(item.key, 1)"
                  >
                    <ChevronRight :size="18" />
                  </button>
                </div>
              </div>

              <div
                class="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
              >
                <div class="flex items-center gap-2 mb-3">
                  <button
                    v-for="(slide, slideIndex) in item.slides"
                    :key="slide.src"
                    type="button"
                    class="h-1.5 rounded-full transition-all"
                    :class="
                      slideIndex === activeSlide[item.key]
                        ? 'w-8 sm:w-10 bg-gold'
                        : 'w-3 sm:w-4 bg-white/25 hover:bg-white/45'
                    "
                    :aria-label="`${$t('industrial.showcase.goTo')} ${slideIndex + 1}`"
                    @click="setSlide(item.key, slideIndex)"
                  />
                </div>

                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <span
                    v-for="metric in item.metrics"
                    :key="metric"
                    class="rounded-full border border-gold/20 bg-gold/5 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] tracking-wider text-gold/80"
                  >
                    {{ metric }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5 sm:p-6 md:p-8">
              <div class="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
                <div class="min-w-0 flex-1">
                  <h3 class="text-xl sm:text-2xl md:text-3xl font-inter font-bold tracking-tight">
                    {{ item.title }}
                  </h3>
                  <p
                    class="mt-1 font-mono text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] text-foreground/40 uppercase"
                  >
                    {{ item.category }}
                  </p>
                </div>

                <div class="flex items-center gap-0.5 sm:gap-1 text-gold flex-shrink-0">
                  <Star
                    v-for="starIndex in 5"
                    :key="starIndex"
                    :size="14"
                    class="sm:w-4 sm:h-4 fill-current"
                  />
                </div>
              </div>

              <p class="mt-4 sm:mt-5 text-sm sm:text-base text-foreground/65 leading-relaxed">
                {{ item.summary }}
              </p>

              <div class="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div
                  class="rounded-xl sm:rounded-2xl border border-border/10 bg-card/35 p-3 sm:p-4"
                >
                  <div
                    class="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] text-foreground/35 uppercase"
                  >
                    {{ $t('industrial.showcase.problem') }}
                  </div>
                  <div class="mt-2 text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {{ item.problem }}
                  </div>
                </div>
                <div
                  class="rounded-xl sm:rounded-2xl border border-border/10 bg-card/35 p-3 sm:p-4"
                >
                  <div
                    class="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] text-foreground/35 uppercase"
                  >
                    {{ $t('industrial.showcase.solution') }}
                  </div>
                  <div class="mt-2 text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {{ item.solution }}
                  </div>
                </div>
                <div
                  class="rounded-xl sm:rounded-2xl border border-border/10 bg-card/35 p-3 sm:p-4"
                >
                  <div
                    class="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] text-foreground/35 uppercase"
                  >
                    {{ $t('industrial.showcase.result') }}
                  </div>
                  <div class="mt-2 text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {{ item.result }}
                  </div>
                </div>
              </div>

              <div
                class="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-gold/15 bg-gold/5 p-4 sm:p-5"
              >
                <div
                  class="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] text-gold/65 uppercase"
                >
                  {{ $t('industrial.showcase.clientFeedback') }}
                </div>
                <p class="mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-foreground/80">
                  "{{ item.review }}"
                </p>
                <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-foreground/45">
                  <span class="font-semibold text-foreground/70">{{ item.author }}</span>
                  <span> · {{ item.role }}</span>
                </div>
              </div>

              <div
                class="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 bg-gold px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-obsidian uppercase hover:bg-gold/90 transition-colors"
                  @click="openWhatsApp(item.title)"
                >
                  {{ $t('industrial.showcase.cta') }}
                  <ArrowUpRight :size="15" />
                </button>
                <span
                  class="font-mono text-[10px] sm:text-xs tracking-wider text-foreground/35 text-center sm:text-left"
                  >{{ $t('industrial.showcase.ctaHint') }}</span
                >
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

const FALLBACK_IMAGES = {
  operations: ['/showcase-operations-1.svg', '/showcase-operations-2.svg'],
  sales: ['/showcase-sales-1.svg', '/showcase-sales-2.svg'],
  service: ['/showcase-service-1.svg', '/showcase-service-2.svg'],
};

const failedImages = reactive({});

function onImageError(key, slideIndex) {
  failedImages[`${key}-${slideIndex}`] = true;
}

function slideSrc(item) {
  const idx = activeSlide[item.key];
  const slide = item.slides[idx];
  if (failedImages[`${item.key}-${idx}`]) {
    return (
      slide.fallback ||
      FALLBACK_IMAGES[item.key]?.[idx % (FALLBACK_IMAGES[item.key]?.length || 1)] ||
      '/showcase-operations-1.svg'
    );
  }
  return slide.src;
}

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
          fallback: '/showcase-operations-1.svg',
          alt: t('industrial.showcase.items.operations.slides.0.alt'),
          caption: t('industrial.showcase.items.operations.slides.0.caption'),
        },
        {
          src: '/projetos_entregues/materialDeConstrucao/materialLogin.png',
          fallback: '/showcase-operations-2.svg',
          alt: t('industrial.showcase.items.operations.slides.1.alt'),
          caption: t('industrial.showcase.items.operations.slides.1.caption'),
        },
        {
          src: '/projetos_entregues/materialDeConstrucao/materialMateriais.png',
          fallback: '/showcase-operations-1.svg',
          alt: t('industrial.showcase.items.operations.slides.2.alt'),
          caption: t('industrial.showcase.items.operations.slides.2.caption'),
        },
      ],
    },
    {
      key: 'sales',
      badge: t('industrial.showcase.items.sales.badge'),
      title: t('industrial.showcase.items.sales.title'),
      category: t('industrial.showcase.items.sales.category'),
      summary: t('industrial.showcase.items.sales.summary'),
      problem: t('industrial.showcase.items.sales.problem'),
      solution: t('industrial.showcase.items.sales.solution'),
      result: t('industrial.showcase.items.sales.result'),
      review: t('industrial.showcase.items.sales.review'),
      author: t('industrial.showcase.items.sales.author'),
      role: t('industrial.showcase.items.sales.role'),
      metrics: [
        t('industrial.showcase.items.sales.metrics.0'),
        t('industrial.showcase.items.sales.metrics.1'),
        t('industrial.showcase.items.sales.metrics.2'),
      ],
      slides: [
        {
          src: '/showcase-sales-1.svg',
          fallback: '/showcase-sales-1.svg',
          alt: t('industrial.showcase.items.sales.slides.0.alt'),
          caption: t('industrial.showcase.items.sales.slides.0.caption'),
        },
        {
          src: '/showcase-sales-2.svg',
          fallback: '/showcase-sales-2.svg',
          alt: t('industrial.showcase.items.sales.slides.1.alt'),
          caption: t('industrial.showcase.items.sales.slides.1.caption'),
        },
      ],
    },
    {
      key: 'service',
      badge: t('industrial.showcase.items.service.badge'),
      title: t('industrial.showcase.items.service.title'),
      category: t('industrial.showcase.items.service.category'),
      summary: t('industrial.showcase.items.service.summary'),
      problem: t('industrial.showcase.items.service.problem'),
      solution: t('industrial.showcase.items.service.solution'),
      result: t('industrial.showcase.items.service.result'),
      review: t('industrial.showcase.items.service.review'),
      author: t('industrial.showcase.items.service.author'),
      role: t('industrial.showcase.items.service.role'),
      metrics: [
        t('industrial.showcase.items.service.metrics.0'),
        t('industrial.showcase.items.service.metrics.1'),
        t('industrial.showcase.items.service.metrics.2'),
      ],
      slides: [
        {
          src: '/showcase-service-1.svg',
          fallback: '/showcase-service-1.svg',
          alt: t('industrial.showcase.items.service.slides.0.alt'),
          caption: t('industrial.showcase.items.service.slides.0.caption'),
        },
        {
          src: '/showcase-service-2.svg',
          fallback: '/showcase-service-2.svg',
          alt: t('industrial.showcase.items.service.slides.1.alt'),
          caption: t('industrial.showcase.items.service.slides.1.caption'),
        },
      ],
    },
  ];
});

const activeSlide = reactive({
  operations: 0,
  sales: 0,
  service: 0,
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
