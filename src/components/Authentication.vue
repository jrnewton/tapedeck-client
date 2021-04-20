<template>
  <section id="auth">
    <p>AuthFlow: {{ authFlow }}</p>

    <form id="login-form" @submit.prevent="login" v-if="authFlow === 'login'">
      <div class="form-group">
        <div class="my-2">
          <input
            type="email"
            class="form-control form-control-lg"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="formEmail"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Enter your email address</small
          >
        </div>
        <div class="my-2">
          <input
            type="password"
            class="form-control form-control-lg"
            id="passwordInput"
            aria-describedby="passwordHelp"
            placeholder="Password"
            v-model="formPassword"
          />
          <small id="passwordHelp" class="form-text text-muted"
            >Enter your password</small
          >
        </div>

        <button
          name="loginButton"
          class="btn btn-primary btn-lg my-2"
          role="button"
          type="submit"
        >
          Login
        </button>

        <router-link
          to="/"
          name="cancelButton"
          class="btn btn-primary btn-lg my-2 mx-2"
          role="button"
        >
          Cancel
        </router-link>

        <router-link to="/auth-create">Create Account</router-link>
      </div>
    </form>

    <form
      id="create-form"
      @submit.prevent="create"
      v-if="authFlow === 'create'"
    >
      <div class="form-group">
        <div class="my-2">
          <input
            type="email"
            class="form-control form-control-lg"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="formEmail"
          />
          <small id="emailHelp" class="form-text text-muted"
            >Enter your email address</small
          >
        </div>
        <div class="my-2">
          <input
            type="password"
            class="form-control form-control-lg"
            id="passwordInput"
            aria-describedby="passwordHelp"
            placeholder="Password"
            v-model="formPassword"
          />
          <small id="passwordHelp" class="form-text text-muted"
            >Enter your desired password</small
          >
        </div>
        <button
          name="createButton"
          class="btn btn-primary btn-lg my-2"
          href="#"
          role="button"
          type="submit"
        >
          Create
        </button>

        <router-link
          to="/"
          name="cancelButton"
          class="btn btn-primary btn-lg my-2 mx-2"
          role="button"
        >
          Cancel
        </router-link>
      </div>
    </form>

    <form
      id="confirm-form"
      @submit.prevent="confirm"
      v-if="authFlow === 'confirm'"
    >
      <input
        type="email"
        class="form-control form-control-lg"
        id="emailInput"
        aria-describedby="emailHelp"
        placeholder="Email"
        v-model="formEmail"
      />
      <small id="emailHelp" class="form-text text-muted"
        >Enter your email address</small
      >
      <input
        type="text"
        class="form-control form-control-lg"
        id="codeInput"
        aria-describedby="codeHelp"
        placeholder="Confirmation code"
        v-model="formConfirmationCode"
      />
      <small id="codeHelp" class="form-text text-muted"
        >Enter your confirmation code</small
      >
      <button
        name="confirmButton"
        class="btn btn-primary btn-lg my-2"
        role="button"
        type="submit"
      >
        Confirm
      </button>

      <router-link
        to="/"
        name="cancelButton"
        class="btn btn-primary btn-lg my-2 mx-2"
        role="button"
      >
        Cancel
      </router-link>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      formEmail: '',
      formPassword: '',
      formConfirmationCode: ''
    };
  },
  props: ['authFlow'],
  methods: {
    async login() {
      console.log('login called');
      try {
        const payload = {
          formEmail: this.formEmail,
          formPassword: this.formPassword
        };
        console.log(payload);
        await this.$store.dispatch('login', payload);
        this.$router.push('/capture');
      } catch (error) {
        console.log('login error', error);
      }
    },
    async create() {
      console.log('create called');
      try {
        const payload = {
          formEmail: this.formEmail,
          formPassword: this.formPassword
        };
        console.log(payload);
        await this.$store.dispatch('create', payload);
        this.$router.push('/auth-confirm');
      } catch (error) {
        console.log('create error', error);
      }
    },
    async confirm() {
      console.log('confirm called');
      try {
        const payload = {
          formEmail: this.formEmail,
          formConfirmationCode: this.formConfirmationCode
        };
        console.log(payload);
        await this.$store.dispatch('confirm', payload);
        this.$router.push('/capture');
      } catch (error) {
        console.log('confirm error', error);
      }
    }
  }
};
</script>
