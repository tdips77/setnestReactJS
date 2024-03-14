import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/addadress.module.css";
import setnestlogo from "../../../public/assets/Setnest-copy.png";
import editIcon from "../../../public/assets/edit-profile.svg";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import crslimg from "../../../public/assets/createCrsl.png";
import profilePic from "../../../public/assets/profile-pic.png";
// import OTPInput,  {ResendOTP } from "otp-input-react";
import InputGroup from "react-bootstrap/InputGroup";
import OtpInput from "react-otp-input";

import * as yup from "yup";
import Link from "next/link";
import axiosInstance from "pages/api/axios-config";

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const AddAddress = () => {
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [homeAddress, setHomeAddress] = useState({
    country: "",
    streetNumber: "",
    streetName: "",
    streetType: "",
    unit: "",
    city: "",
    province: "",
    postalCode: "",
    addressType: "Residence",
  });
  const [billingAddress, setBillingAddress] = useState({
    country: "",
    streetNumber: "",
    streetName: "",
    streetType: "",
    unit: "",
    city: "",
    province: "",
    postalCode: "",
    addressType: "Billing",
  });

  const [showOTP, setshowOTP] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
 
  const onSubmit = async (data) => {
    console.log("Submit Data..........", homeAddress);
    try {
      const response = await axiosInstance.put('users/updateAddress', {address: homeAddress, billingAddress: billingAddress});
      // Handle successful response
      console.log(response.data);
      if(response.data.sucess === 200){
        // setshowOTP(true)
        router.push("/listerDashboard")
        console.log("response User Data", response.data);
      }
      return response.data; // Return data if needed
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      throw error; // Rethrow error or handle it appropriately
    }
  };

  const handleHomeAddress = (e) => {
    const { name, value } = e.target;
    setHomeAddress({
      ...homeAddress,
      [name]: value,
    });
  };

  const handleBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setUseSameAddress(e.target.checked);
    if (e.target.checked) {
      setBillingAddress({
        country: homeAddress.postalCode,
        streetNumber: homeAddress.streetNumber,
        streetName: homeAddress.streetName,
        streetType: homeAddress.streetType,
        unit: "",
        city: homeAddress.city,
        province: "leinsester",
        postalCode: homeAddress.postalCode,
        addressType: "Billing",
      });
    } else {
      // Clear billing address fields
      setBillingAddress({
        country: "",
        streetNumber: "",
        streetName: "",
        streetType: "",
        unit: "",
        city: "",
        province: "",
        postalCode: "",
        addressType: "",
      });
    }
  };

  return (
    <div className="container-fluid main-set ">
      <Image
        src={setnestlogo}
        alt="logo"
        className={"img-fluid " + styles.topLogo}
      />
      <div className="container-fluid hgt-100vh">
        <div className="row side-padding mob-side">
          <div className="col-12 col-md-6 left-padding">
            <div className="mb-3">
              <h5 className="mb-4">Add Address</h5>
              <div className="row">
                <div className="mb-3 col-12">
                  <p className={styles.addresp}>
                    <span>Home </span> Address
                  </p>
                </div>
                <div className="col-12">
                  <FloatingLabel controlId="floatingPassword" label="Pincode">
                    <Form.Control
                      type="text"
                      name="postalCode"
                      placeholder="Pincode"
                      value={homeAddress.postalCode}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.email?.message}</p>
                </div>
                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Flat, House No., Building, Company, Apartment"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Flat, House No., Building, Company, Apartment"
                      name="streetNumber"
                      value={homeAddress.streetNumber}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Area, Street, Sector, Village"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Area, Street, Sector, Village"
                      name="streetName"
                      value={homeAddress.streetName}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="Landmark">
                    <Form.Control
                      type="text"
                      placeholder="Landmark"
                      name="streetType"
                      value={homeAddress.streetType}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="Town/City">
                    <Form.Control
                      type="text"
                      placeholder="Town/City"
                      name="city"
                      value={homeAddress.city}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="State">
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={homeAddress.state}
                      onChange={handleHomeAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-12">
                  <p className={styles.addresp}>
                    <span>Billing </span> Address
                  </p>
                  <Form.Check
                    label={<span>as same home address </span>}
                    name="group1"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className="col-12">
                  <FloatingLabel controlId="floatingPassword" label="Pincode">
                    <Form.Control
                      type="text"
                      placeholder="Pincode"
                      name="postalCode"
                      value={billingAddress.postalCode}
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.email?.message}</p>
                </div>
                <div className="col-12">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Flat, House No., Building, Company, Apartment"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Flat, House No., Building, Company, Apartment"
                      value={billingAddress.streetNumber}
                      name="streetNumber"
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Area, Street, Sector, Village"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Area, Street, Sector, Village"
                      value={billingAddress.streetName}
                      name="streetName"
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="Landmark">
                    <Form.Control
                      type="text"
                      placeholder="Landmark"
                      value={billingAddress.streetType}
                      name="streetType"
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="Town/City">
                    <Form.Control
                      type="text"
                      placeholder="Town/City"
                      value={billingAddress.city}
                      name="city"
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
                <div className="col-6">
                  <FloatingLabel controlId="floatingPassword" label="State">
                    <Form.Control
                      type="text"
                      placeholder="State"
                      value={billingAddress.state}
                      name="state"
                      onChange={handleBillingAddress}
                    />
                  </FloatingLabel>
                  <p>{errors.password?.message}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  {/* <Link href="/verifyprofile"> */}
                  <button
                    type="button"
                    className="skip-btn"
                    onClick={(e) => setshowOTP(true)}
                  >
                    Skip
                  </button>
                  {/* </Link> */}
                </div>

                <div className="col-6">
                  {/* <Link href="/verifyprofile"> */}
                  <button type="submit" onClick={onSubmit} className="addreSIgn signup-btn">
                    Next
                  </button>
                  {/* </Link> */}
                </div>
              </div>
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

export default AddAddress;
