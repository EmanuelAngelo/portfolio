<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(post, index) in posts"
        :key="index"
        cols="12"
        md="6"
        lg="4"
      >
        <Post
          :post="post"
          @like="likePost(index)"
          @comment="addComment(index, $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Post from "./Post.vue";

export default defineComponent({
  components: { Post },
  setup() {
    const posts = ref([
      {
        title: "Estudar sempre",
        content:
          "Estudar é manter a constância no aprendizado, tornando-o claro e promissor.",
        likes: 0,
        comments: [],
      },
      // Adicione mais posts conforme necessário
    ]);

    const likePost = (index: number) => {
      posts.value[index].likes++;
    };

    const addComment = (index: number, comment: string) => {
      posts.value[index].comments.push(comment);
    };

    return { posts, likePost, addComment };
  },
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
