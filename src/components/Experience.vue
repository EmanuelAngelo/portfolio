<template>
  <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-right">
    {{ $t('experience.title') }}
  </h2>
  <div class="space-y-16 py-14">
    <div class="space-y-16 py-14">
      <div
        v-for="element in Experience"
        :key="element.id"
        data-aos="fade-right"
        class="flex items-center rounded-xl bg-white/75"
      >
        <div class="w-1/4">
          <img :src="element.icon" :alt="element.title" />
        </div>
        <div class="w-3/4 pl-4">
          <h3 class="uppercase font-semibold text-primary text-base">
            {{ element.title }}
          </h3>
          <p class="text-gray-500">{{ element.company }}</p>
          <p class="text-gray-500">{{ element.duration }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const ExperienceSource = ref([
  {
    id: 1,
    title: { en: "Distribution Analyst", pt: "Analista de Distribuição Pleno" },
    company: { en: "Equatorial Group", pt: "Grupo Equatorial" },
    duration: { en: "Sep 2025 - Present", pt: "Set 2025 - Atual" },
    icon: "https://yt3.googleusercontent.com/_H1fJ2hgKNB8KUTArMq_Ua4P3K8nNwYYn3UowA4GIdY-dTmpBvoO3IXJy1aR69Zhk1azf8CBIw=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 2,
    title: { en: "Implementation Analyst", pt: "Analista de Implatação" },
    company: { en: "PVT Software", pt: "PVT Software" },
    duration: { en: "Oct 2023 - Sep 2025", pt: "Out 2023 - Set 2025" },
    icon: "https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/pvt.jpg",
  },
  {
    id: 3,
    title: { en: "Full Stack Developer", pt: "FullStack Developer" },
    company: { en: "UNDB - Dom Bosco University", pt: "UNDB - Universidade Dom Bosco" },
    duration: { en: "Nov 2022 - Sep 2023", pt: "Nov 2022 - Set 2023" },
    icon: "https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/undb.jpg",
  },
  {
    id: 4,
    title: { en: "Full Stack Developer", pt: "FullStack Developer" },
    company: { en: "Controller Education", pt: "Controller Education" },
    duration: { en: "Oct 2021 - Aug 2022", pt: "Out 2021 - Ago 2022" },
    icon: "https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/controller.jpg",
  },
  {
    id: 5,
    title: { en: "Full Stack Developer", pt: "FullStack Developer" },
    company: { en: "UNDB - Dom Bosco University", pt: "UNDB - Universidade Dom Bosco" },
    duration: { en: "Dec 2020 - Aug 2021", pt: "Dez 2020 - Ago 2021" },
    icon: "https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/undb.jpg",
  },
]);

const Experience = computed(() => {
  const current = String(locale.value || 'en');
  return ExperienceSource.value.map((item) => ({
    ...item,
    title: item.title?.[current] ?? item.title?.en ?? '',
    company: item.company?.[current] ?? item.company?.en ?? '',
    duration: item.duration?.[current] ?? item.duration?.en ?? '',
  }));
});
</script>
