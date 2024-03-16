<script setup>

defineProps({
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
  <div class="post">
    <h1 class="title">{{ description }}</h1>
    <a :href="reference_link" target="_blank" class="reference_link"> {{ title }} </a>
  </div>
</template>

<style scoped>

div.post {
/* 8vh is the header, 2rem is the #app padding */
  min-height: calc(100vh - 8vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

@media (min-width: 1024px) {
  div.post {
    max-width: 80vh;
  }
}



h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.post h1,
.post h3 {
  text-align: center;
}

a.reference_link {
  text-align: right;
}

@media (min-width: 1024px) {
  .post h1,
  .post h3 {
    text-align: left;
  }
}
</style>
