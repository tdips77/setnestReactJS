import React, { useState } from 'react';
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
import { Auth } from '@aws-amplify/auth';
import awsConfig from "../../../amplifyconfig";

// Amplify.configure(awsConfig);



const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const SignUp = () => {
  // Amplify.configure(awsConfig)
  const [otp, setOtp] = useState('');
  const [showOTP, setshowOTP] = useState(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onSubmit = async (data) => {
    console.log("User Data", data);
    try {
      const { user } = await Auth.signUp({
        username: 'jheel1506',
        password: 'password',
        attributes: {
          email: 'jheel1506@yopmail.com',
          // You can add more attributes here as needed
        }
      });
      console.log(user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const renderButton = () => {
    return <button className='resendBtn'> Resend the code</button>;
  };

  const renderTime = (remainingTime) => {
    return <span>{remainingTime} sec</span>;
  };

  const handleVerify = async () => {
    try {
      // Verify the user with the entered OTP
      await Auth.confirmSignUp(data.email, otp);
      // Redirect to the create profile page after successful verification
      router.push('/createprofile');
    } catch (error) {
      console.error('Error verifying user:', error);
      setError('otp', {
        type: 'manual',
        message: 'Invalid OTP. Please check and try again.',
      });
    }
  };

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
                      value={otp}
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
                <button type='button' className='signup-btn' onClick={handleVerify}>
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
