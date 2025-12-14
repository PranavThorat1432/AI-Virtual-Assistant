import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../ContextAPI/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ai from '../assets/ai.gif';
import user from '../assets/user.gif';
import { CgMenuRight } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";

const Home = () => {

  const {userData, serverUrl, setUserData, getGeminiResponse} = useContext(userDataContext);
  const navigate = useNavigate();

  const [ham, setHam] = useState(false);
  const [userText, setUserText] = useState('');
  const [aiText, setAIText] = useState('');
  const [listening, setListening] = useState(false);
  const isSpeaking = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials: true});
      setUserData(null);
      navigate('/login');

    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  const startRecognition = () => {
    if(!isSpeaking.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
        console.log('Recognition requested to start')
  
      } catch (error) {
        if(error.name !== 'InvalidStateError') {
            console.error('Start Error: ', error);
        }
      }

    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    const voices = synth.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if(hindiVoice) {
      utterance.voice = hindiVoice;
    }

    isSpeaking.current = true;
    utterance.onend = () => {
      setAIText('');
      isSpeaking.current = false;
      setTimeout(() => {
        startRecognition();
      }, 800);
    }
    synth.cancel();
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if(type === 'google_search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
      
    } else if(type === 'calculator_open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
      
    } else if(type === 'instagram_open') {
      window.open(`https://www.instagram.com/`, '_blank');
      
    } else if(type === 'whatsapp_open') {
      window.open(`https://www.whatsapp.com/`, '_blank');
      
    } else if(type === 'weather_show') {
      window.open(`https://www.google.com/search?q=weather`, '_blank');

    } else if(type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    let isMounted = true;

    const startTimeout = setTimeout(() => {
      if(isMounted && !isSpeaking.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log('Recognition requested to start')

        } catch (error) {
          if(error.name !== 'InvalidStateError') {
            console.error(error);
          }
        }
      }
    }, 1000);

    // const safeRecognition = () => {
    //   if(!isSpeaking.current && !isRecognizingRef.current) {
    //     try {
    //       recognition.start();
    //       console.log('Recognition requested to start');

    //     } catch (error) {
    //       if(error.name !== 'InvalidStateError') {
    //         console.error('Start Error: ', error);
    //       }
    //     }
    //   }
    // };

    recognition.onstart = () => {
      // console.log('Recognition Started');
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      // console.log('Recognition Ended');
      isRecognizingRef.current = false;
      setListening(false);

      if(isMounted && !isSpeaking.current) {
        setTimeout(() => {
          if(isMounted) {
            try {
              recognition.start();
              console.log('Recognition Restarted');

            } catch (error) {
              if(error.name !== 'InvalidStateError') {
                console.error(error);
              }
            }
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Recognition Error: ', event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if(event.error !== 'aborted' && isMounted && !isSpeaking.current) {
        setTimeout(() => {
          if(isMounted) {
            try {
              recognition.start();
              console.log('Recognition Restarted after error');

            } catch (error) {
              if(error.name !== 'InvalidStateError') {
                console.error(error);
              }
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (event) => {
      const { resultIndex, results } = event;
      const transcript = results[resultIndex][0].transcript.trim();
      // if (transcript.length) {
      //   console.log('Heard:', transcript);
      // }

      if(transcript.toLowerCase().includes(userData?.user.assistantName.toLowerCase())) {
        setAIText('');
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAIText(data.response);
        setUserText('');
      }
    };


      const greeting = new SpeechSynthesisUtterance(`Hello, ${userData?.user?.name}, How can I help you?`);
      greeting.lang = 'hi-IN';
      
      synth.speak(greeting);
      
      console.log(userData?.user?.name)

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };

  }, []); 

  return (
    <div className='w-full h-screen bg-linear-to-t from-black to-[#020244] flex justify-center items-center flex-col gap-5 relative overflow-hidden'>
      {/* Modern Hamburger Button */}
      <button 
        className={`lg:hidden fixed top-6 right-6 z-50 w-14 h-14 rounded-2xl backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ${ham ? 'bg-white/5 rotate-180' : 'bg-white/10 hover:bg-white/20'}`}
        onClick={() => setHam(!ham)}
        aria-label={ham ? 'Close menu' : 'Open menu'}
      >
        <div className='relative w-6 h-6 flex items-center justify-center'>
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${ham ? 'rotate-45' : '-translate-y-1.5'}`}></span>
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${ham ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${ham ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </div>
      </button>

      {/* Glassmorphic Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-500 ease-in-out ${ham ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:hidden`}
        onClick={() => setHam(false)}
      ></div>

      {/* Modern Glassmorphic Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl shadow-2xl z-50 p-6 flex flex-col transition-all duration-500 ease-in-out transform-gpu ${ham ? 'translate-x-0' : 'translate-x-full'} lg:hidden border-l border-white/10`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)'
        }}
      >
        {/* Menu Header */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 text-2xl font-bold'>
            {userData?.user.assistantName || 'Menu'}
          </h2>
          <button 
            onClick={() => setHam(false)}
            className='p-2 rounded-xl hover:bg-white/10 transition-colors duration-300 group'
            aria-label='Close menu'
          >
            <RxCross2 className='w-6 h-6 text-white/80 group-hover:text-white transition-colors' />
          </button>
        </div>

        <nav className='flex-1 flex flex-col space-y-3'>
          {/* Customize Button */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            whileHover={{ x: 5 }}
            onClick={() => {
              navigate('/customize');
              setHam(false);
            }}
            className='group flex items-center space-x-4 text-white/90 hover:text-white px-4 py-3.5 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10'
          >
            <div className='p-2 rounded-lg bg-linear-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </div>
            <span className='font-medium'>Customize Assistant</span>
            <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300'>→</span>
          </motion.button>

          {/* History Section */}
          <div className='mt-6'>
            <div className='flex items-center px-4 mb-3'>
              <span className='text-sm font-medium text-cyan-300/90 uppercase tracking-wider'>Recent Queries</span>
              <div className='ml-3 h-px flex-1 bg-linear-to-r from-cyan-500/30 to-transparent'></div>
            </div>
            
            <div className='flex-1 overflow-y-auto pr-1 -mr-1 max-h-[40vh] custom-scrollbar'>
              {userData?.user.history?.length > 0 ? (
                <div className='space-y-2'>
                  {userData.user.history.map((item, index) => (
                    <motion.button 
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      className='w-full text-left text-gray-200 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5 group flex items-center'
                      onClick={() => {
                        setUserText(item);
                        setHam(false);
                      }}
                    >
                      <span className='truncate flex-1'>{item}</span>
                      <span className='ml-2 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity duration-300'>→</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className='p-4 text-center'>
                  <p className='text-gray-400 text-sm'>Your query history will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleLogout();
              setHam(false);
            }}
            className='mt-auto group flex items-center space-x-4 text-red-300 hover:text-white px-4 py-3.5 rounded-xl transition-all duration-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/20'
          >
            <div className='p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
            </div>
            <span className='font-medium'>Sign Out</span>
            <span className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300'>→</span>
          </motion.button>
        </nav>
      </div>

      <button className='min-w-[150px] h-[60px] bg-white rounded-full cursor-pointer font-semibold text-[19px] mt-6 absolute top-5 right-5 hidden lg:block' onClick={handleLogout}>Log Out</button>

      <button className='min-w-[150px] h-[60px] bg-white rounded-full cursor-pointer font-semibold text-[19px] mt-6 absolute top-25 right-5 px-5 py-2.5 hidden lg:block' onClick={() => navigate('/customize')}>Customize Your Assistant</button>

      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden shadow-lg '>
        <img src={userData?.user.assistantImage} alt="" className='h-full object-cover rounded-4xl'/>
      </div>

      <h1 className='text-white font-semibold text-xl'>I'm {userData?.user.assistantName}</h1>

      {!aiText && 
        <img src={user} alt="" className='w-[200px] '/>
      }
      {aiText && 
        <img src={ai} alt="" className='w-[200px] '/>
      }

      <h1 className='text-white text-xl font-semibold text-wrap'>{userText ? userText : aiText ? aiText : null}</h1>
    </div>
  )
}

export default Home
