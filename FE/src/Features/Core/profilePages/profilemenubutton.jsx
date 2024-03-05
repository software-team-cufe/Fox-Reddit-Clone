import { useNavigate } from "react-router-dom";

const buttons = [
    {
        text: "overview",
        path: "overview",
    },
    {
        text: "posts",
        path: "posts",
    },
    {
        text: "comments",
        path: "comments",
    },
    {
        text: "saved",
        path: "saved",
    },
    {
        text: "hidden",
        path: "hidden",
    },
    {
        text: "upvoted",
        path: "upvoted",
    },
    {
        text: "downvoted",
        path: "downvoted",
    },

]

const ProfileMenuButton = ({path,clicked,text}) => {
    const navigate = useNavigate();

    function NavigateToProfileSection (e){
        switch (e) {
            case 'posts':
                navigate('/posts');
                break;
            case 'comments':
                navigate('/comments');
                break;
            case 'saved':
                navigate('/saved');
                break;  
            case 'hidden':
                 navigate('/hidden');
                 break;
            case 'upvoted':
                navigate('/upvoted');
                break;
            case 'downvoted':
               navigate('/downvoted');
               break;
            default:
                navigate('/overview');
        }
    }

    return (
        <button className={`rounded-3xl w-fit px-3 h-10 hover:underline hover:bg-gray-300 ${clicked == path ? "bg-gray-300" : "bg-white"}`} onClick={()=> NavigateToProfileSection(path)}>{text}</button>
    )
}


ProfileMenuButton.defaultProps = {
    clicked: "false",
    path: "overview",
    text: "overview"
}

export {buttons,ProfileMenuButton};