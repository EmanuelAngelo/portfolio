<template>
  <v-card>
    <!-- Abas fixas no topo -->
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
      class="tabs-dynamic"
    >
      <v-tab value="SobreMim">Sobre Mim</v-tab>
      <v-tab value="MeusProjetos">Meus Projetos</v-tab>
      <!-- <v-tab value="MinhasFormacoes">Minhas Formações</v-tab> -->
    </v-tabs>

    <!-- Conteúdo com efeito de paralax -->
    <div class="content-container">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="SobreMim">
          <SobreMim />
        </v-tabs-window-item>
        <v-tabs-window-item value="MeusProjetos">
          <MeusProjetos />
        </v-tabs-window-item>
        <!-- <v-tabs-window-item value="MinhasFormacoes">
          <MinhasFormacoes />
        </v-tabs-window-item> -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script>
import SobreMim from "@/components/SobreMim.vue";
import MeusProjetos from "@/components/MeusProjetos.vue";
import MinhasFormacoes from "./MinhasFormacoes.vue";

export default {
  components: {
    SobreMim,
    MeusProjetos,
    MinhasFormacoes,
  },
  data() {
    return {
      tab: "SobreMim", // Aba inicial
    };
  },
};
</script>

<style scoped>
/* Estilização principal */
.v-card {
  background-color: #1b3e4e;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Abas fixas no topo (tamanho ajustado pelo texto) */
.tabs-dynamic {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #1b3e4e;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px 16px; /* Espaçamento interno para deixar mais confortável */
  display: flex;
  align-items: center;
}

/* Ajuste responsivo para mobile */
@media (max-width: 600px) {
  .tabs-dynamic {
    font-size: 0.9rem;
    padding: 14px 4px; /* Menor espaçamento em telas pequenas */
  }

  .v-tab {
    font-size: 0.8rem; /* Texto menor para abas no mobile */
  }
}

/* Container do conteúdo com rolagem */
.content-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  background: linear-gradient(to bottom, #1b3e4e, #243b4a);
}

/* Personalização para suavizar o efeito de scroll */
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
