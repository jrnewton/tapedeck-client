<template>
  <div id="tapedeck-auth">
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

export default {
  data() {
    return {
      username: '',
      password: '',
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
