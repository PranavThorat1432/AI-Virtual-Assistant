import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Customize from './Pages/Customize';
import { userDataContext } from './ContextAPI/userContext';
import Home from './Pages/Home';
import Customize2 from './Pages/Customize2';

const App = () => {

  const {userData, setUserData} = useContext(userDataContext);

  return (
    <Routes>
      <Route path='/' element={
        !userData 
          ? <Navigate to={'/login'}/> 
          : (userData?.user?.assistantImage && userData?.user?.assistantName) 
            ? <Home/> 
            : <Navigate to={'/customize'}/>
      }/>
      <Route path='/signup' element={!userData ? <Signup/> : <Navigate to={'/'}/>}/>
      <Route path='/login' element={!userData ? <Login/> : <Navigate to={'/'}/>}/>
      <Route path='/customize' element={userData ? <Customize/> : <Navigate to={'/login'}/>}/>
      <Route path='/customize2' element={userData ? <Customize2/> : <Navigate to={'/login'}/>}/>
    </Routes>
  )
}

export default App
