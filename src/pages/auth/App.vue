<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator username-alias="email">
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{ email }}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components';

export default {
  name: 'AuthStateApp',
  created() {
    //authData is a cognitoUser object.
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
      this.email = authData.attributes['email'];
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      email: undefined
    };
  },
  beforeUnmount() {
    return onAuthUIStateChange;
  }
};
</script>
