<template>
  <main class="jumbotron m-0 m-sm-3 m-lg-5">
    <header class="row">
      <div class="col-12 col-lg-8">
        <h1 class="display-3">
          <span class="d-none d-sm-inline">Welcome to</span> Tape Deck
        </h1>
        <p class="lead">Record radio streams to the cloud</p>
      </div>
    </header>
    <section id="auth" v-if="showOverlay">
      <form
        id="login-form"
        @submit.prevent="signin"
        v-if="overlayContent === 'login'"
      >
        <div class="form-group">
          <div class="my-2">
            <input
              type="text"
              class="form-control form-control-lg"
              id="usernameInput"
              aria-describedby="usernameHelp"
              placeholder="Username"
              v-model="username"
            />
            <small id="usernameHelp" class="form-text text-muted"
              >Enter your username</small
            >
          </div>
          <div class="my-2">
            <input
              type="password"
              class="form-control form-control-lg"
              id="passwordInput"
              aria-describedby="passwordHelp"
              placeholder="Password"
              v-model="password"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Enter your password</small
            >
          </div>

          <button
            name="loginButton"
            class="btn btn-primary btn-lg my-2"
            href="#"
            role="button"
            type="submit"
          >
            Login
          </button>

          <a
            href="#"
            @click="overlayContent = 'signup'"
            class="my-2 mx-2"
            data-cy="createAccountButton"
            >Create an account</a
          >

          <a
            href="#"
            @click="overlayContent = 'confirm'"
            class="my-2 mx-2"
            data-cy="confirmAccountButton"
            >Enter code</a
          >
        </div>
      </form>

      <form
        id="signup-form"
        @submit.prevent="signup"
        v-if="overlayContent === 'signup'"
      >
        <div class="form-group">
          <div class="my-2">
            <input
              type="email"
              class="form-control form-control-lg"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >Enter your email address</small
            >
          </div>
          <div class="my-2">
            <input
              type="text"
              class="form-control form-control-lg"
              id="usernameInput"
              aria-describedby="usernameHelp"
              placeholder="Username"
              v-model="username"
            />
            <small id="usernameHelp" class="form-text text-muted"
              >Enter your desired username</small
            >
          </div>
          <div class="my-2">
            <input
              type="password"
              class="form-control form-control-lg"
              id="passwordInput"
              aria-describedby="passwordHelp"
              placeholder="Password"
              v-model="password"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Enter your desired password</small
            >
          </div>
          <button
            name="signupButton"
            class="btn btn-primary btn-lg my-2"
            href="#"
            role="button"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>

      <form
        id="confirm-form"
        @submit.prevent="confirm"
        v-if="overlayContent === 'confirm'"
      >
        <input
          type="text"
          class="form-control form-control-lg"
          id="usernameInput"
          aria-describedby="usernameHelp"
          placeholder="Username"
          v-model="username"
        />
        <small id="usernameHelp" class="form-text text-muted"
          >Enter your username</small
        >
        <input
          type="text"
          class="form-control form-control-lg"
          id="codeInput"
          aria-describedby="codeHelp"
          placeholder="Confirmation code"
          v-model="code"
        />
        <small id="codeHelp" class="form-text text-muted"
          >Enter your confirmation code</small
        >
        <button
          name="confirmButton"
          class="btn btn-primary btn-lg my-3"
          href="#"
          role="button"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </section>
    <section id="capture" v-else>
      <form id="capture-form" @submit.prevent="archiveSubmit">
        <div class="form-group">
          <div class="my-2">
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
            class="btn btn-primary btn-lg my-2"
            href="#"
            role="button"
            type="submit"
          >
            Archive Now
          </button>

          <span>{{ status }}</span>
        </div>
      </form>
    </section>
    <aside>
      <p class="lead">
        <a
          class="btn btn-outline-info btn-lg my-2"
          data-cy="yourArchivesButton"
          href="archives.html"
          role="button"
          >Your Archives</a
        >
      </p>
    </aside>
    <footer>
      <!-- class="d-block d-sm-none" -->
      <a href="https://github.com/jrnewton/tapedeck-client"
        >View the code on GitHub</a
      >
    </footer>
  </main>
</template>

<script>
//import axios from 'axios';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config from '../../awsconfig';

export default {
  data() {
    return {
      email: '',
      archiveURL: '',
      status: '',
      username: '',
      password: '',
      code: null,
      currentUser: null,
      showOverlay: false,
      overlayContent: null //one of login, signup, confirm
    };
  },
  mounted() {
    Amplify.configure(config);
  },
  methods: {
    overlayClose() {
      this.showOverlay = false;
      this.overlayContent = null;
    },
    async signin() {
      console.log('calling signin');

      try {
        const params = {
          username: this.username,
          password: this.password
        };
        const { user } = await Auth.signIn(params);
        console.log('signin result', user);
        this.currentUser = user;
        console.log('currentUser set to', this.currentUser);

        this.overlayClose();
        this.archiveSubmit();

        console.log('done');
      } catch (error) {
        console.log('signin error', error);
      }
    },
    async signup() {
      console.log('calling signup');

      try {
        const params = {
          username: this.username,
          password: this.password,
          attributes: {
            email: this.email
          }
        };
        const { user } = await Auth.signUp(params);
        console.log('signUp result', user);
        this.currentUser = user;
        console.log('currentUser set to', this.currentUser);

        this.overlayContent = 'confirm';

        console.log('redirected to auth confirm');
      } catch (error) {
        console.log('signUp error', error);
      }
    },
    async confirm() {
      console.log('confirm called');
      try {
        const result = await Auth.confirmSignUp(this.username, this.code);
        console.log('confirm result', result);

        this.overlayClose();
        this.archiveSubmit();
      } catch (error) {
        console.log('confirm error', error);
      }

      console.log('confirm returning');
    },
    async archiveSubmit() {
      if (this.archiveURL === '') {
        alert('Please enter a URL to archive');
        return;
      }

      if (this.currentUser === null) {
        this.overlayContent = 'login';
        this.showOverlay = true;
        return;
      }

      this.status = 'Downloading ' + this.archiveURL;
      setTimeout(() => {
        this.status = null;
      }, 3000);

      // try {
      //   //TODO: add real URL once auth is in place
      //   const res = await axios.get('https://www.google.com');
      //   console.log(JSON.stringify(res));
      // } catch (error) {
      //   console.log(error);
      // }

      this.archiveURL = '';
    }
  }
};
</script>

<style>
@import '../../assets/sketchy.min.css';

/* #overlayarea {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
} */

dialog {
  position: fixed;
  top: 40vh;
  left: 30%;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
