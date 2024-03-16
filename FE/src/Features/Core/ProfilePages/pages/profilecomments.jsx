import axios from "axios";
import React, { useState } from "react";

function ProfileComments() {

    const [img, setImg] = useState('confusedSnoo.png')

    const getinfo = ()=> {
        axios.get('https://virtserver.swaggerhub.com/software_eng_fox/FoxAPI/1.0.0/r/{subreddit}/search')
        .then((response) => {
            console.log(response.data);
            console.log(response.data[0].avatar);
            setImg(response.data[0].avatar);
        })
        }
    return (
        <div className="flex flex-col items-center">
              <img onClick={getinfo} src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                <img src={img} alt="lol" className="w-16 h-24 mb-2"></img>
            <p className="text-lg font-bold">looks like you haven't commented on anything</p>
        </div>
    )
}

export default ProfileComments;