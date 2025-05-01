<template>
  <section id="contact">
    <h2
      class="text-4xl font-bold text-black mb-4 text-center"
      data-aos="fade-up"
    >
      Contate-me
    </h2>
    <div class="mx-auto relative rounded-lg py-6">
      <div class="grid lg:grid-cols-3 items-center">
        <div
          class="grid sm:grid-cols-2 gap-4 z-20 relative lg:left-16 max-lg:px-4"
        >
          <div
            v-for="element in data"
            :key="element.id"
            data-aos="fade-up"
            class="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white"
          >
            <img :src="element.icon" alt="data" height="30" width="30" />
            <h4 class="text-gray-800 text-base font-bold mt-0">
              {{ element.title }}
            </h4>
            <p class="text-sm text-gray-500">{{ element.info }}</p>
          </div>
        </div>
        <div
          class="lg:col-span-2 bg-primary rounded-lg sm:p-10 p-4 z-10 max-lg:-order-1 max-lg:mb-8"
          data-aos="fade-up"
        >
          <form>
            <div class="max-w-md mx-auto space-y-3">
              <input
                type="text"
                placeholder="Name"
                class="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                class="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              />
              <textarea
                placeholder="Messagem"
                rows="6"
                class="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
              ></textarea>
              <button
                class="px-6 md:px-7 py-3 rounded-full relative group w-full sm:w-max flex justify-center"
              >
                <span
                  class="absolute inset-0 rounded-3xl group-hover:scale-105 origin-center transition-all ease-in-out bg-white border-2 border-transparent"
                ></span>
                <span class="relative flex items-center justify-center">
                  Enviar mensagem</span
                >
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
const data = ref([
  {
    id: 1,
    icon: "https://img.icons8.com/ios/50/0ca7ff/place-marker--v1.png",
    title: "Localização",
    info: "São Luís, MA, Brasil",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/ios/50/0ca7ff/ringer-volume.png",
    title: "Fale comigo",
    info: "+55 98 9 88123003",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/ios/50/0ca7ff/envelope-dots.png",
    title: "Converse comigo",
    info: "emanuelangelo@outlook.com.br",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/ios/50/0ca7ff/whatsapp.png",
    title: "Whatsapp",
    info: "+55 98 9 88123003",
  },
]);
</script>
