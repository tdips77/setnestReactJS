import React, { useEffect } from "react";
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
import editIcon from "../../../public/assets/editIcon.png";
import two from "../../../public/assets/my-property/3d-electric-car-building-1.png";
import listed from "../../../public/assets/my-property/listed.svg";
import notice from "../../../public/assets/my-property/notice.svg";
import rented from "../../../public/assets/my-property/rented.svg";
import draft from "../../../public/assets/my-property/draft.svg";
import activited from "../../../public/assets/my-property/activeted.svg";

import Image from "next/image";
// import OTPInput,  {ResendOTP } from "otp-input-react";
import Link from "next/link";
import * as yup from "yup";
import axiosInstance from "pages/api/axios-config";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confpassword: yup.string().required().min(6),
});

const MyProperty = () => {
  // const [OTP, setOTP] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [listProperty, setListProperty] = useState();
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    propertyListing();
  }, [propertyType]);

  const propertyListing = async () => {
    try {
      const response = await axiosInstance.get(
        `listings/listerPropertiesByStatus?status=${propertyType}`
      );
      // Handle successful response
      console.log("rsssssssssssss......", response.data.data);
      setListProperty(response.data.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error; // Rethrow error or handle it appropriately
    }
  };

  const handleChangePropertyType = (e) => {
    setPropertyType(e.target.value);
  };

  const onHandleRoute = (e) => {
    console.log("item", e);
    if(e.availability === "draft"){
      router.push({
        pathname: "/propertyDetails",
        query:{
          id: e.id
        }
      })
    }

  }

  return (
    <div className="container-fluid  p-0">
      <div className="topsectionProp">
        <button type="button" className={`${styles.iconBtn}`} onClick={goBack}>
          {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`${styles.iconleftBtn}`}
          />
        </button>
      </div>

      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12  myPropHead" fixed="top">
            <div className="container">
              <h4>My Property</h4>
              <div className="row justify-content-between">
                <div className="col-6 col-md-3">
                  <Form.Select
                    aria-label="Floating label select example"
                    className="filterImg"
                    onChange={handleChangePropertyType}
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="rented">Rented</option>
                    <option value="draft">Draft</option>
                  </Form.Select>
                </div>

                <div className="col-6 col-md-3 text-end">
                  <Link href={"/listProperty"}>
                    <button className="addPropBtn" type="button">
                      Add Property
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mrg-13em">
            <div className="container">
              <ul className="property-list p-0">
                {listProperty && listProperty.map((item, index) =>{
                  return(
                      <li key={index} onClick={() => {onHandleRoute(item)}}>
                        <span>4.5</span>
                        <Image src={item?.image_url ? item?.image_url : two} alt="one" width={251} height={201} />
                        <Image src={item?.availability === "rented" ? rented : item?.availability === "active" ? activited : item?.availability === "draft" ? draft : notice} className="bgBanner" alt="bg" />
                        <div className="row">
                          <div className="col-8">
                            <h6>{item?.name}</h6>
                            <p>{item?.unit}, {item?.street}, {item?.landmark}, {item?.city}, {item?.postal_code}</p>
                            <p>Wifi / AC/</p>
                          </div>
                          <div className="col-4">
                            <h5 className="text-end">${item?.rent}</h5>
                          </div>
                        </div>
                      </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProperty;
