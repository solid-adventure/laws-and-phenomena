<script>
import PostPreview from '../components/PostPreview.vue'
import PostManager from '../PostManager.js'

export default {

  components: {
    PostPreview
  },

  computed: {
    posts() {
      return PostManager.sortByCreatedAt
    }
  },

}



</script>

<template>
  <main>
    <PostPreview v-for="post of posts"
      :id="post.id"
      :title="post.title"
      :description="post.description"
      :reference_link="post.reference_link"
    />
    <span v-if="!posts">
      No posts available
    </span>
  </main>
</template>

<style scoped>

main {
/* 8vh is the header, 2rem is the #app padding */
  min-height: calc(100vh - 8vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

</style>