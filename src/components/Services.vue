<template>
  <section id="services" class="text-white mt-20">
    <h2
      class="text-4xl font-bold text-black mb-4 text-center"
      data-aos="fade-up"
    >
      {{ $t('services.title') }}
    </h2>
    <div
      class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
    >
      <div
        class="px-[12px] mb-[24px]"
        data-aos="fade-up"
        v-for="element in displayedServices"
        :key="element.id"
      >
        <div class="mt-[30px] relative flex flex-col justify-center text-center rounded-[30px] bg-white">
            <div class="mt-[-30px] flex justify-center relative">
            <div class="mt-[-7px] p-[20px] relative bg-[#fff] rounded-[50%]">
                <span class="h-[60px] w-[60px] m-auto border-[1px] border-solid border-[#111a24] absolute top-[8px] left-[8px]
                 rounded-[50%] inline-block z-[5]"></span>
                 <img :src="element.icon" alt="services" class="h-[35px] w-[35px] relative z-[1]"/>
            </div>
        </div>
            <div class="p-[30px]">
                <h3 class="uppercase font-semibold text-primary text-base">{{ element.name }}</h3>
                <p class="text-[14px] leading-[20px] text-gray-500 tracking-[0.03rem]">{{ element.description }}</p>
            </div>
        </div>
    </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const services = ref([
  {
    id: 1,
    icon: "https://img.icons8.com/ios-filled/100/google-code.png",
    name: "Web Development",
    description: {
      en: "I develop responsive and scalable web applications using best development practices.",
      es: "Desarrollo aplicaciones web responsivas y escalables utilizando las mejores prácticas de desarrollo.",
      pt: "Desenvolvo aplicações web responsivas e escaláveis, utilizando as melhores práticas de desenvolvimento.",
    },
  },
  {
    id: 2,
    icon: "https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png",
    name: "Technical Support",
    description: {
      en: "I provide specialized technical support, helping to solve problems and optimize system performance.",
      es: "Ofrezco soporte técnico especializado, ayudando a resolver problemas y optimizar el rendimiento de los sistemas.",
      pt: "Ofereço suporte técnico especializado, ajudando a resolver problemas e otimizar o desempenho de sistemas.",
    },
  },
  {
    id: 3,
    icon: "https://s3.amazonaws.com//beta-img.b2bstack.net/uploads/production/product/product_image/21301/thumb_totvs-rm.png",
    name: "Totvs RM",
    description: {
      en: "I implement and configure the Totvs RM system, ensuring seamless integration with business processes.",
      es: "Implemento y configuro el sistema Totvs RM, garantizando una integración fluida con los procesos de negocio.",
      pt: "Implanto e configuro o sistema Totvs RM, garantindo uma integração perfeita com os processos de negócios.",
    },
  },
]);

const displayedServices = computed(() => {
  const current = String(locale.value || 'en');
  return services.value.map((service) => ({
    ...service,
    description: service.description?.[current] ?? service.description?.en ?? '',
  }));
});
</script>
