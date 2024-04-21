import React, { useState } from "react";
import { ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import ImageGallery from "react-image-gallery";
export default function PostComponent({ refetch, role, post, className, viewMode = false }) {
    post.votes = post.votes ?? 0;
    const images = [post.thumbnail, ...post.images];
    const [postObj, setPost] = useState(post);
    const [votes, setVotes] = useState(post.votes);
    const vote = async (upvote) => {
        const votesss = upvote ? post.votes + 1 : post.votes - 1;
        const res = await axios.patch(`http://localhost:3002/posts/${post.id}`, { votesCount: votesss });
        setVotes(res.data.votesCount);
    };
    return (
        <div role={role} className={` p-4 w-full ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>

            {
                !viewMode ?
                    <div className="flex items-center justify-between">
                        <Link to={`/posts/${postObj.id}`}>
                            <div>
                                <div className="mb-4 flex items-center gap-4">
                                    <img src={postObj.subReddit?.image} alt="image" className="w-9 h-9 rounded-full" />
                                    <h5 className=" text-sm ">{postObj.subReddit?.title}</h5>
                                </div>

                            </div>
                            <h2 className="mb-2 text-xl font-bold">{postObj.title} </h2>
                            <p className=" text-gray-600 text-sm">{postObj.description} </p>
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
                        {(images.length != 0 && postObj.video == null) &&
                            <div className=" max-w-[700px]">
                                <ImageGallery
                                    showBullets={images.length > 1}
                                    renderLeftNav={(onClick, disabled) => (
                                        <button className=" absolute z-20 top-[50%] ml-4" onClick={onClick} disabled={disabled} >
                                            <ArrowLeftCircle className=" text-white" />
                                        </button>
                                    )}
                                    renderRightNav={(onClick, disabled) => (
                                        <button className=" absolute z-20 top-[50%] right-4" onClick={onClick} disabled={disabled} >
                                            <ArrowRightCircle className=" text-white" />
                                        </button>
                                    )}
                                    showThumbnails={false} showPlayButton={false} showFullscreenButton={false} items={images.map((e, idx) => {
                                        return {
                                            original: e,
                                            thumbnail: e,
                                        };
                                    })} />
                            </div>
                        }
                        {
                            postObj.video && <div>
                                <video src={postObj.video} controls />
                            </div>
                        }

                    </div>
            }

            <div className="flex flex-row mt-4 items-center gap-4">
                <div className="flex bg-gray-100 gap-3 items-center rounded-[80px] px-3 py-2">
                    <ArrowUpCircle onClick={() => vote(true)} className="w-5 h-5 cursor-pointer" />
                    <p>{votes}</p>
                    <ArrowDownCircle onClick={() => vote(false)} className="w-5 h-5 cursor-pointer" />
                </div>
                {!viewMode && <div className="flex bg-gray-100 gap-1 items-center rounded-[80px] px-3 py-2">
                    <Link to={viewMode ? null : `/posts/${postObj.id}`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer" />
                    </Link>
                    <p>{postObj.comments}</p>
                </div>}
            </div>
        </div>
    )
}
