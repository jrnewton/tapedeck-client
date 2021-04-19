import { createStore } from 'vuex';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import config, { apiEndpoint } from './awsconfig';

const authSetup = () => {
  Amplify.configure(config);
};

export default createStore({
  state() {
    return {
      formUrl: null,
      formDesc: null,
      sessionData: null
    };
  },
  getters: {
    formUrl(state) {
      return state.formUrl;
    },
    formDesc(state) {
      return state.formDesc;
    },
    authenticated(state) {
      return !!state.sessionData;
    }
  },
  mutations: {
    formUrl(state, data) {
      state.formUrl = data;
    },
    formDesc(state, data) {
      state.formDesc = data;
    },
    confirmUser(state) {
      state.sessionData.confirmed = true;
    },
    user(state, data) {
      const cognitoUser = data.cognitoUser;
      const confirmed = data.confirmed;

      state.sessionData = {
        confirmed: confirmed
      };

      state.sessionData.user = cognitoUser;

      state.sessionData.email = cognitoUser.username;
      //state.sessionData.username = cognitoUser.username;
      //state.sessionData.email = cognitoUser.attributes['email'];

      const cogSession = cognitoUser.getSignInUserSession();
      state.sessionData.accessToken = cogSession.getAccessToken().getJwtToken();
      state.sessionData.idToken = cogSession.getIdToken().getJwtToken();

      console.log('sessionData', state.sessionData);
    }
  },
  actions: {
    async login(context, data) {
      console.log('login called');

      try {
        authSetup();
        const user = await Auth.signIn(data.formEmail, data.formPassword);
        console.log('login result', user);
        context.commit('user', { cognitoUser: user, confirmed: true });
        console.log('login done');
      } catch (error) {
        console.log('login error', error);
        throw error;
      }
    },
    async create(context, data) {
      console.log('create called');
      try {
        authSetup();
        const params = {
          username: data.formEmail,
          password: data.formPassword
          // attributes: {
          //   email: this.email
          // }
        };
        const { user } = await Auth.signUp(params);
        console.log('create result', user);
        context.commit('user', { cognitoUser: user, confirmed: false });
        console.log('create done');
      } catch (error) {
        console.log('create error', error);
      }
    },
    async confirm(context, data) {
      console.log('confirm called');
      try {
        authSetup();
        const result = await Auth.confirmSignUp(
          data.formEmail,
          data.formConfirmationCode
        );
        //the best API ever.
        if (result === 'SUCCESS') {
          context.commit('confirmUser');
        } else {
          throw new Error('unexpected results from confirmation call', result);
        }
        console.log('confirm done');
      } catch (error) {
        console.log('confirm error', error);
      }
    },
    /**
     * @param {*} context
     * @param {*} data map containing 'url' and 'desc' keys.
     */
    async archive(context, data) {
      try {
        const url = `${apiEndpoint}/archive?accessToken=${this.sessionData.accessToken}`;
        this.progress = 'Sending request for ' + url;
        console.log('archive POST', url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            //prettier-ignore
            'Authorization': this.sessionData.idToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: data.url,
            desc: data.desc
          })
        });

        console.log('archive response', response);

        if (response.ok) {
          const json = await response.json();
          console.log('archive response msg', json);
          this.progress = json;

          this.archivesEnabled = false;
          this.formURL = '';
          console.log('archive done');
        } else {
          console.log('archive throwing error due to status');
          throw new Error(response.status + ': ' + response.statusText);
        }
      } catch (error) {
        console.log('archive error', error);
        this.progress = error;
      }
    }
  }
});
