import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Home.module.css';
import setnestlogo from '../../../public/assets/Setnest-copy.png';
import editIcon from '../../../public/assets/editIcon.png';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import crslimg from '../../../public/assets/crslImg.png';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';
import { signUp, confirmSignUp, signIn, fetchUserAttributes, fetchAuthSession, autoSignIn, signOut, currentAuthenticatedUser, getCurrentUser } from 'aws-amplify/auth';
import axiosInstance, {generateUserId} from "../../../pages/api/axios-config"

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const SignUp = () => {
  // Amplify.configure(awsConfig)
  const [otpData, setOtp] = useState('');
  const [showOTP, setshowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cognitoId, setCognitoId] = useState("");
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onSubmit = async (data) =>  {
    setEmail(data.email)
    setPassword(data.password)
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            // phone_number // E.164 number convention
          },
          // optional
          // autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      setshowOTP(true)
      console.log("User Data", isSignUpComplete, userId, nextStep);
      if (nextStep){
        localStorage.setItem("cognitoId", userId)
      }
      
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const renderButton = () => {
    return <button className='resendBtn'> Resend the code</button>;
  };

  const renderTime = (remainingTime) => {
    return <span>{remainingTime} sec</span>;
  };

  const confirmSignUpAndSignIn = async (username, otp, password) => {
    console.log("user name", username, otp, password);
    try {
        const { confirm, nextStep } = await confirmSignUp({ username, confirmationCode: otp.trim(), options: {
          // default falsy (undefined)
          forceAliasCreation: true
        } });
        console.log("Confirmation Result:", confirm, nextStep);
        const {
          isSignedIn,
          nextStepLogin
        } = await signIn({ username: username, password: password });
        console.log("Sign In", isSignedIn,
        nextStepLogin );
        const {
          usernameCurrent,
          signInDetails
        } = await getCurrentUser();
        const authSession = await fetchAuthSession();
        console.log("Auth Session:", authSession);
        if (authSession.credentials) {
            const idToken = authSession.tokens.toString;
            console.log("JWT TOKEN:", idToken);

            // await SharedPrefHelper.setString(SharedPrefs.idTokenString, idToken);

            await fetchAwsUserAttributes();
        }
    } catch (error) {
        console.error('Error confirming sign-up and signing in:', error);
    }
};

// Function to fetch user attributes
const fetchAwsUserAttributes = async () => {
    try {
        const attributes = await fetchUserAttributes();
        console.log("User Attributes:", attributes);
        if (attributes) {
          setCognitoId(attributes.sub);
          setEmail(attributes.email);
        }

        console.log('Cognito ID:', attributes.sub);
        console.log('Email:', attributes.email);
        const userData = {
          email: email
        }
        try {
          const response = await axiosInstance.post('users/generateUserId', userData);
          // Handle successful response
          console.log(response.data);
          if(response.data.status === 201){
            localStorage.setItem("id", response.data.user.id)
            localStorage.setItem("email", email)
              router.push("/createprofile")
          }
          return response.data; // Return data if needed
        } catch (error) {
          // Handle errors
          console.error('Error:', error);
          throw error; // Rethrow error or handle it appropriately
        }
    } catch (error) {
        console.error('Error fetching user attributes:', error);
    }
};

  // const signIn = async (username, password) => {
  //   try {
  //     await signIn(username, password);
  //     // Retrieve the JWT token after signing in
  //     const session = await Auth.currentSession();
  //     const JWTvalue = session.getIdToken().getJwtToken();
  //     console.log('JWT Token:', JWTvalue);
  
  //     // Fetch user attributes if needed
  //     const user = await Auth.currentAuthenticatedUser();
  //     const userAttributes = user.attributes;
  //     console.log('User Attributes:', userAttributes);
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //   }
  // };
  

 

  

  // Example usage
  // useEffect(() => {
  //   fetchAwsAuthSession();
  // }, []);

  return (
    <div className='container-fluid main-set'>
      <div className='topsection'>
        <button type='button' className={`${styles.iconBtn}`} onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className={`${styles.iconleftBtn}`} />
        </button>
        <Image src={setnestlogo} alt='logo' className={'img-fluid ' + styles.topLogo} />
      </div>
      <div className='container-fluid hgt-100vh'>
        <div className='row side-padding'>
          <div className='col-12 col-md-6 left-padding'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
              <h5 className='mb-4'>Sign up</h5>
              <div>
                <FloatingLabel controlId='floatingInput' label='Email address'>
                  <Form.Control type='email' placeholder='name@example.com' {...register('email')} />
                </FloatingLabel>
                <p>{errors.email?.message}</p>
                <FloatingLabel controlId='floatingPassword' label='Password'>
                  <Form.Control type='password' placeholder='Password' {...register('password')} />
                </FloatingLabel>
                <p>{errors.password?.message}</p>
                <FloatingLabel controlId='floatingPassword2' label='Confirm Password'>
                  <Form.Control type='password' placeholder='Password' {...register('confpassword')} />
                </FloatingLabel>
                <p>{errors.confpassword?.message}</p>
                {!showOTP && (
                  <Form.Check
                    label={
                      <span>
                        I agree to all the <span className='resendBtn'>Term & Condition</span> and{' '}
                        <span className='resendBtn'>Privacy Policy</span>
                      </span>
                    }
                    name='group1'
                    type='checkbox'
                  />
                )}
              </div>
              {showOTP && (
                <div className='mt-4 text-center otpInput'>
                  <p>We have sent the verification OTP to your email address.</p>
                  <p>
                    {/* {data.email}  */}
                    <Image src={editIcon} className='img-fluid editIcon' alt='logo' />{' '}
                  </p>
                  <div className={'otpDiv'}>
                    <OtpInput
                      value={otpData}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span> &nbsp; &nbsp; &nbsp; </span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                  <div className='d-flex justify-content-center resendDiv mt-2'>
                    Didn&apos;t get it? {renderButton()}
                  </div>
                </div>
              )}
              {!showOTP && (
                <button type='submit' className='signup-btn' onClick={onSubmit}>
                  Sign Up
                </button>
              )}
              {showOTP && (
                <button type='button' className='signup-btn' onClick={() => {    
                  confirmSignUpAndSignIn(email, otpData, password); 
                  }}
                  >
                  Verify
                </button>
              )}
            </form>
          </div>
          <div className='col-6 right-padding mob-hide test'>
            <Carousel>
              <Carousel.Item>
                <Image src={crslimg} alt='logo' className='img-fluid' text='First slide' width='100%' height='100%' />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={crslimg} alt='logo' className='img-fluid' text='Second slide' width='100%' height='100%' />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={crslimg} alt='logo' className='img-fluid' text='Third slide' width='100%' height='100%' />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
