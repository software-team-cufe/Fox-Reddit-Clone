import React from "react";

function ProfilePosts() {
    return (
        <div role="poststab" className="flex flex-col items-center">
                <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                <p className="text-lg font-bold">u/username hasn't posted yet</p>
            </div>
    )
}

export default ProfilePosts;