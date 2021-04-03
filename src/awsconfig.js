//default export taken from backend repo with amplify setup
export default {
  //Not required:
  //aws_project_region: 'us-east-2',
  // aws_cloud_logic_custom: [
  //   {
  //     name: 'cyamplify',
  //     endpoint: 'https://vji807f5ii.execute-api.us-east-2.amazonaws.com/dev',
  //     region: 'us-east-2'
  //   }
  // ],
  // aws_cognito_identity_pool_id:
  //   'us-east-2:4952947d-42ba-400f-8545-b78e7f276f62',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_qWWSu06kb',
  aws_user_pools_web_client_id: '4ngbb9lsqa61vq3dfc21c85k11',
  oauth: {}
};

//tack on some additional items
export let apiEndpoint =
  'https://9rxe670nh8.execute-api.us-east-2.amazonaws.com/dev';
