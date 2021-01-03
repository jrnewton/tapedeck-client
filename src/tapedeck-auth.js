Vue.createApp({
  data() {
    return {
      username: '',
      password: '',
      email: '',
      code: '',
      currentUser: null,
      Amplify: null
    };
  },
  mounted() {
    this.Amplify = window['aws_amplify'];
    console.log('window is', window);
    console.log('Amplify is', this.Amplify);

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

    this.Amplify.default.configure(config);
  },
  methods: {
    async signup() {
      console.log('calling signup');

      try {
        const params = {
          username: this.username,
          password: this.password,
          attributes: {
            email: this.email
          }
        };
        const { user } = await this.Amplify.Auth.signUp(params);
        console.log('signUp result', user);
        this.currentUser = user;
        console.log('currentUser set to', this.currentUser);
        window.location.href = '/auth-confirm.html';
      } catch (error) {
        console.log('signUp error', error);
      }
    }
  }
}).mount('#tapedeck-auth');
