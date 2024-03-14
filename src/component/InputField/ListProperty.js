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
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import crslimg from "../../../public/assets/addPropCrsl.png";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
// import OTPInput,  {ResendOTP } from "otp-input-react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import Link from "next/link";
import minus from "../../../public/assets/my-property/minus.svg";
import plus from "../../../public/assets/my-property/plus.svg";
import mapList from "../../../public/assets/my-property/list-property-map.png";
import homeList from "../../../public/assets/my-property/list-property-home.png";
import laptopList from "../../../public/assets/my-property/list-property-laptop.png";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import axiosInstance from "pages/api/axios-config";
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const ListProperty = () => {
  const [progress, setProgress] = useState(0);
  const [propertyTypeList, setPropertyTypeList] = useState();
  const [bedroom, setBedrrom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [value, onChange] = useState(new Date());
  const [propertyId, setPropertyId] = useState();
  // const handleChange = (otp) => {
  //   setOTP(otp);
  // };
  const formattedDate = format(value, "dd MMM yyyy");
  const steps = ["Property Details", "Address", "Rent & Deposit Details"];
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    area: "",
  });
  const [stepTwoForm, setStepTwoForm] = useState({
    street: "",
    landmark: "",
    postal_code: "",
    unit: "",
    state: "",
    city: "",
  });
  const [stepThreeForm, setStepThreeForm] = useState({
    rent: "",
    security: "",
    cleaning_charge: "",
    maintenance: "",
  });
  const [text, setText] = useState("");
  const maxWords = 100;

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
    // Your registration logic
    // Redirect user after successful registration
    router.push("/login");
  };

  const renderButton = () => {
    return <button className="resendBtn"> Resend the code</button>;
  };
  const renderTime = (remainingTime) => {
    return <span>{remainingTime} sec</span>;
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    console.log(steps.length);
    console.log(activeStep);
    if (activeStep != 2) {
      if (activeStep === 0) {
        try {
          console.log("Log......", formData);
          const response = await axiosInstance.post("listings/createProperty", {
            ...formData,
            bedroom: bedroom,
            bathroom: bathroom,
          });
          // Handle successful response
          if (response) {
            // setshowOTP(true)
            const newActiveStep = isLastStep()
              ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
              : activeStep + 1;
            setActiveStep(newActiveStep);
            setPropertyId(response.data.id);
          }
          return response.data; // Return data if needed
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw error; // Rethrow error or handle it appropriately
        }
      } else if (activeStep === 1) {
        try {
          const response = await axiosInstance.patch(
            "listings/updateProperty",
            { ...stepTwoForm, listingId: propertyId }
          );
          // Handle successful response
          if (response) {
            // setshowOTP(true)
            const newActiveStep = isLastStep()
              ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
              : activeStep + 1;
            setActiveStep(newActiveStep);
          }
          return response.data; // Return data if needed
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw error; // Rethrow error or handle it appropriately
        }
      }
    }
    if (activeStep == 2) {
      try {
        const response = await axiosInstance.patch("listings/updateProperty", {
          ...stepThreeForm,
          listingId: propertyId,
          available_by: value,
        });
        // Handle successful response
        if (response) {
          router.push({
            pathname: "/addPropertyImage",
            query: { id: propertyId },
          });
        }
        return response.data; // Return data if needed
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
        throw error; // Rethrow error or handle it appropriately
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeStepTwo = (e) => {
    const { name, value } = e.target;
    setStepTwoForm({
      ...stepTwoForm,
      [name]: value,
    });
  };

  const handleChangeStepThree = (e) => {
    const { name, value } = e.target;
    setStepThreeForm({
      ...stepThreeForm,
      [name]: value,
    });
  };

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.trim().split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= maxWords) {
      setText(inputText);
    }
  };

  const incrementValue = () => {
    setBedrrom(bedroom + 1);
  };

  const decrementValue = () => {
    if (bedroom > 0) {
      setBedrrom(bedroom - 1);
    }
  };

  const incrementBthValue = () => {
    setBathroom(bathroom + 1);
  };

  const decrementBthValue = () => {
    if (bathroom > 0) {
      setBathroom(bathroom - 1);
    }
  };

  const stepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="row mt-3">
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingPassword" label="Property Name">
                <Form.Control
                  type="text"
                  placeholder="Property Name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingSelec" label="Property Type">
                <Form.Select
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={formData.type}
                  name="type"
                >
                  <option>Select</option>
                  {propertyTypeList &&
                    propertyTypeList.map((item, index) => {
                      return (
                        <option value={item.title} key={index}>
                          {item.title}
                        </option>
                      );
                    })}
                </Form.Select>
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <InputGroup className="listPropertyInputGrp">
                <Form.Control
                  placeholder="Select no. of bedrooms"
                  aria-label="Select no. of bedrooms"
                  disabled
                  className="listPropertyInput"
                  onChange={handleChange}
                />

                <Image src={minus} alt="minus" onClick={decrementValue} />

                {bedroom}

                <Image src={plus} alt="plus" onClick={incrementValue} />
              </InputGroup>
            </div>

            <div className="col-12 mb-3">
              <InputGroup className="listPropertyInputGrp">
                <Form.Control
                  placeholder="Select no. of bathrooms"
                  aria-label="Select no. of bathrooms"
                  disabled
                  className="listPropertyInput"
                  onChange={handleChange}
                />

                <Image src={minus} alt="minus" onClick={decrementBthValue} />

                {bathroom}

                <Image src={plus} alt="plus" onClick={incrementBthValue} />
              </InputGroup>
            </div>

            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingBath"
                label="Property Area (in Sq ft)"
              >
                <Form.Control
                  type="text"
                  placeholder="Property Area (in Sq ft)"
                  onChange={handleChange}
                  value={formData.area}
                  name="area"
                />
              </FloatingLabel>
            </div>

            <div className="col-12 mb-3">
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                placeholder="Add Description"
                value={formData.description}
                name="description"
                maxLength={100}
                onChange={handleChange}
              />

              <div className="text-end">
                {text.trim() === "" ? 0 : text.length}
                {maxWords > 0 && ` / ${maxWords}`}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="row mt-3">
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingPincode" label="Pincode">
                <Form.Control
                  type="text"
                  placeholder="Pincode"
                  name="postal_code"
                  value={stepTwoForm.postal_code}
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingFlat"
                label="Flat, House No., Building, Company, Apartment"
              >
                <Form.Control
                  type="text"
                  placeholder="Flat, House No., Building, Company, Apartment"
                  value={stepTwoForm.unit}
                  name="unit"
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingArea"
                label="Area, Street, Sector, Village"
              >
                <Form.Control
                  type="text"
                  placeholder="Area, Street, Sector, Village"
                  name="street"
                  value={stepTwoForm.street}
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingLandmark" label="Landmark">
                <Form.Control
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  value={stepTwoForm.landmark}
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingTown" label="Town/City">
                <Form.Control
                  type="text"
                  placeholder="Town/City"
                  name="city"
                  value={stepTwoForm.city}
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingState" label="State">
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={stepTwoForm.state}
                  onChange={handleChangeStepTwo}
                />
              </FloatingLabel>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="row mt-3">
            <h6>Monthly Charges</h6>
            <div className="col-12 mb-3">
              <FloatingLabel controlId="floatingRent" label="Monthly rent">
                <Form.Control
                  type="text"
                  placeholder="Monthly rent"
                  name="rent"
                  value={stepThreeForm.rent}
                  onChange={handleChangeStepThree}
                />
              </FloatingLabel>
            </div>
            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingMaint"
                label="Monthly Maintenance Charge"
              >
                <Form.Control
                  type="text"
                  placeholder="Monthly Maintenance Charge"
                  value={stepThreeForm.maintenance}
                  name="maintenance"
                  onChange={handleChangeStepThree}
                />
              </FloatingLabel>
            </div>
            <h6>One time refundable charges</h6>
            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingSecurity"
                label="Security Deposit"
              >
                <Form.Control
                  type="text"
                  placeholder="Security Deposit"
                  name="security"
                  value={stepThreeForm.security}
                  onChange={handleChangeStepThree}
                />
              </FloatingLabel>
            </div>
            <h6>One time non refundable charges</h6>
            <div className="col-12 mb-3">
              <FloatingLabel
                controlId="floatingCleaning"
                label="Cleaning Charges"
              >
                <Form.Control
                  type="text"
                  placeholder="Cleaning Charges"
                  name="cleaning_charge"
                  value={stepThreeForm.cleaning_charge}
                  onChange={handleChangeStepThree}
                />
              </FloatingLabel>
            </div>
            <h6>Property available by</h6>
            <div className="col-12 mb-3 dateCss">
              <label>Moving In Date</label>
              {/* <Form.Control type="text" placeholder="Moving In Date"  onChange={onChange} value={value}/> */}
              <DatePicker
                onChange={onChange}
                name="available_by"
                value={value}
                format="d MMM yyyy"
              />
            </div>
            <div className="col-12 mb-3">
              <Form.Check
                label={<span>Have You Insured Your Property? </span>}
                name="group1"
                type="checkbox"
              />
            </div>
          </div>
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    propertyCategory();
  }, []);

  const propertyCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `/misc/getGlobalFields?category=${`propertyType`}`
      );
      // Handle successful response
      setPropertyTypeList(response.data.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error; // Rethrow error or handle it appropriately
    }
  };

  return (
    <div className="container-fluid p-0 mrgTop-8">
      <div className="topsectionProp">
        <button
          type="button"
          className={"addProp " + styles.iconBtn}
          onClick={goBack}
        >
          {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`${styles.iconleftBtn}`}
          />
        </button>
      </div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-md-6 listPropdPadd left-padding">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
              <h5 className="mb-4">List Your Property</h5>
              <div className="row justify-content-center position-relative">
                <div className="col-12 customStepper">
                  {/* <ProgressBar now={progress} />
                        <div className='firstDiv'>
                            <span></span>
                        </div>
                        <div className='secondDiv'>
                            <span></span>
                        </div>
                        <div className='thirdDiv'>
                            <span></span>
                        </div> */}

                  <Box sx={{ width: "100%" }}>
                    <Stepper alternativeLabel activeStep={activeStep}>
                      {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                          <StepButton onClick={handleStep(index)}>
                            {label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      {activeStep === steps.length ? (
                        <div>
                          <Typography variant="h4">
                            All steps completed
                          </Typography>
                          {/* Render a summary or confirmation message here */}
                        </div>
                      ) : (
                        <div>
                          {stepContent(activeStep)}
                          <div className="addpropDiv">
                            {activeStep > 0 && (
                              <button
                                type="button"
                                className="skip-btn"
                                disabled={activeStep === 0}
                                onClick={goBack}
                              >
                                Save & Exit
                              </button>
                            )}

                            <button
                              type="button"
                              className="signup-btn"
                              onClick={handleNext}
                            >
                              {activeStep === steps.length ? "Next" : "Next"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Box>
                </div>
              </div>
            </form>
          </div>
          <div className="col-6 right-padding mob-hide">
            {activeStep == 0 && (
              <Image src={laptopList} alt="detail" className="img-fluid" />
            )}

            {activeStep == 1 && (
              <Image src={mapList} alt="detail" className="img-fluid" />
            )}
            {activeStep == 2 && (
              <Image src={homeList} alt="detail" className="img-fluid" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
