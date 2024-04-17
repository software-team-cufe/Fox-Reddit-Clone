import React from 'react'

const PopUp = ({setOpt}) => {
  return (
    <div className=' w-screen h-screen bg-slate-950 bg-opacity-30 fixed top-0 right-0 flex justify-center items-center '>
       
    <div className=' bg-white flex-col shadow-md rounded-md w-[520px] h-[180px]'>

      <div className=' flex flex-row justify-between mt-3'>
         
         <div className=' flex ml-3 '>
             <p className=' font-semibold text-sm ml-3 mt-2 '> Opt out of the redesign</p>
         </div>

         <div className=' flex'> 
             <button onClick={()=>setOpt(false)} className=' mr-4'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
             </button>
         </div>
         
      </div>
       <hr className="h-px my-3 bg-gray-200 border-0 "></hr>

     
  
      <p className=' mx-6 mt-3 text-sm text-slate-700'>
      There is an opt in to redesign setting in Preferences (in old Reddit) if you'd like to opt back in.</p>

      <div className='flex justify-end flex-row  mt-4'>
         <button onClick={()=>setOpt(false)} className=" mr-3 text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-24 h-8 hover:bg-sky-50 ">Cancel</button>
         
         <div>   
          <button  className=" mr-8 text-white bg-sky-600 border-sky-600 rounded-full font-semibold text-base w-24 h-8 hover:bg-sky-600">
            OPT OUT
         </button>
        
         
         </div>
      

      </div>
     </div>

    
   
  </div>
  
  )
}

export default PopUp
