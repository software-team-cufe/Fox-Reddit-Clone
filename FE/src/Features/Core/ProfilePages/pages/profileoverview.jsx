
function ProfileOverview() {

    return (
        <div className="flex-initial min-h-screen mx-28 my-4">
                <div className="flex flex-col mt-6 items-center">
                    <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg font-bold">looks like you have not overviewed anything</p>
                </div>
        </div>
    );
}

export default ProfileOverview;