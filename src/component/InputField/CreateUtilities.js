import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Home.module.css';

import Image from 'next/image'
import Modal from 'react-bootstrap/Modal';
import uploadBtnIcon from '../../../public/assets/my-property/upload.svg';
import plusCatg from '../../../public/assets/my-property/plus-uti.svg';
import noutil from '../../../public/assets/my-property/no-utility.svg';
import washDish from '../../../public/assets/my-property/washing-dishes.svg';
import ac from '../../../public/assets/my-property/air-conditioner.svg';
import deleteIcon from '../../../public/assets/delete-icon.svg';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link'
import uploadIcon from '../../../public/assets/upload-icon.svg'

import OtpInput from 'react-otp-input';


import * as yup from 'yup';
import axiosInstance from 'pages/api/axios-config';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const CreateUtilities = ({ name, ...props }) => {
  const router = useRouter();

    const [show, setShow] = useState(false);
    const [showUti, setShowUti] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleShowUti = () => setShowUti(true);
const [listUtilites, setListUtilites] = useState();
const [showName, setShowName] = useState(false)
const [utilitesForm, setUtilitesForm] = useState({
  brand: "",
  description: "",
  image_url: "",
  location: "",
  utilityName: "",
});
   
    const [showOTP, setshowOTP] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
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

      useEffect(()=>{
        if(router.query.id){
          getUtils()
        }
      },[router.query.id])

      const getUtils = async () => {
        try {
          const response = await axiosInstance.get(
            `listings/getCUT?type=utility&listingId=${router.query.id}`
          );
          // Handle successful response
          console.log("utilites", response.data.data);
          setListUtilites(response.data.data);
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw error; // Rethrow error or handle it appropriately
        }
      }

      const handleDelet = async (id) => {
        console.log("ID", id);
        const params = {
          utilityId: id
        }
        try {
          const response = await axiosInstance.delete(
            `listings/deleteCUT`, 
            { data: params }
          );
          // Handle successful response
          console.log("utilites", response);
          if(response.status === 200){
            getUtils();
          }
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw error; // Rethrow error or handle it appropriately
        }
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilitesForm({
          ...utilitesForm,
          [name]: value
        });
        console.log("CHeck", {
          ...utilitesForm,
          [name]: value
        });
      }

      const handleCreateUtilites = async () => {
        console.log("Fpr", utilitesForm);
        try {
          const response = await axiosInstance.post(
            `listings/utilities`, {...utilitesForm, listingId: router.query.id}
          );
          // Handle successful response
          console.log("utilites", response);
          if(response.status === 201){
            getUtils();
            setShow(false)
          }
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw error; // Rethrow error or handle it appropriately
        }
      }

      const handleSelect = (e) => {
        console.log("Select", e.target.value);
        if(e.target.value === "Others"){
          setShowName(true)
        }
        else{
          setShowName(false)
        }
      }

      const handleNext = (e) => {
        router.push({
          pathname: "/termsCondition",
          query: { id: router.query.id },
        })
      }
  

  return (
    <div className='container-fluid p-0 mrgTop-8 '>
       <div className='topsectionProp'>
        <button type='button' className={"addProp " + styles.iconBtn} onClick={goBack}>
        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
        <FontAwesomeIcon icon={faArrowLeft} className={`${styles.iconleftBtn}`}/>
        </button>
       
        </div>
        <div className='container hght-85'>
            <div className='row '>
                <div className='col-12 col-md-8'>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-3 wd-100'>
                    <h5 className='mb-4'>Create Utilities</h5>
                    
        <div className='col-12'>

            <button type="button" className=' createuti' onClick={handleShow} > <Image src={plusCatg} alt='add' className='plus-uti img-fluid' /> 
           {!showUti &&
           <span>Add Utility</span> }
           {showUti &&
           <span>Create Utility</span> }
            </button>

         </div>
         {
          listUtilites?.length < 0 &&
        <div className='col-12 mt-3'>
            <small><strong>Utility List</strong></small>
            <div className='text-center mt-3 mb-3 no-list-uti'>
            <Image src={noutil} alt='add' className='img-fluid' />
            <p>You have created no utilities</p>
            </div>
        </div>
         }
         {
          listUtilites?.length > 0 &&
        <div className='col-12 mt-3'>
            <small><strong>Utility List</strong></small>
            <ul className='p-0 mt-3'>
              {listUtilites.map((item, index)=>{
                return(
                  <li className='util-list'>
                  <span className='img-holdUti'>
                        <Image src={item.image_url} alt='washdish' className='img-fluid'width={54} height={54} />
                    </span>
                    <span>
                      <p className='mb-0'><small><strong>{item.utility_name}</strong></small></p>
                    
                    <span className='branding'>Brand: {item.brand}</span>
                    <p className='mb-0 para'>{item.description}</p>
                    
                    </span>
                    <span><Image src={deleteIcon} alt='deleteIcon' className='img-fluid' onClick={()=>{handleDelet(item.id)}}/></span>
                  </li>
                )
              })}
              
            </ul>
        </div>
         }
        
        
        
      <div className='row btm-row'>
        
        <div className='col-6 col-md-3'>
        
            <button type="button" className='skip-btn' onClick={(e) => setshowOTP(true)} >Save & Exit</button>
            
            </div>
        
        
        <div className='col-6 col-md-3'>
        {
          listUtilites?.length < 0 &&
            <button type="button" className='addreSIgn signup-btn' onClick={handleShowUti} >Next</button>
        }
         {
          listUtilites?.length > 0 &&
          // <Link href="/termsCondition">
            <button type="button" className='addreSIgn signup-btn' onClick={handleNext}>Next</button>
            // </Link>
        }
            </div>
        
      
      </div>
        
      </form>
                </div>
                <div className='col-3 right-padding mob-hide'>
               
                </div>

            </div>

        </div>
        
      <Offcanvas show={show} onHide={handleClose} placement={'end'} backdrop={false}>
        <Offcanvas.Header closeButton className='addPropModal'>
          <Offcanvas.Title >Create Utility
            
          </Offcanvas.Title>
          
        </Offcanvas.Header>
        
        <Offcanvas.Body>
        
          {/* Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. */}
          <div className='row mb-3'>
                <div className='col-3'>
                <span className='img-hold'>
                    <Image src={washDish} alt='washdish' className='img-fluid' />
                </span>
                </div>
                <div className='col-9'>
                <FloatingLabel controlId="floatingSelect" label="Select Category" >
                    <Form.Select aria-label="Select Category" onChange={handleSelect}>
                      {listUtilites?.map((item, id) => {
                        return(
                          <option key={id} value={item.utility_name}>{item.utility_name}</option>
                        )
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </div>
          </div>
          {showName && 
          <div className='row mb-3'>
                <div className='col-12'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Utilites Name"
                  >
                    <Form.Control type="text" name="utilityName" value={utilitesForm.utilityName} onChange={handleChange}/>
                  </FloatingLabel>
                </div>
           </div>
          }
          
           <div className='row mb-3'>
                <div className='col-12'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Location"
                    
                  >
                    <Form.Control type="text" onChange={handleChange} name="location" value={utilitesForm.location} />
                  </FloatingLabel>
                </div>
           </div>

           <div className='row mb-3'>
                <div className='col-12'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Brand"
                    
                  >
                    <Form.Control type="text" onChange={handleChange} name="brand" value={utilitesForm.brand}/>
                  </FloatingLabel>
                </div>
           </div>
           <div className='row mb-3'>
                <div className='col-12'>
                <Form.Control as="textarea" rows={4} placeholder='Add Descriptions'
                onChange={handleChange} name="description" value={utilitesForm.description}
                />
                </div>
           </div>

           
                    
                  
                  
                 
          <div className='mod-btm'>
          <button type="button" className='addreSIgn signup-btn'  onClick={handleCreateUtilites}>Create</button>
          </div>
        </Offcanvas.Body>
        
      </Offcanvas>
    </div>
    
  );
};

export default CreateUtilities;
