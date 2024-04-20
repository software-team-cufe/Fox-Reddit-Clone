import React from 'react'

const ChechChange = ({setCheck,setChange}) => {
  return (
    <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center '>
       
    <div className=' bg-white flex-col shadow-md rounded-md w-[420px] h-[220px]'>
      <div className=' flex w-full justify-end '> 
         <button onClick={()=>setChange(false)} className=' mt-3 mr-4'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
           </svg>
         </button>
  
      </div>

      <div className=' flex flex-row ml-7 '>
            <div className=' rounded-full bg-sky-100 border border-sky-100 w-11 h-11  '>
               <svg className="text-blue-600 w-7 h-8 ml-2 mt-1"
                 xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 20 20" fill="currentColor">  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
            </div>
            <p className=' font-semibold text-xl ml-3 mt-2'> Check your email</p>
      </div>


      <div className=' mx-9 mt-2'>
         <p >
          We sent a message to 
         </p>
        
         <p> writeYourEmail311@gmail.com with a link to create your password.</p>
      </div>
     

      <div className='flex justify-end flex-row  mt-2'>
       
         <button onClick={()=>setChange(false)} className=" mr-8 text-white bg-sky-600 border-sky-600 rounded-full font-semibold text-base w-14 h-8 hover:bg-sky-600">Ok</button>

      </div>
     </div>

    
   
  </div>
  )
}

export default ChechChange
