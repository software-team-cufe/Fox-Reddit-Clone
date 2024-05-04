import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function TopCommunities() {
    
    // const fetchCommunities = async () => {
    //     try {
    //         const response = await userAxios.get('/api/communities');
    //         const communities = response.data;
    
    //         // Sort communities by number of followers in descending order
    //         const sortedCommunities = communities.sort((a, b) => b.followers - a.followers);
    
    //         setYourCommunities(sortedCommunities);
    //     } catch (error) {
    //         console.error('Error fetching communities:', error);
    //     }
    // };

    const[communities, setCommunities] = useState([]);
    let communitiesToSort = [];
    //connecting to mock
    useEffect(() => {
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
           setCommunities(newComms);
        });
    }, []);
    
    useEffect(() => {
        console.log(communities);
    }, [communities]);

    const sortTopCommunities = () => {
        const sortedCommunities = [...communities].sort((a, b) => b.membersCount - a.membersCount);
        const temptestcomnenenene = [...communities,...communities];
        setCommunities(temptestcomnenenene);
    };

    

    return(
    <>
    Top communities
    <button onClick={sortTopCommunities}>Sort</button>
    <ul className='grid grid-rows-8 grid-cols-4 grid-flow-col'>
        {communities.map((comm,index) => (
            <li key={index} className={`item-center text-center ${index%2==0 ? "bg-gray-100" : "bg-white"}`} >
                <a href={`/r/${comm.name}`}>
                    <img src={comm.icon} alt={comm.name} className="w-12 h-12 rounded-full"/>
                    <span>{comm.name}</span>
                    <div>{comm.description}</div>
                </a>
            </li>
        ))}
    </ul>
    </>
    )

}