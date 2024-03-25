import { ArrowDownCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import react from "react";

export default function PostComponent({ post, className, viewMode = false }) {
    return (
        <div className={` p-4  w-full lg:w-fit ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>
            <Link to={viewMode ? null : `/posts/${post.id}`}>
                {
                    !viewMode && <div>
                        <div className="mb-4 flex items-center gap-4">
                            <img src={post.subReddit.image} alt="image" className="w-9 h-9 rounded-full" />
                            <h5 className=" text-sm ">{post.subReddit.title}</h5>
                        </div>
                    </div>
                }
                <h2 className="mb-2 text-xl font-bold">{post.title} </h2>
                <p className=" text-gray-600 text-sm">{post.subTitle}</p>
                <img
                    className="w-[800px]  lg:max-w-[800px] rounded-lg my-4 max-h-[700px] object-cover"
                    alt=""
                    src={post.context} />
            </Link>

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
