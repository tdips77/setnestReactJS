import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/addadress.module.css';
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel';
import crslimg from '../../../public/assets/addPropCrsl.png';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
// import OTPInput,  {ResendOTP } from "otp-input-react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import Link from 'next/link';
import  minus from '../../../public/assets/my-property/minus.svg';
import  plus from '../../../public/assets/my-property/plus.svg';
import  card from '../../../public/assets/my-property/credit-card.svg';
import  accFin1 from '../../../public/assets/my-property/accFin1.png';
import  accFin2 from '../../../public/assets/my-property/accFin2.png';
import  blackPen from '../../../public/assets/my-property/blackPen.png';
import  redpen from '../../../public/assets/my-property/profileeditred.png';
import  profilePic from '../../../public/assets/my-property/profilePic.png';
import rightIcon from '../../../public/assets/my-property/right-icon.svg';
import checked from '../../../public/assets/my-property/checked.svg';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { format } from 'date-fns';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const SchedulerEvent = () => {
    const [progress, setProgress] = useState(0);
    const [bedroom, setBedrrom] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [value, onChange] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        router.push('/contract');
    };
const handleShow = () => setShow(true);
const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
const handleShowNew = () => setShowNew(true);
const [showNewCan, setShowNewCan] = useState(false);
    const handleCloseNewCan = () => setShowNewCan(false);
const handleShowNewCan = () => setShowNewCan(true);
const [showApp, setShowApp] = useState(false);
const handleShowApp = () => setShowApp(true);
const [valueT, onChangeT] = useState('10:00');
    // const handleChange = (otp) => {
    //   setOTP(otp);
    // };
    const formattedDate = format(value, 'dd MMM yyyy');
    const steps = [
        'Property Details',
        'Address',
        'Rent & Deposit Details',
      ];
    const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    bedroom: ''
  });
  const [text, setText] = useState('');
  const [key, setKey] = useState('home');
  const maxWords = 100;


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
        
      };

      const renderButton = () => {
        return  <button className='resendBtn'> Resend the code</button>;
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
          setBedrrom(bedroom - 1)
        }
      };

      const incrementBthValue = () => {
        setBathroom(bathroom + 1);
      };

      const decrementBthValue = () => {
        if (bathroom > 0) {
          setBathroom(bathroom - 1)
        }
      };

     

  return (
    <div className='schedulerEvent'>
      <div className='container-fluid p-0 mrgTop-8'>
      
      <div className='topsectionProp'>
          <button type='button' className={"addProp " + styles.iconBtn} onClick={goBack}>
          {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
          <FontAwesomeIcon icon={faArrowLeft} className={`${styles.iconleftBtn}`}/>
          </button>
        
          </div>
          <div className='container'>
              <div className='row '>
                  <div className='col-12 col-md-12 listPropdPadd left-padding'>
                  <Card className='wd-100 mb-5 accCard '>
                  <Card.Header as="h1" className='p-4'>Scheduler and Events</Card.Header>
                      
                      <Card.Body>
                      <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                        
                          <div className='row justify-content-center position-relative'>
                              <div className='col-12 accDetail' >
                          
                              <Tabs
                              transition={false}
                              id="controlled-tab-example"
                              activeKey={key}
                              onSelect={(k) => setKey(k)}
                              className="mb-3"
                              
                              >
                              <Tab eventKey="home" title="All">
                                  <div className='row mb-4'>
                                    <div className='col-4'>
                                    <Form.Select aria-label="Floating label select example" className='filterImg'>
                                      <option>Property 1</option>
                                      <option value="1">Property 2</option>
                                      <option value="2">Property 3</option>
                                      <option value="3">Property 4</option>
                                      <option value="4">Property 5</option>
                                    </Form.Select>
                                    </div>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4' onClick={(event) => { handleShowNewCan(); event.stopPropagation() }}>
                                    <span className='booking-list'>
                                    <div className='col-10 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <p className='mb-0'><strong>Sumit kumar</strong></p>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='col-2 d-flex flex-column gap-2 justify-content-center p-2'>
                                      <button type="button" className='reject-btn' onClick={(event) => { handleShowNewCan(); event.stopPropagation() }}>
                                        Reject
                                      </button>
                                      <button type='button' className=' accept-btn' >
                                          Accept
                                        </button>
                                      </div>
                                      </span>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list'>
                                    <div className='col-10 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <p className='mb-0'><strong>Sumit kumar</strong></p>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='col-2 d-flex flex-column gap-2 justify-content-center p-2'>
                                      <button type="button" className='reject-btn'  onClick={(event) => { handleShowNewCan(); event.stopPropagation() }}>
                                        Reject
                                      </button>
                                      <button type='button' className=' accept-btn' >
                                          Accept
                                        </button>
                                      </div>
                                      </span>
                                  </div>
                                  <h6>Previous</h6>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list'>
                                    <div className='col-8 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <p className='mb-0'><strong>Sumit kumar</strong></p>
                                        <p className='mb-0'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='col-4 d-flex gap-4 align-items-center justify-content-end greenClr actionStatus'>
                                      Accepted
                                      </div>
                                      </span>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list'>
                                    <div className='col-8 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <p className='mb-0'><strong>Sumit kumar</strong></p>
                                        <p className='mb-0'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='col-4 d-flex gap-4 align-items-center justify-content-end redClr actionStatus'>
                                      Rejected
                                      </div>
                                      </span>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list'>
                                    <div className='col-8 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <p className='mb-0'><strong>Sumit kumar</strong></p>
                                        <p className='mb-0'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='col-4 d-flex gap-4 align-items-center justify-content-end greenClr actionStatus'>
                                      Accepted
                                      </div>
                                      </span>
                                  </div>
                              </Tab>
                              <Tab eventKey="profile" title="Accepted">
                              <div className='row mb-4'>
                                    <div className='col-4'>
                                    <Form.Select aria-label="Floating label select example" className='filterImg'>
                                      <option>Property 1</option>
                                      <option value="1">Property 2</option>
                                      <option value="2">Property 3</option>
                                      <option value="3">Property 4</option>
                                      <option value="4">Property 5</option>
                                    </Form.Select>
                                    </div>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list position-relative'>
                                    <div className='col-12 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <h3 className='mb-0'>Ankit kumar</h3>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0 date'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='accepted'>
                                       <span>Accepted</span>
                                      </div>
                                      </span>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list position-relative'>
                                    <div className='col-12 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <h3 className='mb-0'>Ankit kumar</h3>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0 date'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='accepted'>
                                      <span>Accepted</span>
                                      </div>
                                      </span>
                                  </div>
                              </Tab>
                              <Tab eventKey="contact" title="Rejected" >
                              <div className='row mb-4'>
                                    <div className='col-4'>
                                    <Form.Select aria-label="Floating label select example" className='filterImg'>
                                      <option>Property 1</option>
                                      <option value="1">Property 2</option>
                                      <option value="2">Property 3</option>
                                      <option value="3">Property 4</option>
                                      <option value="4">Property 5</option>
                                    </Form.Select>
                                    </div>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list position-relative'>
                                    <div className='col-12 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <h3 className='mb-0'>Ankit kumar</h3>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0 date'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='accepted'>
                                      <span>Rejected</span>
                                      </div>
                                      
                                      </span>
                                  </div>
                                  <div className='row pt-0 pb-0 p-3 mb-4'>
                                    <span className='booking-list position-relative'>
                                    <div className='col-12 d-flex '>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <h3 className='mb-0'>Ankit kumar</h3>
                                        <p className='mb-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desk</p>
                                        <p className='mb-0 date'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      <div className='accepted'>
                                      <span>Rejected</span>
                                      </div>
                                      </span>
                                  </div>
                              </Tab>
                              
                              </Tabs>
                          
                            
      
        
      
      
                              </div>
                          </div>
                      </form>
                      </Card.Body>
                      
                  </Card>
                  
                  </div>
                  <div className='col-6 right-padding mob-hide'>
                  
                  </div>

              </div>

          </div>
        
        <Modal
          size='sm'
          show={show}
          onHide={handleClose}     
          keyboard={false} centered >
            <Modal.Header closeButton className='border-0 pb-0'>
            
          </Modal.Header>
          <Modal.Body className='text-center p-4 pt-0 pb-2'>
            <h5>Reschedule</h5>
            <p>Are you sure you want to reschedule the appointment?</p>
            <div className='d-flex gap-3 mb-3 justify-content-around'>
            <button type="button" className='reject-btn rounded-pill' onClick={handleClose}>
                                        Yes
            </button>
            <button type='button' className=' accept-btn rounded-pill' onClick={handleClose}>
                                          No
            </button>
            </div>
            
          </Modal.Body>
          

        </Modal>
        <Modal
          size='sm'
          show={showNew}
          onHide={handleCloseNew}     
          keyboard={false} centered >
            <Modal.Header closeButton className='border-0 pb-0'>
            
          </Modal.Header>
          <Modal.Body className='text-center pt-0'>
            <h5>Rental Request Accepted</h5>
            <p className='fnt-13'>You have accepted the Booking for Property 1 for user Sumit .You cant accept any other booking for this property unless this booking is rejected. Please process to the contract module for completing the Contract Processes. The Prospective Tennant Sunny will be informed that the booking is accepted</p>
            <div className='d-flex gap-3 mb-3 justify-content-around'>
            <button type="button" className='reject-btn rounded-pill' onClick={handleCloseNew}>
                                        Yes
            </button>
            <button type='button' className=' accept-btn rounded-pill' onClick={handleCloseNew}>
                                          No
            </button>
            </div>
            
          </Modal.Body>
          

        </Modal>
        <Offcanvas show={showNewCan} onHide={handleCloseNewCan} placement={'end'} backdrop={false} className="bg-white">
          <Offcanvas.Header closeButton className='addPropModal'>
            <Offcanvas.Title >
            {
              !showApp &&
              <h5>Appointment Detail</h5>
            }
            {
              showApp &&
              <h5>Reject Viewing Request</h5>
            }
              
            </Offcanvas.Title>
            
          </Offcanvas.Header>
          
          <Offcanvas.Body>
          
            {/* Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc. */}
            { !showApp &&
              <div className='row mb-3'>
            <div className='col-12 text-center mb-3'>
                  <Image src={profilePic} alt='profile' className='img-fluid appProf' />
                  </div>
                  <div className='col-12 appDateDiv'>
                  <small>Date/ Time Of Appointment</small>
                  <p className='mb-0'><strong>12 April 2023, 12:30 pm</strong></p>
                  </div>
                  <div className='col-12 mt-3'>
                  <p className='mb-0 fnt-13 text-black-50'>Name</p>
                  <p className='mb-0'><strong>Sumit Gupta</strong></p>
                  </div>
                  <div className='col-12 mt-3'>
                  <p className='mb-0 fnt-13 text-black-50'>Phone Number</p>
                  <p className='mb-0'><strong>+91 888 666 5656</strong></p>
                  </div>
                  <div className='col-12 mt-3'>
                  <p className='mb-0 fnt-13 text-black-50'>Email Address</p>
                  <p className='mb-0'><strong>abc@gmail.com</strong></p>
                  </div>
                  <div className='col-12 mt-3 mb-4'>
                  <p className='mb-0 fnt-13 text-black-50'>User address</p>
                  <p className='mb-0'><strong>M-64, West Patel Nagar, Delhi, 110008</strong></p>
                  </div>
                  <hr></hr>
                  <div className='d-flex gap-4'>
                  <button type="button" className='addreSIgn skip-btn'  >Accept</button>
                  <button type="button" className='addreSIgn signup-btn' onClick={handleShowApp} >Reject</button>
                  </div>
            </div>
            }
            
            {
              showApp && 
              <div className='row '>
                                    
                                  <div className='row'>
                                  <span className='booking-list position-relative'>
                                  <div className='col-10 d-flex p-0'>
                                    <Image src={profilePic} alt='profile' className='img-fluid bookProfil' />
                                        <div>
                                        <h3 className='mb-0'>Ankit kumar</h3>
                                        <p className='mb-0 fnt-13'>August 7, 2021 12:30 pm</p>
                                        </div>
                                        
                                      </div>
                                      
                                      <div className='col-2 p-0 d-flex align-items-center justify-content-end'>
                                      <Image src={rightIcon} alt='profile' className='img-fluid' />
                                      </div>
                                      </span>
                                  </div>
                                    
                                      
                                      <div className='row'>
                                      <div className='col-12 mt-3 p-0'>
                                      
                                      <Form >
                                      {['radio'].map((type) => (
                                          <div key={`inline-${type}`} className="mb-3 d-flex gap-2 align-items-center radios">
                                          <label>Time does not work</label>
                                          <Form.Check
                                              inline
                                              
                                              name="group1"
                                              type={type}
                                              id={`inline-${type}-1`}
                                              
                                          />
                                          <label>Property not available</label>
                                          <Form.Check
                                              inline
                                              
                                              name="group1"
                                              type={type}
                                              id={`inline-${type}-2`}
                                          />
                                          
                                          </div>
                                      ))}
                                      </Form>
                                      </div>
                                      </div>
                                      
                                      
                                      <div className='row justify-content-between'>
                                      <p className='mb-3'><strong>Time Slot</strong></p>
                                      <div className='col-5 borderTime'>
                                      <label>From</label> <br></br>
                                      <TimePicker onChange={onChangeT} value={valueT} clockIcon={null} clearIcon={false} />
                                      </div>
                                      <div className='col-5 borderTime'>
                                      <label>To</label> <br></br>
                                      <TimePicker onChange={onChangeT} value={valueT} clockIcon={null} clearIcon={false} />
                                      </div>
                                      </div>
                                      <div className='row '>
                                      <div className='col-12 p-0'>
                                      <label className='dtLabel'>Date</label>
                                      <DatePicker onChange={onChange} value={value} format="d MMM yyyy"/>
                                      </div>
                                      
                                      </div>
                                      <div className='row mt-3'>
                                      <div className='col-12 p-0'>
                                      <Form.Control as="textarea" rows={3} placeholder='Reason'/>
                                      </div>
                                      <button type="button" className='addreSIgn signup-btn mt-3' onClick={handleShow} >Send</button>
                                      </div>
                                      
                                  </div>
              
            }
            

            
            

            
                      
                    
                    
                  
            
          </Offcanvas.Body>
          
        </Offcanvas>
      </div>
    </div>
  );
};

export default SchedulerEvent;
