import React, { useContext, useState } from 'react'
import bg from '../assets/authBg.png'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../ContextAPI/userContext';
import axios from 'axios';

const Signup = () => {

  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {serverUrl, userData, setUserData} = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {name, email, password}, { 
        withCredentials: true
      });

      setUserData(result.data);
      setLoading(false);
      navigate('/customize');

    } catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(true);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='w-full h-screen bg-cover flex justify-center items-center' style={{backgroundImage: `url(${bg})`}}>
        <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000070] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-5 px-5' onSubmit={handleSignup}> 
          <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-400'>Virtual Assistant</span></h1>

          <input type="text" placeholder='Name' className='w-full h-[60px] outline-none border border-white bg-transparent text-white placeholder:text-gray-400 px-5 rounded-2xl text-[18px]' required onChange={(e) => setName(e.target.value)} value={name}/>

          <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border border-white bg-transparent text-white placeholder:text-gray-400 px-5 rounded-2xl text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email}/>

          <div className='w-full h-[60px] relative'>
            <input type={showPass ? 'text' : 'password'} placeholder='Password' className='w-full h-[60px] outline-none border border-white bg-transparent text-white placeholder:text-gray-400 px-5 rounded-2xl text-[18px]' required onChange={(e) => setPassword(e.target.value)} value={password}/>

            {!showPass ? 
              <IoEye className='absolute top-5 right-5 text-white cursor-pointer w-5 h-5' onClick={() => setShowPass(!showPass)}/>
              : <IoEyeOff className='absolute top-5 right-5 text-white cursor-pointer w-5 h-5' onClick={() => setShowPass(!showPass)}/>
            }
          </div>
          
          {error.length > 0 && <p className='text-red-600 font-semibold'>*{error}</p>}

          <button className='min-w-[150px] h-[60px] bg-white rounded-full cursor-pointer font-semibold text-[19px] mt-6' disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>

          <p className='text-white text-[17px]'>Already have an account? <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
        </form>
    </div>
  )
}

export default Signup
