import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      authenticated: false,
      authFlow: 'login', //one of login, signup, confirm, complete
      sessionData: null
    };
  },
  getters: {
    authenticated(state) {
      return state.authenticated;
    },
    authFlow(state) {
      return state.authFlow;
    }
  },
  mutations: {
    authenticated(state, value) {
      state.authenticated = value;
    },
    authFlow(state, value) {
      state.authFlow = value;
    },
    sessionData(state, value) {
      state.sessionData = value;
    }
  },
  actions: {
    login(context, _value) {
      context.commit('authenticated', true);
    },
    logout(context, _value) {
      context.commit('authenticated', false);
    },
    authFlow(context, value) {
      context.commit('authFlow', value);
    },
    sessionData(context, value) {
      context.commit('sessionData', value);
    }
  }
});
