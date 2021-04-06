<template>
  <section id="auth">
    <h1>auth required</h1>
    {{ authFlow }}

    <!-- <form
      id="login-form"
      @submit.prevent="login"
      v-if="authFlow === 'login'"
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

        <a href="#" name="signupLink" @click="authFlow = 'signup'"
          >Create Account
        </a>
      </div>
    </form>

    <form
      id="signup-form"
      @submit.prevent="signup"
      v-if="authFlow === 'signup'"
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
      v-if="authFlow === 'confirm'"
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
     -->
  </section>
</template>

<script>
import config from './awsconfig.js';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import store from '../store.js';
import { mapGetters } from 'vuex';

const populateSession = (cognitoUser) => {
  const sessionData = {};
  store.dispatch('sessionData', sessionData);

  sessionData.user = cognitoUser;
  sessionData.username = cognitoUser.username;
  sessionData.email = cognitoUser.attributes['email'];
  const cogSession = cognitoUser.getSignInUserSession();
  sessionData.accessToken = cogSession.getAccessToken().getJwtToken();
  sessionData.idToken = cogSession.getIdToken().getJwtToken();

  store.dispatch('sessionData', sessionData);
  console.log('sessionData', this.sessionData);
};

export default {
  mounted() {
    Amplify.configure(config);
    console.log('Amplify configured');
  },
  data() {
    return {
      formEmail: '',
      formPassword: '',
      formConfirmationCode: null
    };
  },
  computed: {
    ...mapGetters(['authFlow'])
  },
  methods: {
    // beforeRouteEnter(to, from, next) {
    //   if (!store.getters.authenticated) {
    //   }
    // },
    async login() {
      console.log('login called');

      try {
        const user = await Auth.signIn(this.formEmail, this.formPassword);
        console.log('login result', user);
        populateSession(user);
        store.dispatch('authFlow', 'complete');
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
        store.dispatch('authFlow', 'confirm');
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
        store.dispatch('authFlow', 'complete');
        console.log('confirm done');
      } catch (error) {
        console.log('confirm error', error);
      }
    }
  }
};
</script>
