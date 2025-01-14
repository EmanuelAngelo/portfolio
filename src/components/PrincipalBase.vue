<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        class="image-bg"
      >
        <v-list-item
          prepend-avatar="https://avatars.githubusercontent.com/u/23459929?v=4"
          title="Emanuel Angelo"
          nav
        >
          <template #append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-arrow-right"
            title="Sobre"
            value="home"
            @click="setActiveComponent('SobreMim')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-github"
            title="Meus Projetos"
            value="projects"
            @click="setActiveComponent('MeusProjetos')"
          ></v-list-item>
          <!-- <v-list-item
            prepend-icon="mdi-email-multiple"
            title="Contate-Me"
            value="contact"
            @click="setActiveComponent('Contato')"
          ></v-list-item> -->
        </v-list>
      </v-navigation-drawer>

      <!-- Área principal onde os componentes são renderizados -->
      <v-main class="fundo-back-mmain" style="min-height: 100vh; flex-grow: 1">
        <component :is="activeComponent" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import SobreMim from "@/components/SobreMim.vue";
import MeusProjetos from "./MeusProjetos.vue";

export default {
  components: {
    SobreMim,
    MeusProjetos,
  },
  data() {
    return {
      drawer: true,
      rail: true,
      activeComponent: "SobreMim", // Componente padrão ao carregar
    };
  },
  methods: {
    setActiveComponent(componentName) {
      this.activeComponent = componentName;
    },
  },
};
</script>

<style scoped>
.image-bg {
  background-color: #364349;
  background-size: cover;
}

.fundo-back-mmain {
  background-color: #1b3e4e;
  background-size: cover;
}
</style>
