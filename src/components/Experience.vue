<template>
    <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-right">Experiência</h2>
    <div class="space-y-16 py-14">
        <div class="space-y-16 py-14">
            <div v-for="element in Experience" :key="element.id" data-aos="fade-right" class="flex items-center rounded-xl
            bg-white/75
            ">
            <div class="w-1/4">
                <img :src="element.icon" :alt="element.title">
            </div>
            <div class="w-3/4 pl-4">
                <h3 class="uppercase font-semibold text-primary text-base">{{ element.title }}</h3>
                <p class="text-gray-500">{{ element.company }}</p>
                <p class="text-gray-500">{{ element.duration }}</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const Experience = ref([
    {
        id: 1,
        title: 'Analista de Implatação',
        company: 'PVT Software',
        duration: 'Out 2023 - Atual',
        icon: 'https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/controller.jpg'
    },
    {
        id: 2,
        title: 'FullStack Developer',
        company: 'UNDB - Universidade Dom Bosco',
        duration: 'Nov 2022 - Set 2023',
        icon: '/public/undb.jpg'
    },
    {
        id: 3,
        title: 'FullStack Developer',
        company: 'Controller Education',
        duration: 'Out 2021 - Ago 2022',
        icon: '/public/controller.jpg'
    },
    {
        id: 4,  // Corrigi o ID que estava repetido (era 2)
        title: 'FullStack Developer',
        company: 'UNDB - Universidade Dom Bosco',
        duration: 'Dez 2020 - Ago 2021',
        icon: '/public/undb.jpg'
    }
])
</script>