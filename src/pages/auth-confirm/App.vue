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

export default {
  data() {
    return {
      username: '',
      code: ''
    };
  },
  mounted() {
    console.log('mounted called');

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
    console.log('mounted returning');
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
