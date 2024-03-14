import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Home.module.css";
import setnestlogo from "../../../public/assets/Setnest-copy.png";
import editIcon from "../../../public/assets/edit-profile.svg";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import crslimg from "../../../public/assets/createCrsl.png";
import profilePic from "../../../public/assets/profile-pic.png";
// import OTPInput,  {ResendOTP } from "otp-input-react";
import InputGroup from "react-bootstrap/InputGroup";
import OtpInput from "react-otp-input";
import axios from 'axios';
import Link from "next/link";

import * as yup from "yup";
import axiosInstance from "pages/api/axios-config";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const CreateProfile = () => {
  // const [OTP, setOTP] = useState("");
  const [otp, setOtp] = useState("");
  // const handleChange = (otp) => {
  //   setOTP(otp);
  // };
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    role: 'Villa', // Assuming a default value for role
    firstName: '',
    lastName: '',
    mobile: ''
    // Add other form fields here
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const payload = {
      file: file
    }
    const url = "https://mr4rf2cwse.execute-api.ap-south-1.amazonaws.com/uat/uploads/userData";
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    // call api here
    const response = await axios.post(url, payload, config);
    const result = await response.data.url;
    console.log("Data", result);
    setImage(result?.Location);
  };

  const [showOTP, setshowOTP] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const onSubmit = async (data) => {
    const firstUserData = {
      firstName : formData.firstName,    
lastName: formData.lastName,     
email: localStorage.getItem('email'),     
mobile: formData.mobile,     
role: formData.role,    
profileImageUrl: image    
    }
    try {
      const response = await axiosInstance.put('users/register', firstUserData);
      // Handle successful response
      console.log(response.data);
      if(response.data.status === 201){
        setshowOTP(true)
        console.log("response User Data", response.data);
      }
      return response.data; // Return data if needed
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      throw error; // Rethrow error or handle it appropriately
    }
  };

  const renderButton = () => {
    return <button className="resendBtn"> Resend the code</button>;
  };
  const renderTime = (remainingTime) => {
    return <span>{remainingTime} sec</span>;
  };
  const onVerify = async () => {
    console.log("OTP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const otpObj = {
      otp: otp
    }
    try {
      const response = await axiosInstance.post('misc/verifyOtp', otpObj);
      // Handle successful response
      console.log(response.data);
      if(response.data.status === 200){
        router.push("/addaddress")
      }
      return response.data; // Return data if needed
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      throw error; // Rethrow error or handle it appropriately
    }
  }

  return (
    <div className="container-fluid main-set ">
      <div className="topsection">
        <button type="button" className={`${styles.iconBtn}`} onClick={goBack}>
          {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
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
          <div className="col-12 col-md-6 left-padding d-block">
            <div className="mb-3 w-100">
              <h5 className="mb-4">Create Profile</h5>
              <div className="row">
                <div className="mb-3 col-12">
                  <span className="profilePic">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    <Image
                      src={image ? image : profilePic}
                      className="img-fluid"
                      alt="profile"
                      width={100}
                      height={100}
                    />
                  </span>
                </div>
                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Select user type"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="companyAdmin" selected>
                        Listing Agency/Company
                      </option>
                      <option value="tenat">Tenant</option>
                      <option value="lister">Lister</option>
                      <option value="employee">Employee</option>
                    </Form.Select>
                  </FloatingLabel>
                  <p>{errors.role?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="First Name"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Sunny"
                      name="firstName"
                      value={formData.firstName} onChange={handleChange}
                    />
                  </FloatingLabel>
                  <p>{errors.firstName?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="Last Name">
                    <Form.Control
                      type="text"
                      placeholder="Sunny"
                      name="lastName"
                      value={formData.lastName} onChange={handleChange} 
                    />
                  </FloatingLabel>
                  <p>{errors.lastName?.message}</p>
                </div>
                <div className="col-12">
                  <InputGroup className="mb-0">
                    <InputGroup.Text className="brd-inptx" id="basic-addon1">
                      +91
                    </InputGroup.Text>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Mobile Number"
                    >
                      <Form.Control
                        className="brd-left"
                        placeholder="Username"
                        aria-label="Username"
                        name="mobile"
                        aria-describedby="basic-addon1"
                        value={formData.mobile} onChange={handleChange}
                      />
                    </FloatingLabel>
                  </InputGroup>
                  <p>{errors.mobile?.message}</p>
                </div>
                {
          !showOTP &&
        <button className='signup-btn' onClick={onSubmit} >Create</button>

        }
              </div>
            </div>
            <div className="w-100">
              {showOTP && (
                <div className="mt-2 text-left otpInput">
                  <p>We have sent the verification OTP to your mobile no.</p>
                  <p className="mobile">
                    {" "}
                    +91 987654321{" "}
                    <Image
                      src={editIcon}
                      className="img-fluid editIcon"
                      alt="logo"
                    />{" "}
                    <span>Edit</span>{" "}
                  </p>
                  {/* <OTPInput className='otpInput' value={OTP} onChange={handleChange} autoFocus OTPLength={6} otpType="number" disabled={false}  /> */}
                  <div className={"otpDiv"}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span> &nbsp; &nbsp; &nbsp; </span>}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>

                  <div className="d-flex justify-content-center resendDiv mt-2">
                    Didn&apos;t get it?{" "}
                    <span className="resendBtn"> Resend the code</span>
                  </div>
                </div>
              )}

              {showOTP && (
                // <Link href="/addaddress">
                  <button type="button" className="signup-btn" onClick={onVerify}>
                    Verify
                  </button>
                // </Link>
              )}
            </div>
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
                <Carousel.Caption></Carousel.Caption>
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
                <Carousel.Caption></Carousel.Caption>
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
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
