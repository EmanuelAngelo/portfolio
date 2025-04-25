<template >
    <section>
        <div class="w-full bg-white border-b-5 border-y-4 border-primary2 flex flex-wrap justify-center p-2 gap-0
        lg:gap-24
        ">
    <div data-aos="zoom-in-up" v-for="element in skills" :key="element.id">
        <figure class="w-20 h-20 flex justify-center items-center rounded-full ml-2 mt-2">
            <img :src="element.icon" alt=" skill icon" class="w-10 h-12 absolute z-10">
        </figure>
    </div>
    </div>
    </section>
</template>
<script setup>
import {ref} from 'vue';
const skills = ref([
    {
        id:1,
        icon:'https://img.icons8.com/plasticine/100/087ea4/react.png'
    },
    {
        id:2,
        icon:'https://img.icons8.com/fluency/48/vuejs.png'
    },
    {
        id:3,
        icon:'https://img.icons8.com/fluency/48/html-5.png'
    },
    {
        id:4,
        icon:'https://img.icons8.com/color/48/javascript--v1.png'
    },
    {
        id:5,
        icon:'https://img.icons8.com/color/48/django.png'
    },
    {
        id:6,
        icon:'https://img.icons8.com/color/48/python.png'
    },
    {
        id:7,
        icon:'https://img.icons8.com/color/48/sql.png'
    },
    {
        id:8,
        icon:'https://s3.amazonaws.com//beta-img.b2bstack.net/uploads/production/product/product_image/21301/thumb_totvs-rm.png'
    },        
])
</script>
