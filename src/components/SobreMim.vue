<template>
  <v-container class="d-flex justify-center">
    <v-row class="align-center">
      <v-col cols="12" md="8">
        <p class="text-justify">
          Meu nome é Emanuel Angelo e sou formado em Sistemas de Informação
          desde 2020.1. Desde então, tenho buscado constantemente adquirir novos
          conhecimentos e habilidades para me destacar no mercado de trabalho.
          Atualmente, estou estudando Java e Kotlin pela plataforma Alura, que
          oferece cursos de alta qualidade e me permite desenvolver minhas
          habilidades de programação.
          <br /><br />
          Além disso, tenho diversos certificados da Alura, como JavaScript para
          Front-End, Python, SQL e Django, que comprovam minhas habilidades
          nessas tecnologias. Estou sempre em busca de me aprimorar, aprender
          novas tecnologias e aperfeiçoar minhas habilidades existentes.
          <br /><br />
          Acredito que a aprendizagem contínua é fundamental para o sucesso na
          área de tecnologia, e estou sempre procurando novas oportunidades de
          desenvolvimento pessoal e profissional. Estou animado com as
          possibilidades que o futuro me reserva, e mal posso esperar para ver
          onde meus conhecimentos e habilidades me levarão.
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <img
          src="https://images.pexels.com/photos/15175074/pexels-photo-15175074.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Emanuel Angelo"
          class="profile-image"
        />
      </v-col>

      <v-divider></v-divider>

      <v-row justify="center" class="mb-4">
        <v-col cols="12">
          <h2 class="text-center">Experiências</h2>
        </v-col>
        <Empregos />
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Empregos from "./Empregos.vue";

export default {
  name: "SobreMim",
  components: { Empregos },
};
</script>

<style scoped>
.profile-image {
  width: 100%;
  /* max-width: 200px; */
  height: auto;
}

p {
  text-align: justify;
}
</style>
