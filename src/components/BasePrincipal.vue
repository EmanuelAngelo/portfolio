<template>
  <v-card class="main-card">
    <!-- Barra de ferramentas -->
    <v-toolbar color="primary" title="Emanuel Angelo"></v-toolbar>

    <!-- Estrutura com abas laterais -->
    <div class="d-flex flex-row">
      <!-- Abas laterais -->
      <v-tabs v-model="tab" color="primary" direction="vertical" class="side-tabs">
        <v-tab prepend-icon="mdi-account" text="Sobre Mim" value="SobreMim"></v-tab>
        <v-tab prepend-icon="mdi-folder" text="Meus Projetos" value="MeusProjetos"></v-tab>
      </v-tabs>

      <!-- Conteúdo das abas -->
      <v-tabs-window v-model="tab" class="content-container">
        <v-tabs-window-item value="SobreMim">
          <SobreMim />
        </v-tabs-window-item>
        <v-tabs-window-item value="MeusProjetos">
          <MeusProjetos />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script>
import { ref } from "vue";
import SobreMim from "@/components/SobreMim.vue";
import MeusProjetos from "@/components/MeusProjetos.vue";

export default {
  components: {
    SobreMim,
    MeusProjetos,
  },
  setup() {
    const tab = ref("SobreMim"); // Aba inicial

    return {
      tab,
    };
  },
};
</script>

<style scoped>
/* Estilo principal */
.main-card {
  background-color: #1b3e4e;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Abas laterais */
.side-tabs {
  min-width: 200px;
  background-color: #243b4a;
}

/* Estilização do conteúdo */
.content-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  background: linear-gradient(to bottom, #1b3e4e, #243b4a);
}

/* Personalização do scrollbar */
.content-container::-webkit-scrollbar {
  width: 6px;
}

.content-container::-webkit-scrollbar-thumb {
  background: #5d7a8a;
  border-radius: 3px;
}

.content-container::-webkit-scrollbar-thumb:hover {
  background: #48606f;
}
</style>
