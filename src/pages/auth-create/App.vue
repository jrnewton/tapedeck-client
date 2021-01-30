<template>
  <div id="tapedeck-auth" class="jumbotron m-0 m-sm-3 m-lg-5">
    <h3 class="display-3">Create a new account</h3>
    <form id="capture-form" @submit.prevent="signup">
      <div class="form-group">
        <div class="my-3">
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
        <div class="my-3">
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
        <div class="my-3">
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
          class="btn btn-primary btn-lg my-3"
          href="#"
          role="button"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config from '../../awsconfig';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      code: '',
      currentUser: null
    };
  },
  mounted() {
    Amplify.configure(config);
  },
  methods: {
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
        window.location.href = '/auth-confirm.html';
        console.log('redirected to auth confirm page');
      } catch (error) {
        console.log('signUp error', error);
      }
    }
  }
};
</script>

<style>
@import '../../assets/sketchy.min.css';
</style>
