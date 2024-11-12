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
import { defineComponent, ref, onMounted } from "vue";
import Post from "./Post.vue";

export default defineComponent({
  components: { Post },
  setup() {
    const posts = ref([
      {
        id: 1,
        title: "Estudar sempre",
        content:
          "Estudar é manter a constância no aprendizado, tornando-o claro e promissor.",
        likes: 0,
        comments: [],
      },
      {
        id: 2,
        title: "Kotlin",
        content: "Estudar Kotlin é manter a pratica sempre em POO",
        likes: 0,
        comments: [],
      },
      // Adicione mais posts conforme necessário
    ]);

    const loadComments = () => {
      posts.value.forEach((post) => {
        const storedComments = localStorage.getItem(`comments_${post.id}`);
        if (storedComments) {
          post.comments = JSON.parse(storedComments);
        }
      });
    };

    const saveComments = (index: number) => {
      const post = posts.value[index];
      localStorage.setItem(
        `comments_${post.id}`,
        JSON.stringify(post.comments)
      );
    };

    const likePost = (index: number) => {
      posts.value[index].likes++;
    };

    const addComment = (index: number, comment: string) => {
      posts.value[index].comments.push(comment);
      saveComments(index);
    };

    onMounted(() => {
      loadComments();
    });

    return { posts, likePost, addComment };
  },
});
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}
</style>
