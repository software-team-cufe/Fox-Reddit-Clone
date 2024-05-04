import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { userAxios } from "../../Utils/UserAxios";


export default function TopCommunities() {
    
    const[communities, setCommunities] = useState([]);
    const[forShow , setForShow] = useState([]);

    //connect to back
    useEffect(() => {const fetchData =async() => {
            try {
                    const response = await userAxios.get('/api/all_subreddits');
                    const comms = response.data.communities;
                    const newComms = comms.map(comm => ({
                    name: comm.name,  
                    _id: comm._id,
                    count: comm.count,
                    icon: comm.icon,
                }));

                setForShow(newComms);
                for(let i = 0; i < newComms.length; i++){
                    if (newComms[i].name && newComms[i].name.length > 9) {
                        newComms[i].name = newComms[i].name.slice(0, 9)+'..';
                    }
                }

                setCommunities(newComms);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };
        fetchData();
    }, []);

    //FUCTION FOR ANIMATION
    const [margin, setMargin] = useState(`mx-20`);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setMargin('sm:mx-40');
            } else {
                setMargin('mx-0');
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);


    //connecting to mock
    /**useEffect(() => {
        axios.get("http://localhost:3002/communities") //fetch communities and organize into communities array for mapping
           .then(response => {
             const newComms = response.data.map(comm => ({
               name: comm.name,  
               id: comm.id,
               NSFW: comm.NSFW,
               membersCount: comm.membersCount,
               icon: comm.icon,
               description: comm.description,
           }));
           const sortedCommunities = [...newComms].sort((a, b) => b.membersCount - a.membersCount);
           setCommunities(sortedCommunities);
        });
    }, []);*/
    
    //check if communities are loaded
    // useEffect(() => {
    //     console.log(communities);
    // }, [communities]);

    /**
    return(<div >
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={fetchCommunities}>View all</button>
    </div>)
    */
    return(
    <div className={`${margin} w-auto transition-all duration-500 ease-in-out`} role="topCommunities">
        <h1 className='justify-center text-center font-bold mb-5'>best of Fox</h1>
        <div className='grid grid-rows-2 flex flex-wrap mb-10'>
            <span className='font-bold'>Top communities</span>
            <p className='text-xs text-gray-500 text-xs'>Browse Fox’s largest communities</p>
        </div>
        <ul role="communities" className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 width-full gap-2 w-full'>
            {communities.map((comm,index) => (
                <li key={index} className={`flex item-center md:border-b-0 sm:border-b-4 border-b-4 text-center w-full h-auto mr-5 text-center grid grid-cols-3 gap-4 flex-wrap justify-center`} >
                    <div className='rounded-full text-center w-full mt-3 ml-8'>{index+1}</div>
                    <div className='item-center justify-center w-full'>
                        <img src={comm.icon} alt={comm.name} className="w-12 h-12 border-2 border-gray-400 rounded-full"/>
                    </div>
                    <div className='text-center items-center'>   
                        <a className='font-bold truncate ' href={`/r/${forShow[index].name}`}>
                        r/{comm.name}
                        </a>
                        <div className='text-xs ml'>{comm.count} Members</div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    )

}