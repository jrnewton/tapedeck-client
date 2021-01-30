<template>
  <div id="tapedeck-auth">
    <form id="capture-form" @submit.prevent="signup">
      <div class="form-group">
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
            >Enter your email address</small
          >
        </div>
        <div class="my-3">
          <input
            type="text"
            class="form-control form-control-lg"
            id="usernameInput"
            aria-describedby="usernameHelp"
            placeholder="Enter a username"
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
            placeholder="Enter a password"
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
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

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
    console.log('window is', window);

    //taken from backend repo
    const config = {
      aws_project_region: 'us-east-2',
      aws_cloud_logic_custom: [
        {
          name: 'cyamplify',
          endpoint:
            'https://vji807f5ii.execute-api.us-east-2.amazonaws.com/dev',
          region: 'us-east-2'
        }
      ],
      aws_cognito_identity_pool_id:
        'us-east-2:4952947d-42ba-400f-8545-b78e7f276f62',
      aws_cognito_region: 'us-east-2',
      aws_user_pools_id: 'us-east-2_14c19uAzj',
      aws_user_pools_web_client_id: '2ivr8cadk0qskhims7905cfect',
      oauth: {}
    };

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
