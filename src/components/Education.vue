<template>
    <div class="w-full">
    <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-left">{{ $t('education.title') }}</h2>
    <div class="space-y-16 py-14">
        <div class="space-y-16 py-14">
            <div v-for="element in Education" :key="element.id" data-aos="fade-left" class="flex items-center rounded-xl
            bg-white/75
            ">
            <div class="w-1/4">
                <img :src="element.icon" :alt="element.title">
            </div>
            <div class="w-3/4 pl-4">
                <h3 class="uppercase font-semibold text-primary text-base">{{ element.degree }}</h3>
                <p class="text-gray-500">{{ element.school }}</p>
                <p class="text-gray-500">{{ element.duration }}</p>
            </div>
        </div>
        </div>
    </div>
</div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const EducationSource = ref([
    {
        id:1,
                degree: {
                    en: 'Specialization in Data Science and Statistics',
                    pt: 'Especialização em Ciencias de Dados e Estatística'
                },
                school: {
                    en: 'UEMA - State University of Maranhão',
                    pt: 'UEMA - Universidade Estadual do Maranhão'
                },
        duration:'2025-2027',
        icon:'https://www.uema.br/wp-content/uploads/2023/02/logo-uema-site.png'
    },
    {
        id:2,
                degree: {
                    en: 'Advanced Course in Data Analysis',
                    pt: 'CURSO DE APERFEIÇOAMENTO EM ANÁLISE DE DADOS'
                },
                school: {
                    en: 'UFMA - Federal University of Maranhão',
                    pt: 'UFMA - Universidade Federal do Maranhão'
                },
        duration:'2024-2025',
        icon:'https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/ufma.jpg'
    },
    {
        id:3,
                degree: {
                    en: 'Information Systems',
                    pt: 'Sistemas de Informação'
                },
                school: {
                    en: 'UNDB - Dom Bosco University',
                    pt: 'UNDB - Universidade Dom Bosco'
                },
        duration:'2016-2020',
        icon:'https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/undb.jpg'
    },

])

const Education = computed(() => {
    const current = String(locale.value || 'en');
    return EducationSource.value.map((item) => ({
        ...item,
        degree: item.degree?.[current] ?? item.degree?.en ?? '',
        school: item.school?.[current] ?? item.school?.en ?? '',
    }));
});
</script>
