<template>
  <v-container class="d-flex justify-center">
    <v-row class="align-center">
      <v-col cols="12" md="8">
        <p class="text-justify">
          Meu nome é Emanuel Angelo e sou formado em Sistemas de Informação desde 2020.1. Desde então, tenho buscado
          constantemente adquirir novos conhecimentos e habilidades para me destacar no mercado de trabalho. Atualmente,
          estou
          estudando Java e Kotlin pela plataforma Alura, que oferece cursos de alta qualidade e me permite desenvolver
          minhas
          habilidades de programação.
          <br /><br />
          Além disso, tenho diversos certificados da Alura, como JavaScript para Front-End, Python, SQL e Django, que
          comprovam
          minhas habilidades nessas tecnologias. Estou sempre em busca de me aprimorar, aprender novas tecnologias e
          aperfeiçoar
          minhas habilidades existentes.
          <br /><br />
          Acredito que a aprendizagem contínua é fundamental para o sucesso na área de tecnologia, e estou sempre
          procurando
          novas oportunidades de desenvolvimento pessoal e profissional. Estou animado com as possibilidades que o
          futuro
          me
          reserva, e mal posso esperar para ver onde meus conhecimentos e habilidades me levarão.
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <img
          src="https://camo.githubusercontent.com/a200d3728eb0f3563b70504b613029940b4d57a3eed5ac437e8e44cabd6fef53/68747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31353137353037342f706578656c732d70686f746f2d31353137353037342e706e673f6175746f3d636f6d70726573732663733d74696e797372676226773d3132363026683d373530266470723d31"
          alt="Emanuel Angelo" class="profile-image">
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'SobreMim',
}
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
