const awsmobile = {
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "auth": {
      "plugins": {
        "awsCognitoAuthPlugin": {
          "UserAgent": "aws-amplify-cli/0.1.0",
          "Version": "0.1.0",
          "IdentityManager": {
            "Default": {}
          },
          "CredentialsProvider": {
            "CognitoIdentity": {
              "Default": {
                "PoolId": "ap-south-1:8dc78e14-9c4b-48ef-a3e6-e2d87475fa24", // Replace this with your actual PoolId
                "Region": "ap-south-1" // Replace this with your actual AWS region
              }
            }
          },
          "CognitoUserPool": {
            "Default": {
              "PoolId": "ap-south-1_BtLvjGi05", // Replace this with your actual PoolId
              "AppClientId": "61bcl85q707gdjtvp9eu0i91pi", // Replace this with your actual AppClientId
              "Region": "ap-south-1" // Replace this with your actual AWS region
            }
          },
          "Auth": {
            "Default": {
              "authenticationFlowType": "USER_SRP_AUTH"
            }
          }
        }
      }
    }
  };
  
  export default awsmobile;
  