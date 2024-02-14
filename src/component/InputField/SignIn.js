// Import necessary modules and components
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Auth } from 'aws-amplify';
import * as yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import setnestlogo from '../../../public/assets/Setnest-copy.png';
import crslimg from '../../../public/assets/crslImg.png';

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignIn = () => {
  const [showOTP, setShowOTP] = useState(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  // Go back to the previous page
  const goBack = () => {
    router.back();
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const user = await Auth.signIn(data.email, data.password);
      console.log('User signed in:', user);
      router.push('/listerDashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    }
  };

  return (
    <div className="container-fluid main-set">
      <div className="topsection">
        <button type="button" className={`${styles.iconBtn}`} onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className={`${styles.iconleftBtn}`} />
        </button>
        <Image src={setnestlogo} alt="logo" className={'img-fluid ' + styles.topLogo} />
      </div>

      <div className="container-fluid hgt-100vh">
        <div className="row side-padding">
          <div className="col-12 col-md-6 left-padding">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3 wd-100">
              <h5 className="mb-4">Sign In</h5>
              <div>
                <FloatingLabel controlId="floatingInput" label="Enter Email ID/Mobile no.">
                  <Form.Control type="email" placeholder="Enter Email ID/Mobile no." {...register('email')} />
                </FloatingLabel>
                <p>{errors.email?.message}</p>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" {...register('password')} />
                </FloatingLabel>
                <p>{errors.password?.message}</p>
                <Link href="/forgetpassword">
                  <p className="mb-0 clr-pink text-end">Forgot Password?</p>
                </Link>
              </div>

              <button type="submit" className="signup-btn mt-4">
                Sign In
              </button>
            </form>
          </div>
          <div className="col-6 right-padding mob-hide test">
            <Carousel>
              <Carousel.Item>
                <Image src={crslimg} alt="logo" className="img-fluid" text="First slide" width="100%" height="100%" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={crslimg} alt="logo" className="img-fluid" text="Second slide" width="100%" height="100%" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={crslimg} alt="logo" className="img-fluid" text="Third slide" width="100%" height="100%" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
