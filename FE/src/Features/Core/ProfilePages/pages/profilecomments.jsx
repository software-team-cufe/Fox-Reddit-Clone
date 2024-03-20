import React, { useEffect, useState } from "react";
import axios from 'axios';

function ProfileComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('https://virtserver.swaggerhub.com/BOUDIE2003AHMED/fox/1/user/sharif29/comments?page=4&count=10&limit=50&t=month')
            .then(response => {
                setComments(response.data.commentArr);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div role="commentstab" className="flex flex-col w-full my-4 items-center">
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index}>{comment.commentId}</div>
                    //<Comment key={index} data={comment} />
                ))
            ) : (
                <>
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you haven't commented on anything</p>
                </>
            )}
        </div>
    )
}

export default ProfileComments;