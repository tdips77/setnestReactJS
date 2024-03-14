import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from 'next/link'
import uploadIcon from '../../../public/assets/upload-icon.svg'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Image from 'next/image'




function AddCategory(props) {
    const [categoryImage, setcategoryImage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const onHandleChange = (e) => {
    setCategoryType(e.target.value);
    if(e.target.value === "other"){
      setOpenAddNewCategory(true)
    }
    else{
      setOpenAddNewCategory(false)
    }
  }
    const handleImageChange = (e) => {
    
        const files = Array.from(e.target.files);
    
        const newcategoryImage = files.map((file) => ({
          file,
          id: Math.random().toString(),
          progress: 0,
        }));
    
        setcategoryImage((prevcategoryImage) => [
          ...prevcategoryImage,
          ...newcategoryImage,
        ]);
    
        newcategoryImage.forEach(uploadImage);
      };
    
      const uploadImage = (image) => {
        const { file, id } = image;
        const formData = new FormData();
        formData.append("image", file);
    
        const interval = setInterval(() => {
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [id]: prevProgress[id] >= 100 ? 100 : prevProgress[id] + 10,
          }));
        }, 1000);
    
        setTimeout(() => {
          clearInterval(interval);
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [id]: 100,
          }));
        }, 5000);
      };
    
      const handleDeleteImage = (id) => {
        setcategoryImage((prevcategoryImage) =>
          prevcategoryImage.filter((image) => image.id !== id),
        );
        setUploadProgress((prevProgress) => {
          const updatedProgress = { ...prevProgress };
          delete updatedProgress[id];
          return updatedProgress;
        });
      };
    return (
        <Offcanvas show={props.show} onHide={props.handleClose} placement={props.placement} backdrop={props.backdrop}>
        <Offcanvas.Header closeButton className='addPropModal'>
          <Offcanvas.Title >Add Category

          </Offcanvas.Title>

        </Offcanvas.Header>

        <Offcanvas.Body>

          {/* Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc. */}
          <FloatingLabel controlId="floatingSelect" label="Select Category" className='mb-3'>
            <Form.Select aria-label="Select Category" onChange={onHandleChange}>
              <option>Select</option>
              {props?.categories && props?.categories.map((item, index) => {
                return (
                  <option value={item?.title} key={index}>{item?.title}</option>
                )
              })}
              <option value="other">Other</option>
            </Form.Select>
          </FloatingLabel>
          {props?.openAddNewCategory && 
            <FloatingLabel
              controlId="floatingInput"
              label="Add New Category"
              className='mb-3'
            >
              <Form.Control type="text" />
            </FloatingLabel>
          }
          <small><strong>Bar Images</strong></small>
          <Form.Group controlId="formFile" className="mb-3 upload-fle-div">
            <p className='mb-0'> <Image src={uploadIcon} alt='upload' className='img-fluid' /> Browse Images</p>
            <Form.Label className='upload-fle'>Upload</Form.Label>
            <Form.Control type="file" hidden name="categoryImage" onChange={handleImageChange}/>
          </Form.Group>
          <hr></hr>
          {/* Multi Image Upload */}
          <div>
        {categoryImage.map((image) => (
          <div key={image.id}>
            <img
              src={URL.createObjectURL(image.file)}
              alt="uploaded"
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
            <progress value={uploadProgress[image.id]} max="100" />
            <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
          </div>
        ))}
      </div>
          {/* Multi Image Upload */}
          <div className='mod-btm'>
            <button type="button" className='addreSIgn signup-btn'  >Add</button>
          </div>
        </Offcanvas.Body>

      </Offcanvas>
    );
}

export default AddCategory;