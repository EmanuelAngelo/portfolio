<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row class="contact-form" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="custom-card">
          <!-- <v-card-title class="headline">Entre em Contato</v-card-title> -->
          <v-card-text class="card-content">
            <!-- Botões de rede social -->
            <v-row justify="center" class="mb-4">
              <v-btn icon class="mx-1" @click="openLink('https://www.linkedin.com/in/emanuelangelo/')">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
              <v-btn icon class="mx-1" @click="openLink('https://wa.me/+5598985573745')">
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
              <v-btn icon class="mx-1" @click="openLink('https://www.youtube.com/channel/UCZEtenbeanBKY9QyUEM6vEg')">
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
              <!-- Adicione outros botões conforme necessário -->
            </v-row>
            <v-form>
              <v-text-field label="Nome" v-model="name" required></v-text-field>
              <v-text-field label="Email" v-model="email" required type="email"></v-text-field>
              <v-textarea label="Enviar E-Mail" v-model="message" required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitForm">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const submitForm = () => {
      console.log({
        name: name.value,
        email: email.value,
        message: message.value,
      });
      // Aqui você pode adicionar a lógica para enviar o formulário
    };

    const openLink = (url: string) => {
      window.open(url, '_blank');
    };

    return {
      name,
      email,
      message,
      submitForm,
      openLink,
    };
  },
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.contact-form {
  max-width: 700px;
  width: 100%;
}

.custom-card {
  min-width: 300px;
  /* Ajuste a largura mínima do v-card */
  max-width: 100%;
  /* Faz com que o v-card ocupe até 100% da largura disponível */
  min-height: 600px;
  /* Ajuste a altura mínima do v-card */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-content {
  flex-grow: 1;
}

.mx-1 {
  margin-left: 5px;
  margin-right: 5px;
}

@media (max-width: 600px) {
  .custom-card {
    min-width: 100%;
    /* Faz o v-card ocupar toda a largura disponível em telas pequenas */
    min-height: auto;
    /* Ajusta a altura conforme o conteúdo em telas pequenas */
  }
}
</style>
