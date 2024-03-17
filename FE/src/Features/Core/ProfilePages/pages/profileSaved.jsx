import React from "react";

function ProfileSaved() {
    return (
        <div role="savedtab" className="flex flex-col my-4 w-full items-center">
             <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
            <p className="text-lg font-bold">looks like you haven't saved anything</p>
        </div>
    )
}

export default ProfileSaved;