import React from "react";

function ProfileOverview({using}) {

    return (
        <div role="overviewtab" className="flex-initial min-h-screen w-full my-4">
                <div className="flex flex-col mt-6 items-center">
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you have not overviewed anything</p>
                </div>
        </div>
    );
}

export default ProfileOverview;