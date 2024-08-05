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
          <v-list-item-subtitle style="font-size: 10px">
            emanuelangelo@outlook.com.br
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          prepend-icon="mdi-account-arrow-right"
          title="Sobre"
          @click="$router.push('/sobre')"
        ></v-list-item>
        <!-- <v-list-item
          prepend-icon="mdi-fingerprint"
          title="Minhas Skill"
          @click="$router.push('/skills')"
        ></v-list-item> -->
        <v-list-item
          prepend-icon="mdi-github"
          title="Meus Projetos"
          @click="$router.push('/projetos')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-email-multiple"
          title="Contate-Me"
          @click="$router.push('/contato')"
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
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const drawer = ref(false);

    const viewTitles = {
      "/sobre": "Sobre",
      "/skills": "Skill",
      "/projetos": "Projetos",
      "/contato": "Contato",
    };

    const currentViewTitle = computed(() => {
      return viewTitles[window.location.pathname] || "Menu";
    });

    return {
      drawer,
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
