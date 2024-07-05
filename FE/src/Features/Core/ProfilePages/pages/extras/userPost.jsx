import parse from 'html-react-parser';
import React, { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import { userAxios } from "@/Utils/UserAxios";
import { toast } from 'react-toastify'
import { userStore } from "@/hooks/UserRedux/UserStore";
import axios from 'axios';
function PollComponent({ polls, postId }) {
    const [poll, setPolls] = useState(polls ?? []);


    if (polls.length == 0) return <></>;
    const handelVote = async () => {
        const val = document.getElementById(`poll-option-${postId}`).value;
        console.log({ val });
        if (val == null || val == "") return;
        const id = toast.loading("Please wait");
        try {
            const res = await userAxios.post(`/api/posts/${postId}/pool`, {
                choice: val,
            });
            
        } catch (ex) {

        }
        toast.dismiss(id);
    };
    return <div className='flex border rounded-lg my-4 w-full p-4 space-y-4 flex-col'>
        {
            poll.map((e, idx) => <div key={idx} className='flex items-center gap-1'>
                <input id={`poll-option-${postId}`} type='radio' defaultValue={e.title} />
                <label>{e.title} ({e.votes})</label>
            </div>)
        }
        <div>
            <button onClick={handelVote} className='px-4 py-2 rounded-full bg-gray-300 '>Vote</button>
        </div>
    </div>
}

export default function PostComponent({ refetch, role, post, className, viewMode = false }) {
    const [isOpen, setOpen] = useState(false);
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

    return (
        <div role={role} className={` p-4 w-full ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>


            {
                !viewMode ?
                    <div className="flex flex-col items-start justify-between">
                        <Link to={`/user/${postObj.communityName}/overview`}>
                            <div>
                                <div className="mb-4 flex items-center gap-4">
                                    <img src={postObj.communityIcon} alt="image" className="w-9 h-9 rounded-full" />
                                    <h5 className=" text-sm ">u/{postObj.communityName}</h5>
                                </div>
                            </div>
                        </Link>

                        <Link className="w-full" to={`/posts/${postObj.postId}`}>
                            <h2 className="mb-2 text-xl font-bold">{postObj.title} </h2>
                            <div className='asdasd' dangerouslySetInnerHTML={{ __html: post.textHTML }} />
                            {/* <p className=" text-gray-600 text-sm">{parse(post.textHTML)} </p> */}
                            <div

                                className=" rounded-lg my-4 w-full bg-gray-600">
                                <img
                                    style={{ filter: !!postObj.spoiler ? 'blur(10px)' : "" }}
                                    className="mx-auto max-h-[600px] lg:max-w-[800px] w-full rounded-lg my-4"
                                    alt=""
                                    src={postObj.thumbnail} />
                            </div>
                        </Link>
                        <PollComponent postId={postObj.postId ?? params.id } polls={post?.poll} />
                    </div> :

                    <div>
                        {
                            postObj.isDeleted && <p>Post is deleted</p>
                        }
                        {
                            !postObj.isDeleted && <>
                                <h2 className="mb-2 text-xl font-bold">{postObj.title} </h2>
                                <p className=" text-gray-600 text-sm mb-4">{postObj.description} </p>
                                <div className='asdasd' dangerouslySetInnerHTML={{ __html: post.textHTML }} />
                            </>
                        }
                        <PollComponent postId={postObj.postId ?? params.id } polls={post?.poll} />
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
                    <Link className="flex items-center gap-2" to={viewMode ? null : `/posts/${postObj.postId}`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer" />
                        <p>{postObj.commentsNum}</p>
                    </Link>
                    <p>{postObj.comments}</p>
                </div>}
            </div>
        </div>
    )
}
