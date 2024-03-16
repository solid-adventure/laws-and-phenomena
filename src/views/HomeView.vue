<script>
import Post from '../components/Post.vue'
import PostManager from '../PostManager.js'

export default {

  components: {
    Post
  },

  computed: {
    latest() {
      return PostManager.latest
    }
  },

}



</script>

<template>
  <main>
    <Post v-if="latest"
      :title="latest.title"
      :description="latest.description"
      :reference_link="latest.reference_link"
    />
    <span v-if="!latest">
      No posts available
    </span>
  </main>
</template>
