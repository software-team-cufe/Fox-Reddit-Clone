
function ProfileDownvoted() {
    return (
        <div className="flex flex-col items-center">
            <img src={'/confusedSnoo.png'} className="w-16 h-24 mb-2" alt="Confused Snoo"></img>
            <p className="text-lg font-bold">looks like you haven't downvoted anything</p>
        </div>
    )
}

export default ProfileDownvoted;