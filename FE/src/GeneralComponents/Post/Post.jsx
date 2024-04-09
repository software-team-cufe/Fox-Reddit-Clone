import React from "react";
import { ArrowDownCircle, ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
export default function PostComponent({role, post, className, viewMode = false }) {
    const images = [post.thumbnail, ...post.images];


    return (
        <div role={role} className={` p-4 w-full ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>
            {
                !viewMode ? <Link to={`/posts/${post.id}`}>
                    <div>
                        <div className="mb-4 flex items-center gap-4">
                            <img src={post.subReddit?.image} alt="image" className="w-9 h-9 rounded-full" />
                            <h5 className=" text-sm ">{post.subReddit?.title}</h5>
                        </div>
                    </div>
                    <h2 className="mb-2 text-xl font-bold">{post.title} </h2>
                    <p className=" text-gray-600 text-sm">{post.description} </p>
                    <div

                        className=" rounded-lg my-4 w-full bg-gray-600">
                        <img
                            className="mx-auto max-h-[600px] lg:max-w-[800px] w-full rounded-lg my-4"
                            alt=""
                            src={post.thumbnail} />
                    </div>
                </Link> :
                    <div>

                        <h2 className="mb-2 text-xl font-bold">{post.title} </h2>
                        <p className=" text-gray-600 text-sm mb-4">{post.description} </p>
                        {(images.length != 0 && post.video == null) &&
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
                            post.video && <div>
                                <video src={post.video} controls />
                            </div>
                        }
                    </div>
            }

            <div className="flex flex-row mt-4 items-center gap-4">
                <div className="flex bg-gray-100 gap-3 items-center rounded-[80px] px-3 py-2">
                    <ArrowUpCircle className="w-5 h-5 cursor-pointer" />
                    <p>{post.votes}</p>
                    <ArrowDownCircle className="w-5 h-5 cursor-pointer" />
                </div>
                {!viewMode && <div className="flex bg-gray-100 gap-1 items-center rounded-[80px] px-3 py-2">
                    <Link to={viewMode ? null : `/posts/${post.id}`}>
                        <MessageCircle className="w-5 h-5 cursor-pointer" />
                    </Link>
                    <p>{post.comments}</p>
                </div>}
            </div>
        </div>
    )
}
