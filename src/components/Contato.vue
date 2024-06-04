<template>
  <div style="background-image: url(''); background-size: cover; height: 100vh">
    <!-- https://images6.alphacoders.com/134/thumb-1920-1346530.jpeg -->
    <v-container class="fill-height d-flex align-center justify-center">
      <v-carousel height="400" progress="primary" hide-delimiters>
        <v-carousel-item v-for="(item, index) in items" :key="index">
          <v-sheet height="100%">
            <v-img :src="item.src" class="fill-height fundo-back-mmain" cover></v-img>
            <v-card v-if="item.name !== 'E-mail'" class="overlay-card" @click="redirectTo(item.link)">
              <v-card-text>{{ item.name }}</v-card-text>
            </v-card>
            <v-card v-else class="overlay-card" @click="openContactModal">
              <v-card-text>{{ item.name }}</v-card-text>
            </v-card>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">Mande um E-mail</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Nome" v-model="formData.name" required></v-text-field>
              <v-text-field label="Email" v-model="formData.email" required type="email"></v-text-field>
              <v-textarea label="Mensagem" v-model="formData.message" required></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitForm">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dialog = ref(false);
    const formData = ref({
      name: '',
      email: '',
      message: '',
    });

    const items = [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/emanuelangelo/',
        src: '',
      },
      {
        name: 'WhatsApp',
        link: 'https://wa.me/+5598985573745',
        src: '',
      },
      {
        name: 'YouTube',
        link: 'https://www.youtube.com/channel/UCZEtenbeanBKY9QyUEM6vEg',
      },
      {
        name: 'E-mail',
        link: '',
      },
    ];

    const redirectTo = (url) => {
      window.open(url, '_blank');
    };

    const openContactModal = () => {
      dialog.value = true;
    };

    const submitForm = () => {
      console.log({
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
      });
      // Aqui você pode adicionar a lógica para enviar o formulário
      dialog.value = false; // Fecha o modal após o envio
    };

    return {
      dialog,
      formData,
      items,
      redirectTo,
      openContactModal,
      submitForm,
    };
  },
});
</script>

<style scoped>
.fundo-back-mmain {
  background-color: #1b3e4e;
  background-size: cover;
}

.overlay-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
}

.overlay-card:hover {
  background-color: rgba(255, 255, 255, 1);
}

.fill-height {
  width: 100%;
  height: 100%;
}
</style>
