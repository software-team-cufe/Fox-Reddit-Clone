yimport React from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { userAxios } from "../../../../Utils/UserAxios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
export default function MainFooter (){
  const [moderators, setModerators] = useState([]);
  const { community } = useParams();  
  const [members, setMembers] = useState(0);
  const path = useLocation().pathname;
  const pathLocation = useLocation().pathname;
  const [buttonData, setButtonData] = useState({});
  const [textData, setTextData] = useState({});
  const navigate =useNavigate();
  const [details, setTextDetails] = useState({});
  useEffect( () => {
    const getNumofMembers = async () => {
      try{ 
         const response = await userAxios.get(`/${community}/about/members`);
         console.log("members");
         console.log(response.data.membersCount);
         setMembers(response.data.membersCount ??0);
         
      }
      catch (error) {
        console.log(error);
      }
    
    };
       getNumofMembers();
  }, [community]); 
   
  
  useEffect(() => {  
    const getModerators = async () => {
    try {
      const response = await userAxios.get(`/${community}/about/moderators`);
      console.log("moderators");
      console.log(response.data.Moderators.users);
      setModerators(response.data.Moderators.users.map(user => user.username) ?? []);
    
    
    } catch (error) {
      console.log(error);
    } 
  };
  getModerators();}
  , [community])
  


  const getText = async () => {
    try {
      const res = await userAxios.get(`/${community}/api/text_widgets`);
       console.log(res.data);
       const { rules } = res.data;
       const getData ={
        rules: rules.map(rule => ({
          title: rule.title,
          description: rule.description
        }))
       };
       setTextData(getData);
       console.log(getData)

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getText();
  }, [community]);

  const getDetails = async () => {
    try {
      const res = await userAxios.get(`/${community}/api/details`);
       console.log(res.data);
       const { details } = res.data;
       setTextDetails(details);
       console.log(details);
    
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getDetails();
  }, [community]);
  

  
  const getButtons = async () => {
    try {
      const res = await userAxios.get(`/${community}/api/button_widgets`);
      console.log(res.data);
      const { rules } = res.data;
      const buttonData ={
        rules: rules.map(rule => ({
          buttonTitle: rule.buttonTitle,
          link: rule.link
        }))
      };
      setButtonData(buttonData);
      console.log("buttons");
      console.log(buttonData);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getButtons();
  }, [community]);

  const [displayRules, setRules] = useState([]);
  const getRules = async () => {
    try {
      const res = await userAxios.get(`/${community}/api/rules`);
      const { rules } = res.data;
      const displayRules = Array.isArray(rules) ? rules.map(rule => ({
        title: rule.title,
        description: rule.description,
        reason: rule.reason,
      })) : [];
      setRules(displayRules);
      console.log(displayRules.title);
      console.log(displayRules.description);
      console.log(displayRules.reason);
      console.log("rules");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRules();
  }, [community]);

  const navigator = useNavigate();
  const handleNavigate=()=>{
      navigator('/message/compose');
  }
  const [selectedId, setSelectedId] = useState(null);

  const handleButtonClick = (id) => {
    setSelectedId(id === selectedId ? null : id);
  };


    return(
        <div className={`w-[340px] min-w-[25%] flex-auto h-fit p-3 overflow-y-scroll bg-gray-100 rounded-lg ${path == `r/${encodeURIComponent(community)}` ? "hidden md:block" : "mx-auto mt-4"}`}>
           <div className=" flex flex-col content-between">
              <div className=" flex flex-col space-y-2  mb-3">
                <p className=" font-semibold text-lg"> {community}</p>
                <p className=" text-xs text-gray-500 font-light">{details.communityDescription}</p>
              </div>
             
              <div className=" flex flex-row justify-between my-3">
                  <div className=" flex flex-col">
                      <p className=" font-semibold text-md">{members}</p>
                      <p className=" text-xs text-gray-500 font-light">
                      { details.nickname ? ( details.nickname) : "Members" }
                       
                      </p>
                  </div>
                  <div className=" flex flex-col">
                     <p className="font-semibold text-md">456</p>
                   
                     <div className=" flex flex-row"> 
                       <svg className="text-green-500 w-2 h-2 fill-current rounded-full mt-1 mr-1"
                         xmlns="http://www.w3.org/2000/svg" width="24"  height="24"   viewBox="0 0 24 24"  strokeWidth="2" stroke="currentColor" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" /></svg>
                       <p className=" text-xs text-gray-500 font-light">
                       { details.currentNickname ? ( details.currentNickname) : "Online" }
                       </p>
                      </div>
                  </div>
                  <div className=" flex flex-col">
                     <p className=" font-semibold text-md">Top 1%</p>
                     <p className=" text-xs text-gray-500 font-light">Rank by size</p>
                  </div>
              </div>
           </div>
           <hr className="w-[100%] h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className='mx-3 flex flex-col my-3'>
            {textData.rules && textData.rules.map((rule, index) => (
               <div key={index} className="flex flex-col space-y-3" >
                   <h2 className="text-xs text-gray-600  uppercase font-medium ">{rule.title}</h2>
                   <div className="text-xs text-gray-500 capitalize">{rule.description}</div>
               </div>
            ))}
           </div>
          
           <hr className="w-[100%] h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className="flex flex-col space-y-3"> 
           <p className="text-xs text-gray-500">COMMUNITY BOOKMARKS</p>
           {
            buttonData.rules && buttonData.rules.map((rule, index) => (
              <button
            
                onClick={() => window.location.href = rule.link}
               key={index} className="text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold py-2 px-3 hover:bg-gray-300 hover:underline">
              {rule.buttonTitle}</button>
            ))
           }
         </div>
           <hr className="w-[100%] h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className=" flex flex-col">
              <p className="text-xs text-gray-500">Rules</p>
              {displayRules.map((rule, index) => (
                <div key={index} >
                <button
                  onClick={() => handleButtonClick(index + 1)} // Pass the id of the button
                  className={`hover:bg-gray-200 w-full  h-fit text-xs font-semibold py-2 px-2 flex flex-row justify-between ${
                   selectedId === index + 1 ? 'bg-gray-200' : ''
                 }`}
>
                 <div className="flex flex-row mx-2">
                   <p className="text-gray-700 w-12 capitalize ">{rule.title}</p>
                   <p className="text-gray-700 w-40 capitalize ">{rule.description}</p>
                 </div>
              {selectedId === index + 1 ? (
              <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="w-5 h-5"
    >
                 <path
                  fillRule="evenodd"
                  d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                  clipRule="evenodd"
                   />
                 </svg>
                ) : (
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                  >
                  <path
                   fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                         />
                  </svg>
                      )}
                     </button>
                  {selectedId === index + 1 && (
                    <div className=" w-full h-full">
                      <p className="text-xs text-gray-700 mx-6 capitalize my-2  ">{rule.reason}</p>
                    </div>
                  )}
                </div>
              ))}
           </div>
           <hr className="w-[100%] h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          
           <div className=" flex flex-col space-y-2 ">
              <p className="text-xs text-gray-500 mb-5">MODERATORS</p>
             
              <div className='flex flex-col mb-10'>
              {moderators.map((moderator, index) => (
                <div key={index} className='flex flex-row'>
                  <svg className="text-orange-400 w-7 h-7 self-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M21 14l-9 7-9-7L6 3l3 7h6l3-7z" />
                  </svg>
                  <button 
                    className='text-sm ml-2 hover:underline flex flex-row self-center'
                    onClick={() => navigate(`/viewer/${moderator}`)} 
                  >
                    <p>u/</p>
                    <p>{moderator}</p>
                  </button>
                </div>
              ))}
            </div>
   

              <button  onClick={handleNavigate} className="  text-xs bg-gray-200 rounded-3xl text-gray-700 font-semibold h-[35px] flex items-center justify-center hover:bg-gray-300 hover:underline">
                 <svg className="w-5 h-5 self-center "
                  xmlns="http://www.w3.org/2000/svg" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9 2 2 2z" /> 
                    <polyline points="22,6 12,13 2,6" />
                   </svg>
                 <p className=' ml-2 self-center '> Messages the mods </p>
              </button>
              
              
                     
           </div>
        </div>
    )
}