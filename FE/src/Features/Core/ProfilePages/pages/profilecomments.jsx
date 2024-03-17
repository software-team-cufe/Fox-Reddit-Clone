import React from "react";

function ProfileComments() {

    return (
        <div role="commentstab" className="flex flex-col w-full my-4 items-center">
              <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
            <p className="text-lg font-bold">looks like you haven't commented on anything</p>
        </div>
    )
}

export default ProfileComments;