import React, {  useState, useContext, useRef } from "react";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { useQuery } from "react-query";
import { userAxios } from "../../../../Utils/UserAxios";
import { toast } from "react-toastify";

/**
 * Renders the profile comments section.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.using - The using value.
 * @param {Object} props.context - The context object.
 * @returns {JSX.Element} The profile comments component.
 */
function ProfileComments({ using, context }) {

    // states for collecting comments from request and loading state
    const { selected, period } = useContext(context);
    const [comments, setComments] = useState([]);
    const [loading, setload] = useState(false);
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;
    //fetch comments on load and put into comments array
    const fetchInitialComments = () => {
        setload(true);
        userAxios.get(`/user/${using}/comments?page=1&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                if(response.data.comments.length < limitpage){
                    setpagedone(true);
                }
                const newComments = response.data.comments.map(comment => ({
                    user: {
                        image: null,
                        Username: null,
                        id: comment.authorID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    }
                }));
                setcurrentpage(2);
                setComments(newComments);
                setload(false);
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your comments please try again")
                setload(false);
            });
    };

    const {error: postsError } = useQuery(['fetchInitialProfileComments', selected, period],fetchInitialComments, { retry: 0, refetchOnWindowFocus: false });

    const fetchMoreComments = () => {
        setCallingPosts(true);
        userAxios.get(`/user/${using}/comments?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
        .then(response => {
                if(response.data.comments.length < limitpage) {
                    setpagedone(true);
                }
                console.log(response.data.comments)
                const newComments = response.data.comments.map(comment => ({
                    user: {
                        image: null,
                        Username: null,
                        id: comment.authorID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.textHTML
                    }
                }));

                setComments(prevComments => [...prevComments, ...newComments]);
                setCallingPosts(false);
                setcurrentpage(1+currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                toast.error("there was an issue with loading your comments please try again")
                setCallingPosts(false);
            });
    };

    //to handle waiting for fetch or loading state
    if (loading) {
        return (
            <div role="commentstab" className="w-100 h-100 p-10 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-12 w-12 mt-24 z-10 mx-auto animate-ping" alt="Logo" />
            </div>
        )
    }

    //main comments feed
    return (
        <div role="commentstab" className="flex flex-col w-full h-fit my-4">

            {/* if there are no comments, show no results */}
            {comments.length > 0 ? (
                <>
                    {comments.map((comment, index) => (
                        <CommentComponent key={index} comment={comment} />
                    ))}
                    {!pagedone && !callingposts && (<button id="loadMoreButton" ref={loadMoreButtonRef} type="button" onClick={fetchMoreComments} className="w-fit h-fit my-2 px-3 mx-auto py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
                    {callingposts && (<img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />)}
                </>
            ) : (
                <>
                    {/*no results view*/}
                    <img src={'/confusedSnoo.png'} className="w-16 mx-auto h-24 mb-2" alt="Confused Snoo"></img>
                    <p className="text-lg mx-auto font-bold">looks like you haven't commented on anything</p>
                </>
            )}
        </div>
    )
}

export default ProfileComments;