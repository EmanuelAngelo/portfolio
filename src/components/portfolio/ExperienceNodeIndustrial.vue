<template>
  <div
    class="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 transition-all"
    :class="[isLeft ? 'md:flex-row' : 'md:flex-row-reverse', inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
    :style="{ transitionDuration: '600ms', transitionDelay: `${120 + index * 90}ms` }"
  >
    <div class="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-10">
      <div
        class="w-3 h-3 rounded-full border-2"
        :style="{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}40` }"
      >
        <div class="w-full h-full rounded-full" :style="{ backgroundColor: exp.color, opacity: 0.4 }" />
      </div>
    </div>

    <div class="w-full md:w-[calc(50%-2rem)] ml-10 md:ml-0">
      <button
        type="button"
        @click="$emit('toggle')"
        class="w-full text-left p-5 border transition-all group"
        :class="expanded ? 'border-gold/30 bg-card/50' : 'border-border/10 bg-card/20 hover:border-gold/20 hover:bg-card/40'"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: exp.color }" />
              <span class="font-mono text-xs tracking-wider text-foreground/40">{{ exp.period }}</span>
            </div>
            <h3 class="font-inter font-semibold text-foreground text-base mb-0.5 truncate">{{ exp.role }}</h3>
            <p class="font-mono text-xs text-gold/70 tracking-wider">{{ exp.company }}</p>
            <p class="font-mono text-xs text-foreground/30 mt-1">{{ exp.location }}</p>
          </div>

          <ChevronRight
            :size="16"
            class="flex-shrink-0 mt-1 text-foreground/30 transition-transform"
            :class="expanded ? 'rotate-90 text-gold' : ''"
          />
        </div>

        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="m in exp.metrics"
            :key="m"
            class="px-2 py-1 text-xs font-mono tracking-wider border bg-obsidian/30"
            :style="{ borderColor: `${exp.color}30`, color: exp.color }"
          >
            {{ m }}
          </span>
        </div>
      </button>

      <div
        class="overflow-hidden transition-[max-height,opacity] duration-300"
        :class="expanded ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="p-5 border border-t-0 border-border/10 bg-card/30">
          <p class="text-sm text-foreground/60 leading-relaxed mb-4">{{ exp.description }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="s in exp.skills"
              :key="s"
              class="px-2 py-0.5 text-xs font-mono text-foreground/40 border border-border/10 bg-obsidian/20"
            >
              {{ s }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  experience: { type: Object, required: true },
  index: { type: Number, required: true },
  expanded: { type: Boolean, required: true },
  inView: { type: Boolean, required: true },
});

defineEmits(['toggle']);

const exp = computed(() => props.experience);
const isLeft = computed(() => props.index % 2 === 0);
</script>
