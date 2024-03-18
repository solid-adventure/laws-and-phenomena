<script>
import Post from '../components/Post.vue'
import PostManager from '../PostManager.js'

export default {

  components: {
    Post
  },

  computed: {
    latest() {
      return PostManager.last
    },

    post() {
      return  this.$route.params.id ? PostManager.find(this.$route.params.id) : this.latest
    }
  },

}



</script>

<template>
  <main>
    <Post v-if="post"
      :title="post.title"
      :description="post.description"
      :reference_link="post.reference_link"
    />
    <span v-if="!post">
      No posts available
    </span>
  </main>
</template>
