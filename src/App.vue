<template>
  <!-- -->
  <main class="jumbotron m-0 m-sm-3 m-lg-5 py-1">
    <header class="row">
      <div class="col-12 col-lg-8">
        <a href="/" style="text-decoration: none">
          <h1 class="display-3">
            <span class="d-none d-sm-inline">Welcome to</span> Tape Deck
          </h1>
        </a>
        <p class="lead">Record radio streams to the cloud</p>
      </div>
    </header>
    <section id="auth" v-if="overlayEnabled">
      <form
        id="login-form"
        @submit.prevent="login"
        v-if="overlayContent === 'login'"
      >
        <div class="form-group">
          <div class="my-2">
            <input
              type="email"
              class="form-control form-control-lg"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="formEmail"
            />
            <small id="emailHelp" class="form-text text-muted"
              >Enter your email address</small
            >
          </div>
          <div class="my-2">
            <input
              type="password"
              class="form-control form-control-lg"
              id="passwordInput"
              aria-describedby="passwordHelp"
              placeholder="Password"
              v-model="formPassword"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Enter your password</small
            >
          </div>

          <button
            name="loginButton"
            class="btn btn-primary btn-lg my-2"
            role="button"
            type="submit"
          >
            Login
          </button>

          <button
            name="cancelButton"
            class="btn btn-primary btn-lg my-2 mx-2"
            role="button"
            @click="overlayClose"
          >
            Cancel
          </button>

          <a href="#" name="signupLink" @click="overlayContent = 'signup'"
            >Create Account
          </a>
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
              v-model="formEmail"
            />
            <small id="emailHelp" class="form-text text-muted"
              >Enter your email address</small
            >
          </div>
          <div class="my-2">
            <input
              type="password"
              class="form-control form-control-lg"
              id="passwordInput"
              aria-describedby="passwordHelp"
              placeholder="Password"
              v-model="formPassword"
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

          <button
            name="cancelButton"
            class="btn btn-primary btn-lg my-2 mx-2"
            role="button"
            @click="overlayClose"
          >
            Cancel
          </button>
        </div>
      </form>

      <form
        id="confirm-form"
        @submit.prevent="confirm"
        v-if="overlayContent === 'confirm'"
      >
        <input
          type="email"
          class="form-control form-control-lg"
          id="emailInput"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="formEmail"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Enter your email address</small
        >
        <input
          type="text"
          class="form-control form-control-lg"
          id="codeInput"
          aria-describedby="codeHelp"
          placeholder="Confirmation code"
          v-model="formConfirmationCode"
        />
        <small id="codeHelp" class="form-text text-muted"
          >Enter your confirmation code</small
        >
        <button
          name="confirmButton"
          class="btn btn-primary btn-lg my-2"
          role="button"
          type="submit"
        >
          Confirm
        </button>

        <button
          name="cancelButton"
          class="btn btn-primary btn-lg my-2 mx-2"
          role="button"
          @click="overlayClose"
        >
          Cancel
        </button>
      </form>
    </section>
    <section id="capture" v-else>
      <form id="capture-form" @submit.prevent="archive">
        <div class="form-group">
          <div class="my-2">
            <input
              type="text"
              class="form-control form-control-lg"
              :class="{ 'is-invalid': formValidationURLError }"
              id="captureURLInput"
              aria-describedby="captureURLHelp"
              placeholder="URL to archive"
              v-model="formURL"
            />
            <small id="captureURLHelp" class="form-text text-muted"
              >Enter the URL of an mp3 or m3u file.</small
            >
          </div>
          <div class="my-2">
            <input
              type="text"
              class="form-control form-control-lg"
              id="captureDescInput"
              aria-describedby="captureDescHelp"
              placeholder="Description"
              v-model="formDesc"
            />
            <small id="captureDescHelp" class="form-text text-muted"
              >Enter a short description.</small
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
          <a
            class="btn btn-outline-info btn-lg my-2 mx-3"
            data-cy="yourArchivesButton"
            href="#"
            role="button"
            @click="showArchives"
            >Your Archives</a
          >
        </div>
        <p>
          {{ progress }}
        </p>
      </form>
    </section>
    <section id="archives" v-if="archivesEnabled">
      <p class="lead">Recent recordings for {{ sessionData.email }}</p>

      <div
        class="card border-light mb-3"
        style="max-width: 20rem"
        v-for="item in recent"
        :key="item.id"
      >
        <div class="card-header">{{ item.desc }}</div>
        <div class="card-body">
          <!-- <p class="card-title">
            <a :href="item.url">{{ item.url }}</a>
          </p> -->
          <p class="card-text">
            <audio controls ref="audio" preload="meta">
              <source :src="item.url" type="audio/mpeg" />
              <p>
                Your browser does not support audio controls but you can
                <a :href="item.url">download the file</a>
                directly.
              </p>
            </audio>
          </p>
        </div>
      </div>
    </section>
    <footer class="mt-3">
      <!-- class="d-block d-sm-none" -->
      Version: {{ appVersion }} -
      <a href="https://github.com/jrnewton/tapedeck">About</a>
    </footer>
  </main>
</template>

<script>
//import axios from 'axios';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config, { apiEndpoint } from './awsconfig';

export default {
  data() {
    return {
      //app meta
      appVersion: process.env.VUE_APP_VERSION,
      //form data
      formURL: '',
      formDesc: '',
      formEmail: '',
      formPassword: '',
      formConfirmationCode: null,
      //validation and status
      progress: '',
      formValidationURLError: false,
      //login data
      authFlowNext: null,
      sessionData: null,
      //hidden UI sections
      overlayEnabled: false,
      overlayContent: null, //one of login, signup, confirm
      archivesEnabled: false,
      //dummy archive data
      recent: [
        {
          id: 1,
          desc: 'Test File',
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.mp3'
        }
      ]
    };
  },
  mounted() {
    Amplify.configure(config);
  },
  methods: {
    setupLogin(fn) {
      this.authFlowNext = fn;
      this.overlayEnabled = true;
      this.overlayContent = 'login';
    },
    overlayClose() {
      this.overlayEnabled = false;
      this.overlayContent = null;
    },
    populateSession(cognitoUser) {
      this.sessionData = {};
      this.sessionData.user = cognitoUser;
      this.sessionData.username = cognitoUser.username;
      this.sessionData.email = cognitoUser.attributes['email'];
      const cogSession = cognitoUser.getSignInUserSession();
      this.sessionData.accessToken = cogSession.getAccessToken().getJwtToken();
      this.sessionData.idToken = cogSession.getIdToken().getJwtToken();
      console.log('sessionData', this.sessionData);
    },
    showArchives() {
      if (this.sessionData === null) {
        this.setupLogin(this.showArchives);
        return;
      }

      this.archivesEnabled = true;
    },
    completeAuth() {
      this.overlayClose();

      if (this.authFlowNext) {
        this.authFlowNext();
      } else {
        console.log('authFlowNext not defined');
      }
    },
    async login() {
      console.log('login called');

      try {
        const user = await Auth.signIn(this.formEmail, this.formPassword);
        console.log('login result', user);
        this.populateSession(user);
        this.completeAuth();
        console.log('login done');
      } catch (error) {
        console.log('login error', error);
      }
    },
    async signup() {
      console.log('signup called');

      try {
        const params = {
          username: this.formEmail,
          password: this.formPassword
          // attributes: {
          //   email: this.email
          // }
        };
        const { user } = await Auth.signUp(params);
        console.log('signup result', user);
        //this.populateSession(user);
        this.overlayContent = 'confirm';
        console.log('redirected to auth confirm');
      } catch (error) {
        console.log('signup error', error);
      }
    },
    async confirm() {
      console.log('confirm called');
      try {
        const result = await Auth.confirmSignUp(
          this.formEmail,
          this.formConfirmationCode
        );
        console.log('confirm result', result);
        this.completeAuth();
        console.log('confirm done');
      } catch (error) {
        console.log('confirm error', error);
      }
    },
    async archive() {
      console.log('archive called');

      if (this.formURL === '') {
        this.formValidationURLError = true;
        return;
      }

      this.formValidationURLError = false;

      if (this.sessionData === null) {
        this.setupLogin(this.archive);
        return;
      }

      try {
        const url = `${apiEndpoint}/archive?accessToken=${this.sessionData.accessToken}`;
        this.progress = 'Sending request for ' + this.formURL;
        console.log('archive POST', url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            //prettier-ignore
            'Authorization': this.sessionData.idToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: this.formURL,
            desc: this.formDesc
          })
        });

        console.log('archive response', response);

        if (response.ok) {
          const json = await response.json();
          console.log('archive response msg', json);
          this.progress = json;

          this.archivesEnabled = false;
          this.formURL = '';
          console.log('archive done');
        } else {
          console.log('archive throwing error due to status');
          throw new Error(response.status + ': ' + response.statusText);
        }
      } catch (error) {
        console.log('archive error', error);
        this.progress = error;
      }
    }
  }
};
</script>

<style>
@import './assets/sketchy.min.css';
</style>
