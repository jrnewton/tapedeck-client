<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator username-alias="email" ref="auth">
      <div v-if="authState === 'signedin' && email">
        <div>Hello, {{ email }}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

export default {
  name: 'AuthStateApp',
  created() {
    //authData is a cognitoUser object.
    onAuthUIStateChange((authState, authData) => {
      console.log('authState:', authState);
      console.log('authData:', authData);

      if (authState === AuthState.SignedIn) {
        console.log('user signed in');
      } else if (authState === AuthState.SignedOut) {
        console.log('user signed out');
      }

      this.authState = authState;
      this.user = authData;
      this.email = authData ? authData.attributes['email'] : undefined;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      email: undefined
    };
  },
  mounted() {
    const authComponent = this.$refs.auth;
    console.log('auth comp', authComponent);
  },
  beforeUnmount() {
    return onAuthUIStateChange;
  }
};
</script>
