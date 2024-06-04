<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-sheet class="mx-auto" elevation="8" max-width="800" max-height="80vh">
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows @update:model="updateModel">
        <v-slide-group-item v-for="item in items" :key="item.name">
          <v-card class="ma-4" :class="{ 'full-width-card': isMobile }" height="100%" @click="item.action">
            <v-img :src="item.image" class="white--text d-flex fill-height align-center justify-center" contain>
              <div class="overlay">
                <span>{{ item.name }}</span>
              </div>
            </v-img>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">Entre em Contato</v-card-title>
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
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  setup() {
    const model = ref<number | null>(null);
    const dialog = ref(false);
    const formData = ref({
      name: '',
      email: '',
      message: '',
    });

    const isMobile = ref(window.innerWidth < 600);

    const items = [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/emanuelangelo/',
        image: 'https://i0.wp.com/softwareengineeringdaily.com/wp-content/uploads/2020/02/LinkedIn.jpg?fit=2048%2C1024&ssl=1',
        action: () => redirectTo('https://www.linkedin.com/in/emanuelangelo/'),
      },
      {
        name: 'WhatsApp',
        link: 'https://wa.me/+5598985573745',
        image: 'link_to_whatsapp_image',
        action: () => redirectTo('https://wa.me/+5598985573745'),
      },
      {
        name: 'YouTube',
        link: 'https://www.youtube.com/channel/UCZEtenbeanBKY9QyUEM6vEg',
        image: 'link_to_youtube_image',
        action: () => redirectTo('https://www.youtube.com/channel/UCZEtenbeanBKY9QyUEM6vEg'),
      },
      {
        name: 'Contato',
        link: '',
        image: 'link_to_contact_image',
        action: () => (dialog.value = true),
      },
      // Adicione mais itens conforme necessário
    ];

    const redirectTo = (url: string) => {
      window.open(url, '_blank');
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

    const updateModel = () => {
      isMobile.value = window.innerWidth < 600;
    };

    onMounted(() => {
      window.addEventListener('resize', updateModel);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateModel);
    });

    return {
      model,
      dialog,
      formData,
      items,
      redirectTo,
      submitForm,
      isMobile,
    };
  },
});
</script>

<style scoped>
.v-card {
  cursor: pointer;
}

.v-img {
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  /* Fundo escuro */
  color: white;
  text-align: center;
  padding: 10px;
}

.full-width-card {
  width: 100% !important;
  height: 100%;
}
</style>
