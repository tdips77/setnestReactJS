import '@/styles/globals.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import awsconfig from '../amplifyconfig';
import { CognitoIdentityClient, GetIdCommand } from "@aws-sdk/client-cognito-identity";
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';


Amplify.configure({
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: 'ap-south-1_BtLvjGi05',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: '61bcl85q707gdjtvp9eu0i91pi',
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: 'ap-south-1:8dc78e14-9c4b-48ef-a3e6-e2d87475fa24',
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code', // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: 'https://setnest.auth.ap-south-1.amazoncognito.com',
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    }
  }
});



// try {
//   Amplify.configure(awsconfig);
//   console.log('Amplify configured successfully', Amplify.configure(awsconfig));
// } catch (error) {
//   console.error('Failed to configure Amplify', error);
// }

// const client = new CognitoIdentityClient({ region: 'ap-south-1' });

// // Example usage: Get Identity ID
// const command = new GetIdCommand({
//   IdentityPoolId: 'ap-south-1:8dc78e14-9c4b-48ef-a3e6-e2d87475fa24'
// });


// try {
//   const response = await client.send(command);
//   console.log("Connect", response); // Handle response accordingly
// } catch (error) {
//   console.error("Not", error);
// }
const currentConfig = Amplify.getConfig();

library.add(fas, fab);
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
