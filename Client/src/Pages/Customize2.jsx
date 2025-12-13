import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../ContextAPI/userContext';
import axios from 'axios';
import { IoIosArrowRoundBack } from "react-icons/io";

const Customize2 = () => {

    const {userData, serverUrl, backendImage, selectedImage,setUserData} = useContext(userDataContext);

    const [assistantName, setAssistantName] = useState(userData?.assistantName || '');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpdateAssistant = async () => {
        setLoading(true);

        try {
            let formData = new FormData();
            formData.append('assistantName', assistantName);
            if(backendImage) {
                formData.append('assistantImage', backendImage);
            } else {
                formData.append('imageUrl', selectedImage);
            }

            const result = await axios.post(
                `${serverUrl}/api/user/update-assistant`, 
                formData, 
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setLoading(false);
            console.log(result.data);
            setUserData(result.data);

        } catch (error) {
            setLoading(false);
            console.error('Error updating assistant:', error);
        }
    };
    

  return (
    <div className='w-full h-screen bg-linear-to-t from-black to-[#040461] flex justify-center items-center flex-col p-5 relative'>
        <IoIosArrowRoundBack className='absolute top-7 left-7 text-white w-12 h-12 cursor-pointer' onClick={() => navigate('/customize')}/>

        <h1 className='text-white text-[30px] text-center font-semibold mb-10'>Enter Your <span className='text-blue-300'>Assistant Name</span></h1>

        <input type="text" placeholder='e.g., Shifra' className='w-full max-w-[600px] h-[60px] outline-none border border-white bg-transparent text-white placeholder:text-gray-400 px-5 rounded-2xl text-[18px]' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName}/>

        {assistantName && 
            <button className='min-w-[300px] h-[60px] bg-white rounded-full cursor-pointer font-semibold text-[19px] mt-6' onClick={() => {handleUpdateAssistant(); navigate('/')}} disabled={loading}>{!loading ? 'Create Your Assistant' : 'Loading...'}</button>
        }
    </div>
  )
}

export default Customize2
