<template>
  <v-container class="d-flex justify-center">
    <v-row class="align-center">
      <v-col cols="12" md="8">
        <p class="text-justify">
          Graduado em Sistemas de Informação em 2020.1, desenvolvo
          constantemente novas habilidades e busco atualização em tecnologias
          para me destacar no mercado. Tenho sólida experiência em
          desenvolvimento de sistemas e frameworks modernos, além de
          conhecimentos avançados em Data Science, incluindo análise e
          visualização de dados, modelagem e ferramentas de BI. Atualmente,
          estou aprofundando meus estudos em Java e Kotlin através da plataforma
          Alura, conhecida por seus cursos de excelência, que têm potencializado
          minhas competências em programação e análise de dados.
          <br /><br />
          <code>
            Linguagens de Programação: ['JavaScript', 'Python'] <br />
            ERP e Sistemas: ['TOTVS RM','Service Now', 'Gesplan', 'Hyperion',
            Elaw', 'AccessOne']<br />
            Frameworks: ['Django', 'Vue.js'] <br />Bancos de Dados:
            ['SQL Server', 'PgSQL'] <br />Metodologias Ágeis: ['Kanban',
            'Scrum'] <br />Data Science: ['Python', 'SQL', 'B.I', 'ETL']
          </code>
          <br /><br />
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
        <MeusEmpregos />
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import MeusEmpregos from "./MeusEmpregos.vue";

export default {
  name: "SobreMim",
  components: { MeusEmpregos },
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