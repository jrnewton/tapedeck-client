<template>
  <section
    id="auth-login"
    role="region"
    aria-label="Login to your account"
    v-if="authFlow === 'login'"
  >
    <form id="login-form" @submit.prevent="login">
      <fieldset class="form-group" form="login-form">
        <legend>
          <h2 class="lead mt-3">Login to your account</h2>
        </legend>
        <div class="my-2">
          <label id="emailHelp" class="form-text text-info" for="emailInput"
            >Enter your email address</label
          >
          <input
            type="email"
            class="form-control form-control-lg"
            id="emailInput"
            aria-describedby="emailHelp"
            autocomplete="email"
            v-model="formEmail"
          />
        </div>
        <div class="my-2">
          <label
            id="passwordHelp"
            class="form-text text-info"
            for="passwordInput"
            >Enter your password</label
          >
          <input
            type="password"
            class="form-control form-control-lg"
            id="passwordInput"
            aria-describedby="passwordHelp"
            autocomplete="current-password"
            v-model="formPassword"
          />
        </div>

        <p class="text-danger mt-3" v-if="errorMessage">{{ errorMessage }}</p>

        <button
          name="loginButton"
          class="btn btn-info btn my-2"
          role="button"
          type="submit"
        >
          Login
        </button>
        <router-link
          to="/auth-create"
          name="newAccountButton"
          class="btn btn-outline-info btn my-2 mx-2"
          role="button"
          tag="button"
        >
          New Account
        </router-link>
        <!-- prettier-ignore -->
        <router-link to="/auth-forgot" name="forgotPasswordButton">Forgot Password</router-link>
      </fieldset>
    </form>
  </section>
  <section
    id="auth-create"
    role="region"
    aria-label="Create a new account"
    v-if="authFlow === 'create'"
  >
    <form id="create-form" @submit.prevent="create">
      <fieldset class="form-group" form="create-form">
        <legend><h2 class="lead mt-3">Create a new account</h2></legend>
        <div class="my-2">
          <label id="emailHelp" class="form-text text-info" for="emailInput"
            >Enter your email address</label
          >
          <input
            type="email"
            class="form-control form-control-lg"
            id="emailInput"
            aria-describedby="emailHelp"
            autocomplete="email"
            v-model="formEmail"
          />
        </div>
        <div class="my-2">
          <label
            id="passwordHelp"
            class="form-text text-info"
            for="passwordInput"
            >Enter your desired password</label
          >
          <input
            type="password"
            class="form-control form-control-lg"
            id="passwordInput"
            aria-describedby="passwordHelp"
            autocomplete="new-password"
            v-model="formPassword"
          />
        </div>

        <p class="text-danger mt-3" v-if="errorMessage">{{ errorMessage }}</p>

        <button
          name="createButton"
          class="btn btn-info btn my-2"
          href="#"
          role="button"
          type="submit"
        >
          Create new account
        </button>

        <router-link
          to="/auth-confirm"
          name="codeButton"
          class="btn btn-outline-info btn my-2 mx-2"
          role="button"
          tag="button"
        >
          Enter confirmation code
        </router-link>
      </fieldset>
    </form>
  </section>
  <section
    id="auth-confirm"
    role="region"
    aria-label="Confirm your new account"
    v-if="authFlow === 'confirm'"
  >
    <form id="confirm-form" @submit.prevent="confirm">
      <fieldset class="form-group" form="confirm-form">
        <legend><h2 class="lead mt-3">Confirm your new account</h2></legend>
        <label id="emailHelp" class="form-text text-info" for="emailInput"
          >Enter your email address</label
        >
        <input
          type="email"
          class="form-control form-control-lg"
          id="emailInput"
          aria-describedby="emailHelp"
          autocomplete="current-password"
          v-model="formEmail"
        />
        <label id="codeHelp" class="form-text text-info" for="codeInput"
          >Enter your confirmation code</label
        >
        <input
          type="text"
          class="form-control form-control-lg"
          id="codeInput"
          inputmode="numeric"
          pattern="[0-9]*"
          aria-describedby="codeHelp"
          autocomplete="one-time-code"
          v-model="formConfirmationCode"
        />

        <p class="text-danger mt-3" v-if="errorMessage">{{ errorMessage }}</p>

        <button
          name="confirmButton"
          class="btn btn-info btn my-2"
          role="button"
          type="submit"
        >
          Confirm
        </button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formEmail: '',
      formPassword: '',
      formConfirmationCode: '',
      errorMessage: null
    };
  },
  props: ['authFlow'],
  methods: {
    async login() {
      try {
        const payload = {
          formEmail: this.formEmail,
          formPassword: this.formPassword
        };
        await this.$store.dispatch('login', payload);
        const target = this.$route.query.next || 'capture';
        this.$router.push(`/${target}`);
      } catch (error) {
        console.error('login error', error);
        this.errorMessage = error.message || 'An error has occurred';
      }
    },
    async create() {
      try {
        const payload = {
          formEmail: this.formEmail,
          formPassword: this.formPassword
        };
        await this.$store.dispatch('create', payload);
        this.$router.push('/auth-confirm');
      } catch (error) {
        console.error('create error', error);
        this.errorMessage = error.message || 'An error has occurred';
      }
    },
    async confirm() {
      try {
        const payload = {
          formEmail: this.formEmail,
          formConfirmationCode: this.formConfirmationCode
        };
        await this.$store.dispatch('confirm', payload);
        this.$router.push('/');
      } catch (error) {
        console.error('confirm error', error);
        this.errorMessage = error.message || 'An error has occurred';
      }
    }
  }
};
</script>
