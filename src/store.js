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
      //save pwd for new user, to auto-login after confirmation. yuck.
      password: null,
      //My cognito userpool configuration does not allow for users to define their own username,
      //so this is internally generated by cognito. Same as the 'subject'.
      userid: null,
      email: null,
      verified: false,
      accessToken: null,
      idToken: null
    };
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    idToken(state) {
      return state.idToken;
    },
    password(state) {
      return state.password;
    },
    isAuthenticated(state) {
      return !!state.idToken;
    }
  },
  mutations: {
    clearPassword(state) {
      state.password = null;
    },
    unverifiedUser(state, data) {
      const cognitoUser = data.cognitoUser;

      console.debug('committing unverified user', cognitoUser);
      //funky - new user will have email as username, even though
      //username will be changed later by cognito upon confirmation.
      state.email = cognitoUser.username;
      state.verified = false;
      state.password = data.password;
    },
    verifiedUser(state, cognitoUser) {
      console.debug('committing verified user', cognitoUser);

      //call it userid because it's id-ish in shape.
      state.userid = cognitoUser.username;

      const cogSession = cognitoUser.getSignInUserSession();
      if (cogSession) {
        state.accessToken = cogSession.getAccessToken().getJwtToken();
        state.idToken = cogSession.getIdToken().getJwtToken();
      } else {
        console.error('no cognito session');
        state.accessToken = null;
        state.idToken = null;
      }

      if (cognitoUser.attributes) {
        state.email = cognitoUser.attributes['email'];
        state.verified = cognitoUser.attributes['email_verified'];
      } else {
        console.error('no user attributes');
        state.email = '';
        state.verified = false;
      }
      console.debug('state is now', state);
    }
  },
  actions: {
    async login(context, data) {
      console.debug('login called with', data);

      try {
        authSetup();
        const user = await Auth.signIn(data.formEmail, data.formPassword);
        console.debug('login result', user);
        context.commit('verifiedUser', user);
        console.debug('login done');
      } catch (error) {
        console.error('login error', error);
        throw error;
      }
    },
    async create(context, data) {
      console.debug('create called with', data);
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
        console.debug('create result', user);
        context.commit('unverifiedUser', {
          cognitoUser: user,
          password: data.formPassword
        });
        console.debug('create done');
      } catch (error) {
        console.error('create error', error);
      }
    },
    async confirm(context, data) {
      console.debug('confirm called with', data);
      try {
        authSetup();
        const result = await Auth.confirmSignUp(
          data.formEmail,
          data.formConfirmationCode
        );
        //Kludge alert!
        //Cognito requires the user to login again after confirmation.
        //Do the login for them behind the scenes.
        if (result === 'SUCCESS') {
          await context.dispatch('login', {
            formEmail: data.formEmail,
            formPassword: context.getters.password
          });
        } else {
          throw new Error('unexpected results from confirmation call', result);
        }
        console.debug('confirm done');
      } catch (error) {
        console.error('confirm error', error);
      } finally {
        context.commit('clearPassword');
      }
    },
    /**
     * @param {*} context
     * @param {*} data map containing 'url' and 'desc' keys.
     */
    async archive(context, data) {
      console.debug('archive called with', data);
      try {
        const apiURL = `${apiEndpoint}/archive?accessToken=${context.getters.accessToken}`;
        console.debug('archive POST', apiURL);

        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            //prettier-ignore
            'Authorization': context.getters.idToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: data.url,
            desc: data.desc
          })
        });

        console.debug('archive response', response);

        if (response.ok) {
          const json = await response.json();
          console.debug('archive response msg', json);
          console.debug('archive done');
          return json;
        } else {
          console.error(
            'archive throwing error due to status',
            response.status,
            response.statusText
          );
          throw new Error(response.status + ': ' + response.statusText);
        }
      } catch (error) {
        console.error('archive error', error);
        throw error;
      }
    }
  }
});
