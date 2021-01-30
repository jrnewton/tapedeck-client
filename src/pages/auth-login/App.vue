<template>
  <div id="tapedeck-auth" class="jumbotron m-0 m-sm-3 m-lg-5">
    <h1 class="display-3">Login</h1>
    <form id="capture-form" @submit.prevent="signin">
      <div class="form-group">
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
            >Enter your username</small
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
            >Enter your password</small
          >
        </div>
        <button
          name="loginButton"
          class="btn btn-primary btn-lg my-3"
          href="#"
          role="button"
          type="submit"
        >
          Login
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
      currentUser: null
    };
  },
  mounted() {
    Amplify.configure(config);
  },
  methods: {
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
        window.location.href = '/';
        console.log('redirected to auth confirm page');
      } catch (error) {
        console.log('signin error', error);
      }
    }
  }
};
</script>

<style>
@import '../../assets/sketchy.min.css';
</style>
