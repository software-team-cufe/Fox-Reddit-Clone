import React, {useEffect, useState} from "react";
import axios from 'axios';

function ProfilePosts() {
    
        const [Posts, setPosts] = useState([]);
    
        useEffect(() => {
            axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/posts')
                .then(response => {
                    setPosts(response.data.commentArr);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);

        return (
            <div role="commentstab" className="flex flex-col w-full my-4 items-center">
                {Posts.length > 0 ? (
                    Posts.map((post, index) => (
                        <div key={index}>{post.commentId}</div>
                        //<Comment key={index} data={comment} />
                    ))
                ) : (
                    <>
                        <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                        <p className="text-lg font-bold">u/user haven't posted yet</p>
                    </>
                )}
            </div>
        )
}

export default ProfilePosts;