Vue.createApp({
  data() {
    return {
      username: '',
      code: '',
      Amplify: null
    };
  },
  mounted() {
    console.log('mounted called');
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
    console.log('Amplify is', this.Amplify);
    console.log('mounted returning');
  },
  methods: {
    async confirm() {
      console.log('confirm called');
      console.log('Amplify is', this.Amplify);
      console.log('calling confirm');
      try {
        const result = await this.Amplify.Auth.confirmSignUp(
          this.username,
          this.code
        );
        console.log('confirm result', result);
        window.location.href = '/';
      } catch (error) {
        console.log('confirm error', error);
      }

      console.log('confirm returning');
    }
  }
}).mount('#tapedeck-auth-confirm');
