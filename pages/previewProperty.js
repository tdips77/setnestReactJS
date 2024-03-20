import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PreviewProperty from '@/component/InputField/PreviewProperty';
import Header from '@/component/InputField/Header';
import axiosInstance from './api/axios-config';
const PreviewPropertyPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({})
  const router =  useRouter();
  const propertyId = router.query.id;

  useEffect(() => {
    if(router.query.id){
      getPropertyDetails()
    }
  },[router.query.id])

  const getPropertyDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `listings/propertyDetails?id=${propertyId}`
      );
      // Handle successful response
      console.log("utilites", response.data.data);
      setPropertyDetails(response.data.data)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error; // Rethrow error or handle it appropriately
    }
  }
  

  return (
    <div>
    <Header />
    <PreviewProperty propertyDetails={propertyDetails}></PreviewProperty>
    </div>
  );
};

export default PreviewPropertyPage;
