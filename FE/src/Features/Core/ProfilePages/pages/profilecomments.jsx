import React, {  useState, useContext, useRef } from "react";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent";
import { useQuery } from "react-query";
import { userAxios } from "../../../../Utils/UserAxios";
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
    const [callingposts, setCallingPosts] = useState(false);
    const loadMoreButtonRef = useRef(null);
    const [pagedone, setpagedone] = useState(false);
    const [currentpage,setcurrentpage] = useState(1);
    const limitpage = 5;
    //fetch comments on load and put into comments array
    const fetchInitialComments = () => {
        userAxios.get(`/user/${using}/comments?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
            .then(response => {
                console.log(response.data.comments);
                const newComments = response.data.comments.map(comment => ({
                    user: {
                        image: comment.user.avatar,
                        Username: comment.user.username,
                        id: comment.user.userID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    }
                }));
                setcurrentpage(currentpage+1);
                setComments(newComments);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const { isLoading:loading, error: postsError } = useQuery(['fetchInitialProfileComments', selected, period],fetchInitialComments, { retry: 0, refetchOnWindowFocus: false });

    const fetchMoreComments = () => {
        setCallingPosts(true);
        userAxios.get(`/user/${using}/comments?page=${currentpage}&count=${limitpage}&limit=${limitpage}&t=${period}`)
        .then(response => {
                if(response.data.length < limitpage) {
                    setpagedone(true);
                }
                const newComments = response.data.map(comment => ({
                    user: {
                        image: comment.user.avatar,
                        Username: comment.user.username,
                        id: comment.user.userID
                    },
                    info: {
                        votes: comment.votesCount,
                        time: comment.createdAt,
                    },
                    content: {
                        text: comment.commentText
                    }
                }));

                setComments(prevComments => [...prevComments, ...newComments]);
                setCallingPosts(false);
                setcurrentpage(1+currentpage);

            })
            .catch(error => {
                console.error('Error:', error);
                setCallingPosts(false);
            });
    };

    //to handle waiting for fetch or loading state
    if (loading) {
        return (
            <div role="commentstab" className="w-100 h-100 flex flex-col items-center justify-center">
                <img src={'/logo.png'} className="h-6 w-6 mx-auto animate-ping" alt="Logo" />
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
                    {!pagedone && !callingposts && (<button ref={loadMoreButtonRef} type="button" onClick={fetchMoreComments} className="w-fit h-fit my-2 px-3 mx-auto py-2 bg-gray-200 shadow-inner rounded-full transition transform hover:scale-110">Load more</button>)}
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