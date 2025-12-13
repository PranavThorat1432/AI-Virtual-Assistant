import React, { useContext, useRef, useState } from 'react'
import Card from '../Components/Card'
import image1  from '../assets/image1.png'
import image2  from '../assets/image2.jpg'
import authBg  from '../assets/authBg.png'
import image4  from '../assets/image4.png'
import image5  from '../assets/image5.png'
import image6  from '../assets/image6.jpeg'
import image7  from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../ContextAPI/userContext'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Customize = () => {

    const inputImage = useRef();
    const navigate = useNavigate();

    const {serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage} = useContext(userDataContext);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

  return (
    <div className='w-full h-screen bg-linear-to-t from-black to-[#040461] flex justify-center items-center flex-col p-5'>
        <IoIosArrowRoundBack className='absolute top-7 left-7 text-white w-12 h-12 cursor-pointer' onClick={() => navigate('/')}/>

        <h1 className='text-white text-[30px] text-center font-semibold mb-10'>Select Your <span className='text-blue-300'>Assistant Image</span></h1>

        <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
            <Card image={image1}/>
            <Card image={image2}/>
            <Card image={authBg}/>
            <Card image={image4}/>
            <Card image={image5}/>
            <Card image={image6}/>
            <Card image={image7}/>

            <div className={`w-20 h-40 lg:w-[150px] lg:h-[250px] bg-[#030326] border border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900 cursor-pointer hover:border-2 hover:border-white flex items-center justify-center ${selectedImage == 'input' ? 'border-2 border-white shadow-2xl shadow-blue-900' : ''}`} onClick={() => {inputImage.current.click(); setSelectedImage('input')}}>
                {!frontendImage ? 
                    <RiImageAddLine className='text-white w-7 h-7 '/>
                    : <img src={frontendImage} alt="" className='h-full object-cover'/>
                }
            </div>

            <input type="file" accept='image/*' hidden ref={inputImage} onChange={handleImage}/>

        </div>
        
        {selectedImage && 
            <button className='min-w-[150px] h-[60px] bg-white rounded-full cursor-pointer font-semibold text-[19px] mt-6' onClick={() => navigate('/customize2')}>Next</button>
        }
    </div>
  )
}

export default Customize
