<template>
  <v-card class="mb-5">
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-text>
      <div>{{ post.content }}</div>
      <div class="mt-3">
        <v-icon @click="like">mdi-star</v-icon> {{ post.likes }}
        <v-btn text @click="showCommentBox = !showCommentBox">Comentar</v-btn>
      </div>
      <v-expand-transition>
        <v-textarea
          v-if="showCommentBox"
          v-model="newComment"
          label="Adicione um comentário"
          auto-grow
        ></v-textarea>
      </v-expand-transition>
    </v-card-text>
    <v-card-actions v-if="showCommentBox">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addComment">Enviar</v-btn>
    </v-card-actions>
    <v-list v-if="post.comments.length">
      <v-list-item
        v-for="(comment, index) in post.comments"
        :key="index"
        class="comment"
      >
        <v-list-item-content>{{ comment }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const showCommentBox = ref(false);
    const newComment = ref("");

    const like = () => {
      emit("like");
    };

    const addComment = () => {
      if (newComment.value.trim()) {
        emit("comment", newComment.value);
        newComment.value = "";
        showCommentBox.value = false;
      }
    };

    return { showCommentBox, newComment, like, addComment };
  },
});
</script>

<style scoped>
.mdi-star {
  cursor: pointer;
  color: gold;
}
.comment {
  padding-left: 16px;
}
</style>
