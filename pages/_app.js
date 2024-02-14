import '@/styles/globals.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import awsconfig from '../amplifyconfig';
import { CognitoIdentityClient, GetIdCommand } from "@aws-sdk/client-cognito-identity";
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';


Amplify.configure(awsconfig);


try {
  Amplify.configure(awsconfig);
  console.log('Amplify configured successfully', Amplify.configure(awsconfig));
} catch (error) {
  console.error('Failed to configure Amplify', error);
}

const client = new CognitoIdentityClient({ region: 'ap-south-1' });

// Example usage: Get Identity ID
const command = new GetIdCommand({
  IdentityPoolId: 'ap-south-1:8dc78e14-9c4b-48ef-a3e6-e2d87475fa24'
});


try {
  const response = await client.send(command);
  console.log("Connect", response); // Handle response accordingly
} catch (error) {
  console.error("Not", error);
}

async function signUp() {
  try {
    const username = 'username'; // Replace with your desired username
    const password = 'password'; // Replace with your desired password
    const email = 'email@example.com'; // Replace with your email

    const signUpResponse = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // Add additional attributes here if needed
      },
    });
    
    console.log('Sign up successful:', signUpResponse);
  } catch (error) {
    console.error('Error signing up:', error);
  }
}

signUp();

library.add(fas, fab);
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
