<script setup>

defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reference_link: {
    type: String,
    required: true
  }


})

</script>

<template>
  <RouterLink :to="`/posts/${id}`" >
    <div class="post">
      <h1 class="title">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>

  div.post {
    margin-top: 3em;
  }

</style>
