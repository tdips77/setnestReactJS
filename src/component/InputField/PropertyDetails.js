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

import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import uploadBtnIcon from "../../../public/assets/my-property/upload.svg";
import plusCatg from "../../../public/assets/my-property/plus-uti.svg";
import noutil from "../../../public/assets/my-property/no-utility.svg";
import washDish from "../../../public/assets/my-property/13-smoking.svg";
import ac from "../../../public/assets/my-property/no-pets-allowed.svg";
import deleteIcon from "../../../public/assets/delete-icon.svg";
import rightIcon from "../../../public/assets/my-property/right-icon.svg";
import bed from "../../../public/assets/my-property/prop-detail-bed.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";

const PropertyDetails = (props) => {
  const propertyDetails = props.propertyDetails;
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const handleNext = () => {
    router.push({
      pathname: '/previewProperty',
      query:{
        id: propertyDetails.id
      }
    })
  }
  return (
    <div className="container-fluid p-0 mrgTop-8 ">
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
      <div className="container hght-85">
        <div className="row ">
          <div className="col-12 col-md-8 mb-5">
            <div className="mb-3 wd-100">
              <h5 className="mb-4">Property Details</h5>

              <div className="col-12 prop-detail">
                <p className="mb-0">
                  <small>
                    <strong>{propertyDetails.name}</strong>
                  </small>
                </p>
                <p className="mb-0">
                  <small>
                    <strong>
                      {propertyDetails.unit}, {propertyDetails.street},{" "}
                      {propertyDetails.landmark}, {propertyDetails.city},{" "}
                      {propertyDetails.state}, {propertyDetails.postal_code}
                    </strong>
                  </small>
                </p>
                <p className="mb-0 branding">
                  {propertyDetails.bedroom} Bedroom . {propertyDetails.bathroom}{" "}
                  Bathroom
                </p>
                <p className="mb-0">
                  <small>{propertyDetails.description}</small>
                </p>
                <span className="propRight-icon">
                  <Image src={rightIcon} alt="washdish" className="img-fluid" />
                </span>
              </div>

              <div className="col-12 prop-detail">
                <p>
                  <small>
                    <strong>All Images</strong>
                  </small>
                </p>
                <span className="img-grid-prop details-category-img">
                  {propertyDetails?.categories?.map((item, index) => {
                    return (
                      <Image
                        src={item.banner_image}
                        alt="washdish"
                        className="img-fluid"
                        width={100}
                        height={100}
                      />
                    );
                  })}
                  {/* <Image src={bed} alt='washdish' className='img-fluid' />
        <Image src={bed} alt='washdish' className='img-fluid' /> */}
                </span>

                <span className="propRight-icon">
                  <Image src={rightIcon} alt="washdish" className="img-fluid" />
                </span>
              </div>

              <div className="col-12 mt-3 prop-detail">
                <small>
                  <strong>All Utillities</strong>
                </small>
                <ul className="p-0 mt-3">
                  {propertyDetails?.utilities?.map((item, index) => {
                    return (
                      <li className="tnc-list">
                        <span>
                          <Image
                            src={item?.image_url}
                            alt="washdish"
                            className="img-fluid"
                            width={38}
                            height={38}
                          />
                        </span>
                        <span>
                          <p className="mb-0">
                            <small>
                              <strong>{item.utility_name}</strong>
                            </small>
                          </p>

                          <p className="mb-0 para">{item.description}</p>
                        </span>
                        <span>
                          <Image
                            src={deleteIcon}
                            alt="deleteIcon"
                            className="img-fluid"
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <span className="propRight-icon">
                  <Image src={rightIcon} alt="washdish" className="img-fluid" />
                </span>
              </div>
              <div className="col-12 prop-detail">
                <p className="mb-0">
                  <small>
                    <strong>Rent Details</strong>
                  </small>
                </p>

                <p className="mb-0">
                  <small>Monthly rent</small>
                </p>
                <p className="mb-0">
                  <small>₹ {propertyDetails.rent}</small>
                </p>
                <span className="propRight-icon">
                  <Image src={rightIcon} alt="washdish" className="img-fluid" />
                </span>
              </div>
              <div className="col-12 mt-3 prop-detail">
                <small>
                  <strong>Term of the Places</strong>
                </small>
                <ul className="p-0 mt-3">
                  {propertyDetails?.terms?.map((item, index)=>{
                    return(
                    <li className="tnc-list">
                      <span>
                        <Image
                          src={item.image_url}
                          alt="washdish"
                          className="img-fluid"
                          width={38}
                          height={38}
                        />
                      </span>
                      <span>
                        <p className="mb-0">
                          <small>
                            <strong>{item.title}</strong>
                          </small>
                        </p>

                        <p className="mb-0 para">
                          {item.description}
                        </p>
                      </span>
                      <span>
                        <Image
                          src={deleteIcon}
                          alt="deleteIcon"
                          className="img-fluid"
                        />
                      </span>
                    </li>
                    )
                  })}
                  
                </ul>
                <span className="propRight-icon">
                  <Image src={rightIcon} alt="washdish" className="img-fluid" />
                </span>
              </div>

              <div className="footer">
                <div className="container">
                  {/* <Link href="/previewProperty"> */}
                    <button
                      type="button"
                      className="addreSIgn signup-btn btn-width"
                      onClick={handleNext}
                    >
                      Save And Preview
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 right-padding mob-hide"></div>
        </div>
      </div>

      {/* <Offcanvas show={show} onHide={handleClose} placement={'end'} backdrop={false}>
        <Offcanvas.Header closeButton className='addPropModal'>
          <Offcanvas.Title >Create Terms & Conditions
            
          </Offcanvas.Title>
          
        </Offcanvas.Header>
        
        <Offcanvas.Body>
        
          
          <div className='row mb-3'>
                <div className='col-3'>
                <span className='img-hold'>
                    <Image src={washDish} alt='washdish' className='img-fluid' />
                </span>
                </div>
                <div className='col-9'>
                <FloatingLabel controlId="floatingSelect" label="Select Terms" >
                    <Form.Select aria-label="Select Terms" onChange={handleSelect}>
                      <option value="1">No Smoking</option>
                      <option value="2">No Pets</option>
                      <option value="3">Other</option>
                      
                    </Form.Select>
                  </FloatingLabel>
                </div>
          </div>
          {
            showInp && 
            <div className='row mb-3'>
                <div className='col-12'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Term's Name"
                    
                  >
                    <Form.Control type="text" />
                  </FloatingLabel>
                </div>
           </div>
          }
           

          
           <div className='row mb-3'>
                <div className='col-12'>
                <Form.Control as="textarea" rows={4} placeholder='Add Descriptions'/>
                </div>
           </div>

           
                    
                  
                  
                 
          <div className='mod-btm'>
          <button type="button" className='addreSIgn signup-btn'  >Create</button>
          </div>
        </Offcanvas.Body>
        
      </Offcanvas> */}
    </div>
  );
};

export default PropertyDetails;
