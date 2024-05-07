import React, { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import { userAxios } from "@/Utils/UserAxios";
import ImageGallery from "react-image-gallery";
import { toast } from 'react-toastify'
import { userStore } from "../../hooks/UserRedux/UserStore";
export default function PostComponent({ refetch, role, post, className, viewMode = false }) {
    const user = userStore.getState().user.user;
    const params = useParams();
    const [voteType, setVotesType] = useState(null);
    useEffect(() => {
        try {
            const votesArr = post?.votes ?? [];
            for (const x of votesArr) {
                if (x.userID == user._id) {
                    setVotesType(x.type);
                    break;
                }
            }
        } catch (ex) {

        }
        console.log('object');
    }, [voteType]);
    post.votes = post.votes ?? 0;
    // const images = [post.thumbnail, ...post.images];
    const [postObj, setPost] = useState(post);
    const [votes, setVotes] = useState(post.votes);
    console.log({ post });
    const vote = async (upvote) => {
        const id = toast.loading('Please wait');
        try {
            const res = await userAxios.post('/api/postvote', {
                postID: postObj.postId ?? params.id,
                type: upvote ? 1 : -1,
            });
            if (voteType == null) {
                setPost(prev => { return { ...prev, votesCount: upvote ? prev.votesCount + 1 : prev.votesCount - 1 } })
                setVotesType(upvote ? 1 : -1)

            }
            if (upvote && voteType == 1) {
                setPost(prev => { return { ...prev, votesCount: prev.votesCount - 1 } });
                setVotesType(null);
            } else if (!upvote && voteType == -1) {
                setPost(prev => { return { ...prev, votesCount: prev.votesCount + 1 } });
                setVotesType(null);
            }
            if (upvote && voteType == -1) {
                setPost(prev => { return { ...prev, votesCount: prev.votesCount + 2 } });
                setVotesType(1);
            }
            if (!upvote && voteType == 1) {
                setPost(prev => { return { ...prev, votesCount: prev.votesCount - 2 } });
                setVotesType(-1);
            }
        } catch (ex) { }

        toast.dismiss(id);

        // setVotes(res.data.votesCount);
    };

    console.log(voteType);
    return (
        <div role={role} className={` p-4 w-full ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>

            {
                !viewMode ?
                    <div className="flex flex-col items-start justify-between">
                        <Link to={`/r/${postObj.communityName}`}>
                            <div>
                                <div className="mb-4 flex items-center gap-4">
                                    <img src={postObj.communityIcon} alt="image" className="w-9 h-9 rounded-full" />
                                    <h5 className=" text-sm ">r/{postObj.communityName}</h5>
                                </div>
                            </div>
                        </Link>
                        <Link className="w-full" to={`/posts/${postObj.postId}`}>
                            <h2 className="mb-2 text-xl font-bold">{postObj.title} </h2>
                            <p className=" text-gray-600 text-sm">{postObj.textHTML} </p>
                            <div

                                className=" rounded-lg my-4 w-full bg-gray-600">
                                <img
                                    style={{ filter: !!postObj.spoiler ? 'blur(10px)' : "" }}
                                    className="mx-auto max-h-[600px] lg:max-w-[800px] w-full rounded-lg my-4"
                                    alt=""
                                    src={postObj.thumbnail} />
                            </div>
                        </Link>
                    </div> :

                    <div>

                        <h2 className="mb-2 text-xl font-bold">{postObj.title} </h2>
                        <p className=" text-gray-600 text-sm mb-4">{postObj.description} </p>

                        {
                            postObj.video && <div>
                                <video src={postObj.video} controls />
                            </div>
                        }

                    </div>
            }

            <div className="flex flex-row mt-4 items-center gap-4">
                <div className="flex bg-gray-100 gap-3 items-center rounded-[80px] px-3 py-2">
                    <ArrowUpCircle onClick={() => vote(true)} className={`w-5 h-5 cursor-pointer ${voteType == 1 ? " text-blue-600" : ""}`} />
                    <p>{postObj.votesCount}</p>
                    <ArrowDownCircle onClick={() => vote(false)} className={`w-5 h-5 cursor-pointer ${voteType == -1 ? " text-blue-600" : ""}`} />
                </div>
                {!viewMode && <div className="flex bg-gray-100 gap-1 items-center rounded-[80px] px-3 py-2">
                    <Link to={viewMode ? null : `/posts/${postObj._id}`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer" />
                    </Link>
                    <p>{postObj.comments}</p>
                </div>}
            </div>
        </div>
    )
}
