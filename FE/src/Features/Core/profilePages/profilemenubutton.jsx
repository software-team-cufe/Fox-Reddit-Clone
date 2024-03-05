import { useNavigate } from "react-router-dom";

const ProfileMenuButton = ({path,clicked,text}) => {
    const navigate = useNavigate();

    function NavigateToProfileSection (e){
        switch (e) {
            case 'post':
                navigate('/posts');
                break;
            case 'comment':
                navigate('/comments');
                break;
            case 'saved':
                navigate('/saved');
                break;  
            case 'hidden':
                 navigate('/hidden');
                 break;
            case 'upvote':
                navigate('/upvoted');
                break;
            case 'downvote':
               navigate('/downvoted');
               break;
            default:
                navigate('/overview');
        }
    }

    return (
        <button className={`rounded-pill w-fit px-3 h-10 hover:underline ${clicked ? "bg-gray-300" : "bg-white"}`} onClick={()=> NavigateToProfileSection(path)}>{text}</button>
    )
}


ProfileMenuButton.defaultProps = {
    clicked: false,
    path: "overview",
    text: "overview"
}

export default ProfileMenuButton;