import React, { useContext } from 'react'
import { userDataContext } from '../ContextAPI/userContext';

const Card = ({image}) => {

    const {serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage, setFrontendImage, selectedImage, setSelectedImage} = useContext(userDataContext);

  return (
    <div className={`w-20 h-40 lg:w-[150px] lg:h-[250px] bg-[#030326] border border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900 cursor-pointer hover:border-2 hover:border-white ${selectedImage == image ? 'border-2 border-white shadow-2xl shadow-blue-900' : ''}`} onClick={() => {setSelectedImage(image); setBackendImage(null); setFrontendImage(null)}}>
        <img src={image} alt="" className='h-full object-cover'/>
    </div>
  )
}

export default Card
