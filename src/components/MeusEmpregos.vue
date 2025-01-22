<template>
  <div>
    <v-row class="my-4">
      <v-col
        v-for="(experience, index) in experiences"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" max-width="344">
          <v-card-text>
            <div>{{ experience.jobTitle }}</div>
            <p class="text-h7 font-weight-black">{{ experience.company }}</p>
            <p>{{ experience.location }}</p>
            <div class="text-medium-emphasis">
              {{ experience.date }}<br />
              {{ experience.address }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="teal-accent-4"
              variant="text"
              @click="toggleDescription(index)"
            >
              {{
                experience.showDescription ? "Fechar Descrição" : "Descrição"
              }}
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <v-card
              v-if="experience.showDescription"
              class="position-absolute w-100"
              style="bottom: 0"
            >
              <v-card-text class="pb-0">
                <p class="text-h5">Stacks</p>
                <ul>
                  <li v-for="(stack, i) in experience.stacks" :key="i">
                    {{ stack }}
                  </li>
                </ul>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                  color="teal-accent-4"
                  variant="text"
                  @click="toggleDescription(index)"
                >
                  Fechar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const experiences = ref([
      {
        jobTitle: "Analista de implantação",
        company: "PVT SOFTWARE E SERVIÇOS",
        location: "Home Office",
        date: "Out de 2023 - atual",
        address: "Vila Velha, Espírito Santo, Brasil · Remota",
        stacks: [
          "Totvs Rm",
          "SQL / PgSQL",
          "JavaScript",
          "ABAX / Gesplan / Admin",
        ],
        showDescription: false,
      },
      {
        jobTitle: "Desenvolvedor full stack",
        company: "UNDB",
        location: "Presencial",
        date: "Nov de 2022 - set de 2023",
        address: "São Luís, Maranhão, Brasil · Presencial",
        stacks: ["Totvs Rm", "SQL", "JavaScript / Python", "Vuejs / Django"],
        showDescription: false,
      },
      {
        jobTitle: "Desenvolvedor full stack",
        company: "Controller Education",
        location: "Home Office",
        date: "Nout de 2021 - ago de 2022",
        address: "Joinville, Santa Catarina, Brasil · Remota",
        stacks: ["PgSQL", "TypeScript / Go Lang", "Reactjs"],
        showDescription: false,
      },
      {
        jobTitle: "Desenvolvedor full stack",
        company: "UNDB",
        location: "Presencial",
        date: "Dez de 2020 - Ago de 2021",
        address: "São Luís, Maranhão, Brasil · Híbrida",
        stacks: ["SQL", "JavaScript / Python", "Django", "Vuejs"],
        showDescription: false,
      },
      {
        jobTitle: "Tecnico de Informatica",
        company: "HOSPITAL UNIVERSITARIO DUTRA",
        location: "Presencial",
        date: "Jan de 2017 - Out de 2019",
        address: "São Luís, Maranhão, Brasil · Presencial",
        stacks: ["HelpDesk", "Suporte ao usuario", "Linux", "Ad"],
        showDescription: false,
      },
      {
        jobTitle: "Soldado de infantaria",
        company: "Exército Brasileiro",
        location: "Presencial",
        date: "Mar de 2011 - Mar de 2014 ",
        address: "São Luís, Maranhão, Brasil · Híbrida",
        stacks: ["Atirador de MAG72", "Caçador", "SGT"],
        showDescription: false,
      },
    ]);

    const toggleDescription = (index) => {
      experiences.value[index].showDescription =
        !experiences.value[index].showDescription;
    };

    return {
      experiences,
      toggleDescription,
    };
  },
};
</script>

<style scoped>
.fixed-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 600px) {
  .fixed-card {
    height: auto;
  }
}
</style>
