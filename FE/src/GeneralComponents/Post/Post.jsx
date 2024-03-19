import { ArrowDownCircle, ArrowUpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostComponent({ post, className, viewMode = false }) {
    return (
        <div className={` p-4  w-fit ${!viewMode ? "hover:bg-gray-50" : ""} rounded-md ${className}`}>
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
                <p className=" text-gray-600 text-sm">{post.subTitle}asdasdasdasdasdasdasd </p>
                <img
                    className=" max-w-[800px] rounded-lg my-4"
                    alt=""
                    src="https://www.magicpattern.design/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fbrandbird%2Fmagicpattern%2Fwallpapers%2Fmagicpattern-mesh-gradient-1635765500606-preview.jpg&w=3840&q=75" />
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
