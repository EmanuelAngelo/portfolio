<template>
    <div class="w-full">
    <h2 class="text-4xl font-bold mb-4 text-center" data-aos="fade-left">Formação</h2>
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
import { ref } from 'vue';
const Education = ref([
    {
        id:1,
        degree:'Especialização em Ciencias de Dados e Estatística',
        school:'UEMA - Universidade Estadual do Maranhão',
        duration:'2025-2027',
        icon:'https://www.uema.br/wp-content/uploads/2023/02/logo-uema-site.png'
    },
    {
        id:2,
        degree:'CURSO DE APERFEIÇOAMENTO EM ANÁLISE DE DADOS',
        school:'UFMA - Universidade Federal do Maranhão',
        duration:'2024-2025',
        icon:'https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/ufma.jpg'
    },
    {
        id:3,
        degree:'Sistemas de Informação',
        school:'UNDB - Universidade Dom Bosco',
        duration:'2016-2020',
        icon:'https://raw.githubusercontent.com/EmanuelAngelo/portfolio/refs/heads/master/public/undb.jpg'
    },

])
</script>
