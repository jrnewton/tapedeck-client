<template>
  <div id="tapedeck-auth-confirm" class="jumbotron m-0 m-sm-3 m-lg-5">
    <h3 class="display-3">Confirm your account</h3>
    <form id="capture-form" @submit.prevent="confirm">
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
      code: ''
    };
  },
  mounted() {
    Amplify.configure(config);
  },
  methods: {
    async confirm() {
      console.log('confirm called');
      try {
        const result = await Auth.confirmSignUp(this.username, this.code);
        console.log('confirm result', result);
        window.location.href = '/';
      } catch (error) {
        console.log('confirm error', error);
      }

      console.log('confirm returning');
    }
  }
};
</script>

<style>
@import '../../assets/sketchy.min.css';
</style>
