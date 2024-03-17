<script>
import Post from '../components/Post.vue'
import PostManager from '../PostManager.js'

export default {

  components: {
    Post
  },

  computed: {

  },

  data() {
    return {
      confirmed: false,
      submitted: false,
      title: "",
      description: "",
      reference_link: "",
      errors: {
        title: "",
        description: "",
        reference_link: ""
      }
    }
  },

  methods: {

    validate() {
      let valid = true

      for (let field of Object.keys(this.errors)) {
        this.errors[field] = ''
        if (this[field] === "") {
          this.errors[field] = "Must not be blank"
          valid = false
        }
      }
      return valid
    },

    handlePreview() {
      if (this.validate()) {
        this.confirmed = true
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const postForm = event.target;
      const formData = new FormData(postForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(() => this.submitted = true)
      .catch((error) => alert(error));
    }

  }

}



</script>

<template>
  <main>
    <div v-if="submitted">
      Succesfully submitted {{ title }}
    </div>
    <div v-else class="post-flyout">
      <form
        name="posts"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        v-on:submit.prevent="handleSubmit" >
        <input type="hidden" name="form-name" value="posts" />
        <!-- Form fields -->
        <span :class="{hidden: confirmed}">
          <h2>New Post</h2>
          <p>
            <label>Name <span class="error">{{ errors.title }} </span><br /><input type="text" v-model="title" placeholder="Sophomore Over Confidence" /></label>
          </p>
          <p>
            <label>Description <span class="error">{{errors.description }} </span><br /><textarea type="text" v-model="description" placeholder="That thing where having done prepared for something and having it gone well, you attempt it again without preparing and it goes poorly." /></label>
          </p>
          <p>
            <label>Reference <span class="error">{{errors.reference_link}} </span><br /><input type="text" v-model="reference_link" placeholder="https://www.example.com" /></label>
          </p>
        </span>

        <!-- Buttons -->
        <p v-if="confirmed" class="publish-nav">
          <button href="#" @click.prevent="confirmed=false">Back</button>

          <button type="submit">Publish</button>
        </p>
        <p v-else>
          <button href="#" @click.prevent="handlePreview">Preview</button>
        </p>

    </form>

    </div>

    <Post v-if="confirmed"
      :title="title"
      :description="description"
      :reference_link="reference_link"
    />
  </main>

</template>


<style scoped>
  div.post-flyout {
    position: absolute;
    padding: 2em;
    left: 0;
    width: 100%;
    background: rgb(59 59 59 / 0.3);
    z-index: 2;

    label {
      margin-top: 0.5em;
      display: inline-block;
      width: 100%;
    }

    button {
      margin-top: 2em;
      display: block;
      padding: 1em;
      border-radius: 3px;
      border: 0;
      font-weight: bold;
      background: rgb(38 124 159);
      color: rgb(211 220 227);
    }

    input[type="text"], textarea {
      width: 100%;
      padding: 0.4em;
      border-radius: 3px;
      border: 0;
      font-family: sans-serif;
    }


    textarea {
      height: 15vh;
    }

  }

  .hidden {
    display: none;
  }

  .error {
    color: red;
  }

  p.publish-nav {
    display: flex;
    justify-content: space-around;

    button {
      margin-top: 0;
    }
  }


</style>
