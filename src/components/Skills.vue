<template>
    <section>
        <div class="w-full bg-white border-y-4 border-primary2 flex flex-wrap justify-center p-4 gap-8">
            <div
                data-aos="zoom-in-up"
                v-for="element in skills"
                :key="element.id"
                class="flex flex-col items-center"
            >
                <figure class="w-16 h-16 flex justify-center items-center rounded-full bg-gray-100">
                    <img :src="element.icon" :alt="element.name" class="w-10 h-10" />
                </figure>
                <span class="mt-2 text-sm text-gray-700 font-medium">{{ element.name }}</span>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';

const skills = ref([
  { id: 1, name: 'React', icon: 'https://img.icons8.com/plasticine/100/087ea4/react.png' },
  { id: 2, name: 'Vue.js', icon: 'https://img.icons8.com/fluency/48/vuejs.png' },
  { id: 3, name: 'HTML5', icon: 'https://img.icons8.com/fluency/48/html-5.png' },
  { id: 4, name: 'JavaScript', icon: 'https://img.icons8.com/color/48/javascript--v1.png' },
  { id: 5, name: 'Django', icon: 'https://img.icons8.com/color/48/django.png' },
  { id: 6, name: 'Python', icon: 'https://img.icons8.com/color/48/python.png' },
  { id: 7, name: 'SQL', icon: 'https://img.icons8.com/color/48/sql.png' },
  { id: 8, name: 'Totvs RM', icon: 'https://s3.amazonaws.com//beta-img.b2bstack.net/uploads/production/product/product_image/21301/thumb_totvs-rm.png' },
]);
</script>
