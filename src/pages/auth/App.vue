<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator username-alias="email">
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{ user.username }}</div>
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
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    };
  },
  beforeUnmount() {
    return onAuthUIStateChange;
  }
};
</script>
