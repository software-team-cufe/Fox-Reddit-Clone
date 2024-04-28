import React, { useEffect, useState } from 'react'

import ChechChange from './ChechChange'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { userAxios } from '../../../../Utils/UserAxios';
import userModel from '../../../../Models/UserModel';
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useDispatch } from 'react-redux';
import { setUser } from '@/hooks/UserRedux/UserModelSlice';

const EmailChanged = ({setChange}) => {

  const [currentpassword,setPassword]=useState('')
  const [newemail,setEmail]=useState('')
  const [isValidemail,setIsValidEmail]=useState(true)
  const [isValidepass,setIsValidPass]=useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const dispatch = useDispatch()

  const handleEmail=(e)=>{
    const enteredEmail = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsValidEmail(emailRegex.test(enteredEmail));
    setEmail(enteredEmail);
    validateForm();
  }
  const handlePass=(e)=>{
    const enteredPass = e.target.value;
    setPassword(enteredPass);
    validateForm();
  }
  const validateForm = () => {
    setIsButtonDisabled(!isValidemail || !currentpassword.length || !isValidepass);
  }
  const handleChange = async (event) => {
    event.preventDefault();
    try {
      const response = await userAxios.post('user/changeemail', { newemail, currentpassword });
      console.log("Email Changed");
      setEmail(newemail);
      console.log(newemail);
      dispatch(setUser({email: newemail}))
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
     
    <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-40 '>
       
      <div className=' bg-white flex-col shadow-md rounded-md w-[420px] h-[380px]'>
        <div className=' flex w-full justify-end '> 
           <button onClick={()=>setChange(false)} className=' mt-3 mr-4'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
           </button>
    
        </div>

        <div className=' flex flex-row ml-7 '>
       <div className=' rounded-full bg-sky-100 border border-sky-100 w-11 h-11 '>
           <svg className="text-blue-600 w-7 h-8 ml-2 mt-1"
             xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
        
              </div>
        <p className=' font-semibold text-xl ml-3 mt-2'> Update your email</p>
  </div>

        <p className=' mx-9 mt-2 mb-3'>
           Update your email below. There will be a new verification email sent that you will need to use to verify this new email.
        </p> 
      
        <div className=' flex flex-col relative'>
  
           <input 
              type="password"
                placeholder='current password'
                value={currentpassword}
                onChange={handlePass}
                className={` text-black border border-gray-200 self-center h-12 w-[350px] mt-2  rounded-md p-2 
                ${!isValidepass ? 'border-red-500' : ''}`}
               >  
           </input> 
           <div className='flex flex-col relative'>
                 <input 
                  type="email"
                  value={newemail}
                  onChange={handleEmail}
                  placeholder=' New email'
                  className={` text-black border border-gray-200 self-center h-12 w-[350px] mt-2  
                   rounded-md p-2 
                   ${!isValidemail ? 'border-red-500' : ''}`}
                    >  
                 </input>
                   {!isValidemail && 
                 <p className=' absolute text-red-500 text-xs mt-14 ml-9 '>
                   Please enter a valid email
                 </p>}
           </div>
          
        </div>
  
        <div className='flex justify-end flex-row pt-8 '>
   
            <button onClick={handleChange} disabled={isButtonDisabled} className=" mr-8 text-white bg-gray-400 border-gray-400 rounded-full font-semibold text-base w-32 h-8 ">
              Save email
           </button>

           

        </div>
       </div>

      
     
    </div>
    
   
  )
}

export default EmailChanged

