import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Home.module.css';
import  setnestlogo from '../../../public/assets/Setnest-copy.png';
import editIcon from '../../../public/assets/editIcon.png'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import crslimg from '../../../public/assets/createCrsl.png';
import profilePic from '../../../public/assets/profile-pic.png';
// import OTPInput,  {ResendOTP } from "otp-input-react";
import InputGroup from 'react-bootstrap/InputGroup';
import OtpInput from 'react-otp-input';


import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const CreateProfile = () => {
    // const [OTP, setOTP] = useState("");
    const [otp, setOtp] = useState('');
    // const handleChange = (otp) => {
    //   setOTP(otp);
    // };
   
    const [showOTP, setshowOTP] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
      const router = useRouter();
      const goBack = () => {
        router.back();
      };
      const onSubmit = async (data) => {
        // Your registration logic
        // Redirect user after successful registration
        router.push('/login');
      };

      const renderButton = () => {
        return  <button className='resendBtn'> Resend the code</button>;
      };
      const renderTime = (remainingTime) => {
        return <span>{remainingTime} sec</span>;
      };

  

  return (
    <div className='container-fluid main-set '>
     
        <Image src={setnestlogo} alt='logo' className={'img-fluid ' + styles.topLogo}/>
        <div className='container-fluid'>
            <div className='row side-padding'>
                <div className='col-6 left-padding'>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                    <h5 className='mb-4'>Create Profile</h5>
        <div className='row'>
            <div className='mb-3 col-12'>
                <span className='profilePic'>
                    <Image src={profilePic} className='img-fluid' alt='profile' />
                </span>
            </div>
      <div className='col-12'>
      <FloatingLabel controlId="floatingSelect" label="Sign Up as">
                    <Form.Select aria-label="Floating label select example" {...register('email')}>
                      <option value="Villa" selected>abc@gmail.com</option>
                      <option value="Villa">abc@gmail.com</option>
                      <option value="Villa">abc@gmail.com</option>
                      <option value="Villa">abc@gmail.com</option>
                      
                    </Form.Select>
                  </FloatingLabel>
      <p>{errors.email?.message}</p>
      </div>
      <div className='col-6'>
      <FloatingLabel controlId="floatingPassword" label="First Name">
        <Form.Control type="text" placeholder="Sunny" {...register('password')}/>
      </FloatingLabel>
      <p>{errors.password?.message}</p>
      </div>
      <div className='col-6'>
      <FloatingLabel controlId="floatingPassword" label="Last Name">
        <Form.Control type="text" placeholder="Sunny" {...register('password')}/>
      </FloatingLabel>
      <p>{errors.password?.message}</p>
      </div>
      <div className='col-12'>
      <InputGroup className="mb-3">
        <InputGroup.Text className='brd-inptx' id="basic-addon1">+91</InputGroup.Text>
        <FloatingLabel controlId="floatingPassword" label="Last Name">
        <Form.Control
        
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        {...register('confpassword')}
      />
        </FloatingLabel>
        
      </InputGroup>
      <p>{errors.confpassword?.message}</p>
      </div>
      
      
      
      
      {
        !showOTP &&
        <Form.Check
            label={  <span >I agree to all the <span className='resendBtn'>Term & Condition</span> and <span className='resendBtn'>Privacy Policy</span> </span>}
            name="group1"
            type="checkbox"
            
          />
        
      }
      </div>
        {showOTP && 

        
            <div className='mt-4 text-center otpInput'>
              <p>We have sent the verification OTP to your email address.</p>
              <p>@emailid <Image src={editIcon} className='img-fluid editIcon' alt='logo' /> </p>
            {/* <OTPInput className='otpInput' value={OTP} onChange={handleChange} autoFocus OTPLength={6} otpType="number" disabled={false}  /> */}
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
            Didn&apos;t get it? <span className='resendBtn'> Resend the code</span>
            </div>
            </div>
        
        }
        {
          !showOTP &&
        <button type="button" className='signup-btn' onClick={(e) => setshowOTP(true)} >Sign Up</button>

        }
        {
          showOTP &&
        <button type="button" className='signup-btn' onClick={(e) => setshowOTP(true)} >Verify</button>

        }
        
      </form>
                </div>
                <div className='col-6 right-padding'>
                <Carousel>
      <Carousel.Item>
        <Image src={crslimg} alt='logo' className='img-fluid' text="First slide" width="100%" height="100%"/>
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={crslimg} alt='logo' className='img-fluid' text="Second slide" width="100%" height="100%"/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={crslimg} alt='logo' className='img-fluid' text="Third slide" width="100%" height="100%"/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
                </div>

            </div>

        </div>
      
    </div>
  );
};

export default CreateProfile;
