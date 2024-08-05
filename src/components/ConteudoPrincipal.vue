<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      :width="270"
      class="pt-2 image-bg"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://avatars.githubusercontent.com/u/23459929?v=4s"
          title="Emanuel Angelo"
        >
          <v-list-item-subtitle style="font-size: 10px"
            >emanuelangelo@outlook.com.br</v-list-item-subtitle
          >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          prepend-icon="mdi-account-arrow-right"
          title="Sobre"
          value="sobre"
          @click="setView('sobre')"
        ></v-list-item>
        <!-- <v-list-item prepend-icon="mdi-fingerprint" title="Minhas Skill" value="skills"
          @click="setView('skills')"></v-list-item> -->
        <v-list-item
          prepend-icon="mdi-github"
          title="Meus Projetos"
          value="projetos"
          @click="setView('projetos')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-email-multiple"
          title="Contate-Me"
          value="contate"
          @click="setView('contate')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark class="custom-app-bar">
      <v-spacer></v-spacer>
      <v-list-item
        @click="drawer = !drawer"
        prepend-icon="mdi-menu-open"
        :title="currentViewTitle"
      ></v-list-item>
    </v-app-bar>

    <v-main class="fundo-back-mmain">
      <SobreMim v-if="currentView === 'sobre'" />
      <MinhasSkill v-if="currentView === 'skills'" />
      <MeusProjetos v-if="currentView === 'projetos'" />
      <Contato v-if="currentView === 'contate'" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Contato from "./Contato.vue";
import SobreMim from "./SobreMim.vue";
import MinhasSkill from "./MinhasSkill.vue";
import MeusProjetos from "./MeusProjetos.vue";

export default defineComponent({
  components: {
    SobreMim,
    Contato,
    MeusProjetos,
    MinhasSkill,
  },
  setup() {
    const drawer = ref(false);
    const currentView = ref("sobre"); // estado inicial

    const setView = (view) => {
      currentView.value = view;
    };

    const viewTitles = {
      sobre: "Sobre",
      skills: "Skill",
      projetos: "Projetos",
      contate: "Contato",
    };

    const currentViewTitle = computed(() => {
      return viewTitles[currentView.value] || "Menu";
    });

    return {
      drawer,
      currentView,
      setView,
      currentViewTitle,
    };
  },
});
</script>

<style scoped>
.image-bg {
  background-color: #364349;
  background-size: cover;
}

.custom-app-bar {
  background-color: #364349 !important;
  background-size: cover;
}

.fundo-back-mmain {
  background-color: #1b3e4e;
  background-size: cover;
}

.custom-background {
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCPoI32DR8hfuCZ5jw8lEmZWTUPVInMuWpWw&usqp=CAU);
  background-size: cover;
}
</style>
