<template>
  <section class="jumbotron m-0 m-sm-3 m-lg-5">
    <div class="row">
      <div class="col-12 col-lg-8">
        <h1 class="display-3">
          <span class="d-none d-sm-inline">Welcome to</span> Tape Deck
        </h1>
        <p class="lead">Record radio streams to the cloud</p>
      </div>

      <aside class="card col-12 col-lg-4 d-none d-sm-block">
        <div class="card-body">
          <h4 class="card-title">About</h4>
          <p class="card-text">
            I &#128151; <a href="https://wmbr.org/">college radio</a> and wrote
            this app to capture my favorite shows for later listening and
            archiving.
          </p>
          <a href="https://github.com/jrnewton/tapedeck" class="card-link"
            >View the code on GitHub</a
          >
        </div>
      </aside>
    </div>

    <hr class="my-4" />

    <div id="main">
      <form id="capture-form" @submit.prevent="archiveSubmit">
        <div class="form-group">
          <!-- 
            <div class="my-3">
              <input
                type="email"
                class="form-control form-control-lg"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Your email"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >Enter your email address.</small
              >
            </div>
            -->
          <div class="my-3">
            <input
              type="text"
              class="form-control form-control-lg"
              id="captureURLInput"
              aria-describedby="captureURLHelp"
              placeholder="URL to archive"
              v-model="archiveURL"
            />
            <small id="captureURLHelp" class="form-text text-muted"
              >Enter the URL of an mp3 or m3u file.</small
            >
          </div>
          <button
            name="captureURLButton"
            class="btn btn-primary btn-lg my-3"
            href="#"
            role="button"
            type="submit"
          >
            Archive Now
          </button>
        </div>
      </form>
      <p class="lead">
        <a
          class="btn btn-outline-info btn-lg my-3"
          data-cy="yourArchivesButton"
          href="archives.html"
          role="button"
          >Your Archives</a
        >
      </p>
      <p class="lead">
        <a
          class="btn btn-outline-info btn-lg my-3"
          data-cy="loginButton"
          href="auth-login.html"
          role="button"
          >Login</a
        >
        <a
          class="btn btn-outline-info btn-lg my-3"
          data-cy="createAccountButton"
          href="auth-create.html"
          role="button"
          >Create new account</a
        >
      </p>
    </div>
    <footer class="d-block d-sm-none">
      <a href="https://github.com/jrnewton/tapedeck">View the code on GitHub</a>
    </footer>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      archiveURL: '',
      status: ''
    };
  },
  methods: {
    async archiveSubmit() {
      if (this.archiveURL === '') {
        alert('Please enter a URL to archive');
        return;
      }

      try {
        //TODO: add real URL once auth is in place
        const res = await axios.get('lambda-url');
        console.log(JSON.stringify(res));
      } catch (error) {
        console.log(error);
      }
      this.archiveURL = '';
    }
  },
  computed: {}
};
</script>

<style>
@import '../../assets/sketchy.min.css';

/* the default styles setup by vue-cli */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
