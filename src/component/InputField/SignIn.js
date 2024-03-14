// Import necessary modules and components
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "aws-amplify";
import * as yup from "yup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import setnestlogo from "../../../public/assets/Setnest-copy.png";
import crslimg from "../../../public/assets/crslImg.png";
import { signIn } from "aws-amplify/auth";
import axiosInstance from "pages/api/axios-config";
import { sessionStatus } from "@/utils/session";
import { decodeJWTAndStore } from "@/utils/auth";
import { id } from "date-fns/locale";

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const SignIn = () => {
  const [showOTP, setShowOTP] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  // Go back to the previous page
  const goBack = () => {
    router.back();
  };
  function findIdTokenKey() {
    if (typeof window !== "undefined") {
      for (var key in localStorage) {
        if (key.endsWith("idToken")) {
          return key;
        }
      }
    }
    return null; // Return null if idToken key not found
  }

  
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const user = await signIn({
        username: data.email,
        password: data.password,
      });
      if (user?.isSignedIn) {
        let idTokenKey = findIdTokenKey();
        console.log("ID token", idTokenKey);
        const idToken = localStorage.getItem(idTokenKey);
        console.log("User Data", idToken);
        if(idToken){
          const decodeData = decodeJWTAndStore(idToken);
          localStorage.setItem("cognitoId", decodeData.sub);
  
          // const userCognitoId = user
          sessionStatus();
          console.log("seeee", sessionStatus());
          try {
            const response = await axiosInstance.get("users/getUser");
            // Handle successful response
            console.log(response.data.data);
            const userResponse = response.data.data
            console.log("response", userResponse);
            if (response.status === 200) {
              // setshowOTP(true)
              if(userResponse.id > 0){
                localStorage.setItem("id", userResponse.id)
                if(userResponse.first_name && userResponse.mobile){
                  if(userResponse.contact_verified){
                    router.push("/listerDashboard")
                  }
                  else{
                      router.push("/createprofile")
                  }
                }
                else{
                  router.push("/createprofile")
                }
              }
              // setTimeout(() => {
              //   router.push("/listerDashboard");
              //   router.reload();
              // }, [2000]);
              console.log("response User Data", response.data);
            }
            return response.data; // Return data if needed
          } catch (error) {
            // Handle errors
            console.error("Error:", error);
            throw error; // Rethrow error or handle it appropriately
          }
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <div className="container-fluid main-set">
      <div className="topsection">
        <button type="button" className={`${styles.iconBtn}`} onClick={goBack}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`${styles.iconleftBtn}`}
          />
        </button>
        <Image
          src={setnestlogo}
          alt="logo"
          className={"img-fluid " + styles.topLogo}
        />
      </div>

      <div className="container-fluid hgt-100vh">
        <div className="row side-padding">
          <div className="col-12 col-md-6 left-padding">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3 wd-100">
              <h5 className="mb-4">Sign In</h5>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Enter Email ID/Mobile no."
                >
                  <Form.Control
                    type="email"
                    placeholder="Enter Email ID/Mobile no."
                    {...register("email")}
                  />
                </FloatingLabel>
                <p>{errors.email?.message}</p>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
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
                <Image
                  src={crslimg}
                  alt="logo"
                  className="img-fluid"
                  text="First slide"
                  width="100%"
                  height="100%"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={crslimg}
                  alt="logo"
                  className="img-fluid"
                  text="Second slide"
                  width="100%"
                  height="100%"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={crslimg}
                  alt="logo"
                  className="img-fluid"
                  text="Third slide"
                  width="100%"
                  height="100%"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
