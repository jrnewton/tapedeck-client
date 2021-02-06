# Notes on aws cli

I'd like to build awsconfig.js using data from the cli.

Minimal fields needed:

```
aws_cognito_identity_pool_id: 'us-east-2:4952947d-42ba-400f-8545-b78e7f276f62',
aws_cognito_region: 'us-east-2',
aws_user_pools_id: 'us-east-2_14c19uAzj',
aws_user_pools_web_client_id: '2ivr8cadk0qskhims7905cfect',
oauth: {}
```

aws cognito-identity list-identity-pools --max-results 10

##select your pool based on name
##save user-pool-id for following commands
aws cognito-idp list-user-pools --max-results 10

##use output from last command
aws cognito-idp describe-user-pool --user-pool-id "us-east-2_14c19uAzj"

##get ClientId
aws cognito-idp list-user-pool-clients --user-pool-id "us-east-2_14c19uAzj"

##Look at each client, pick the one without "ClientSecret"
aws cognito-idp describe-user-pool-client --user-pool-id "us-east-2_14c19uAzj" --client-id xxxxxxxxx
