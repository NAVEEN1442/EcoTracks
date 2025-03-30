
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import "./fontFamily.css"
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import OTP from './Routes/OTP';
import GetCarbon from './Routes/GetCarbon';
import Content from './Routes/Content'
import ContentData from './Routes/ContentData'
import Mix from "./Routes/Mix"
import Dashboard from "./Routes/Dashboard"

function App() {
  return (
    <div className=' no-scrollbar overflow-auto  ' >

      <Routes>
      
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/verifyEmail' element={<OTP/>}/>
        <Route path='/carbon' element={<GetCarbon/>} />
        <Route path='/Content' element={<Content/>} />
        <Route path='/ContentData/:id' element={<ContentData/>} />
        <Route path='/mix' element={<Mix/>} /> 
        <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>

    </div>
  );
}

export default App;
