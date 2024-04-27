import { useState } from "react"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EmailChanged from "./ComponentChange/EmailChanged";
import ChangeLanguage from "./ComponentChange/ChangeLanguage";
import PopUp from "./ComponentChange/PopUp";
import DeleteAccount from "./ComponentChange/DeleteAccount";
import { userStore } from "@/hooks/UserRedux/UserStore";


const Acount = () => {
 
  
  const[isOpen, setOpen]=useState(false);
  const[selectedOption,setOption]=useState(null);

   const clickedOption = (value)=>()=>{
     setOption(value);
     setOpen(false);
   }

  const[changeEmail, setChange]= useState(false);
  const[ChangeLang , setLanguage]= useState(false);
  const[handleClicked , setOpt]=useState(false);
  const[deleteccount,setDelete]=useState(false);
  const[isdisConnect,setConnect]=useState(true);


  const disConnect=()=>{
    setConnect(!isdisConnect);
  }
  const userEmail=userStore.getState().user.user.email
  return (
    <div className="w-[75%]" >
    
    <h2 className=" font-semibold text-xl">Account settings</h2>
      
    {/* first div ACCOUNT PREFERENCES */}
    <div >
        <p className="text-xs text-gray-500 mt-9 mb-1">ACCOUNT PREFERENCES</p>
        <hr className="w-[70%]" />
        <div className='flex flex-col mt-7 w-[70%]'>
        {/* first div */}
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Email address</p>
              <div className="text-xs text-gray-500">
                 <span> {userEmail}</span>
              </div>
            </div>

            <div>
             <button onClick={()=>setChange(true)}  className="  btn-changeEmail text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-20 hover:bg-sky-50">
             Change
             </button>
               {changeEmail && <EmailChanged setChange={setChange}></EmailChanged>}
            </div>
          </div>
          <div className="flex flex-row mb-7 justify-between ">
               <div className='flex flex-col'>
                   <p className=" font-semibold">Change password</p>
                   <div className="text-xs text-gray-500">
                     Password must be at least 8 characters long
                   </div>
               </div>
               <div>
               <button onClick={()=>setChange(true)}  className="  btn-changeEmail text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-20 hover:bg-sky-50">
                   Change
               </button>
                  {changeEmail && <EmailChanged setChange={setChange}></EmailChanged>}
              </div>
           </div>
         {/* second div */}
          <div className="flex flex-row mb-7 justify-between">
            <div className='flex flex-col'>
              <p className=" font-semibold">Gender</p>
              <div className="text-xs text-gray-500">
                This information may be used to improve your recommendations and ads.
              </div>
            </div>

            <div>
            <div className='flex flex-col ml-8 mt-5 relative' >
    
            <button onClick={()=>setOpen(true)} className='flex items-center' >
                <div className=' text-sky-600 text-sm' style={{whiteSpace: 'nowrap'}}> 
                  {selectedOption||'WOMAN'}
               </div>
          
               <svg className="w-4 h-4 mt-1.5"
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
               </svg>  
            </button>
            { isOpen && 
            <div className=' w-40 h-[150px] border border-gray-100 rounded-md shadow-md absolute'> 
              <div className="bg-white flex flex-col">
                <hr className='my-1 '/>
                <button type="button"
                 onClick={clickedOption('WOMAN')} 
                 className=' block rounded-t-lg no-underline  hover:bg-sky-50 text-left text-sm px-2 '> 
                  woman
                </button>
                <hr className='my-1'/>
                <button type="button"
                 onClick={clickedOption('MALE')} 
                 className=' block rounded-none no-underline  hover:bg-sky-50 text-left text-sm px-2'> 
                  male
                </button>
                <hr className='my-1'/>
                <button type="button"
                 onClick={clickedOption('NON-BINARY')} 
                 className=' block rounded-none no-underline  hover:bg-sky-50 text-left text-sm px-2'> 
                non-binary
                </button>
                <hr className='my-1'/>
                <button type="button"
                 onClick={clickedOption('PREFER NOT TO SAY')} 
                 className=' block rounded-none no-underline  hover:bg-sky-50 text-left text-sm px-2'> 
                 I refer to myself as...
                </button>
                <hr className='my-1'/>
                <button type="button"
                onClick={clickedOption('PREFER NOT TO SAY')} 
                className=' block rounded-none no-underline  hover:bg-sky-50 text-left text-sm px-2'> 
                prefer not to say
               </button>
               <hr className='my-1'/>
              </div>
              </div>
       }

       {/*في نفس ال div هنعمل الdropdown list  */}
       

           </div>


            </div>

          </div>
          {/*third div */}
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>

              <div className="flex flex-row">
                <p className=" font-semibold">Display language</p>
                <p className="text-red-500"> (beta)</p>
              </div>

              <div className="text-xs text-gray-500">
                Select the language you&apos;d like to experience the Reddit interface in. Note
                that this won&apos;t change the language of user-generated content and that this
                feature is still in development so translations and UI are still under review.
              </div>


            </div>
          </div>
        </div>
      </div>

    {/* second div */}
      <div >

        <div className='flex flex-col mt-7 w-[70%]'>
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Content languages</p>
              <p className="text-xs text-gray-500">
                Add languages you’d like to see posts, community recommendations, and other content in
              </p>

            </div>
            <div>
              <button onClick={()=>setLanguage(true)} type="button" className="text-sky-600 bg-white border border-sky-600 rounded-full font-semibold text-base w-20 hover:bg-sky-50">
              Change
              </button>
              {ChangeLang && <ChangeLanguage setLanguage={setLanguage} ></ChangeLanguage> }

            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>


              <p className=" font-semibold">Location customization</p>
              <p className="text-xs text-gray-500">
                Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data.
                <button className="text-sky-600 underline ml-2">
                  Learn more
                </button>
              </p>

            </div>
          </div>
        </div>
      </div> 
    {/* 3th div  */}
      <div >
        <p className="text-xs text-gray-500 mt-9 mb-1" id="connectAccount">CONNECTED ACCOUNTS</p>
        <hr className="w-[70%]" />

        <div className='flex flex-col mt-7 w-[70%]'>
          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connected to Twitter</p>
              <p className="text-xs text-gray-500">You can now choose to share your posts to Twitter from the new post composer.
              </p>

            </div>

            <div className="text-xs text-gray-500">
              <p > @username</p>
              <button type="button" className="text-sky-600 bg-white w-20 ">(disconnect)</button>

            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col ml-10 '>
              <p className=" font-semibold">Show link on profile</p>
              <p className="text-xs text-gray-500">You can show a link to your Twitter account on your profile
              </p>

            </div>

            <div className="mt-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                              peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
              </label>
            </div>


          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connect to Apple</p>
              <p className="text-xs text-gray-500">Connect account to log in to Reddit with Apple
              </p>

            </div>

            <div>

              <button type="button" className=" rounded-full font-semibold text-sm w-44 text-white bg-black flex items-center h-7 justify-center  ">
                <div className="mr-2">
                  <svg viewBox="0 0 384 512" width="15">
                    <path fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                    </path>
                  </svg>
                </div>

                <p className=" mr-2"> Connect to Apple </p>
              </button>



            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className='flex flex-col'>
              <p className=" font-semibold">Connected to Google</p>
              <p className="text-xs text-gray-500">Connect account to log in to Reddit with Google
              </p>

            </div>

            <div className="text-xs text-gray-500">
   
             {isdisConnect?(
             
              <button onClick={disConnect} type="button" className="text-sky-600 bg-white w-20 ">(disconnect)</button>
             ):( 
              <button onClick={disConnect} type="button" className=" rounded-full font-semibold text-sm w-44 text-black bg-white border h-7 border-gray-200 flex items-center justify-center  ">
                <div className="">
                  <svg className="h-4 w-5 mr-1" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                </div>
                 <p className=" mr-"> Connect to Google </p>
              </button>)}

            </div>
          </div>

        </div>
      </div>
    {/* 4th div  */}
      <div>
        <p className="text-xs text-gray-500 mt-9 mb-1">BETA TESTS</p>
        <hr className="w-[70%]" />

        <div className="flex flex-col mt-7 w-[70%]">
          <div className="flex flex-row mb-7 justify-between ">
            <div className=" flex flex-col">
              <p className=" font-semibold">Opt into beta tests</p>
              <p className=" text-xs text-gray-500">
                See the newest features from Reddit and join the r/beta community
              </p>
            </div>

            <div className=" mt-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden" />
                <div
                  className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                             peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row mb-7 justify-between ">
            <div className=" flex flex-col">
              <p className=" font-semibold">Opt out of the redesign</p>
              <p className=" text-xs text-gray-500">
                Revert back to old Reddit for the time being
              </p>
            </div>


             {/* fe pop up here  */}
            <div className=" mt-4">
              <label onClick={()=>setOpt(true)} className="relative inline-flex cursor-pointer items-center o">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden" />
                <div
                  className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
                          peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
                />
              </label>
             {handleClicked && <PopUp setOpt={setOpt}></PopUp>}
            </div>
          </div>

        </div>
      </div>

    {/* 5th div  */}
      <div className=" justify-between ">
        <p className="text-xs text-gray-500 mt-9 mb-1">DELETE ACCOUNT</p>
        <hr className="w-[70%]" />

        <div className="flex flex-row mb-7 text-xs font-semibold w-[70%] justify-end h-[100px]">


          <button onClick={()=>setDelete(true)} type="button" className="bg-white text-red-500 flex flex-row mt-9 ">

            <svg className=" w-4 h-4"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <p className=" ml-1">
              DELETE ACCOUNT
            </p>
          </button>
           {deleteccount && <DeleteAccount setDelete={setDelete}></DeleteAccount>}

        </div>

      </div>

    </div>
  )
}

export default Acount
