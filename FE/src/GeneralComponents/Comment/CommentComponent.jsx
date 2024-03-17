import { ArrowDownCircle, ArrowUpCircle, MessageCircle, Share } from "lucide-react";



export default function CommentComponent({ comment, margin = 0 }) {

    return (
        <div style={{
            marginLeft: margin,
        }}>
            <div className=" flex gap-2 items-center">
                <img src={comment.user.image} className=" aspect-square w-[30px] rounded-full overflow-hidden" />
                <p className="font-bold">Mahmoud</p>
                <p className="font-bold">.</p>
                <p className="text-sm text-gray-500">{comment.info.time}</p>
            </div>
            <div className="mt-2 mb-6 ml-3">
                <p className="ml-2">{comment.content.text}</p>
                <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-blue-100">
                            <ArrowUpCircle />
                        </button>
                        <p>{comment.info.votes}</p>
                        <button className="p-2 rounded-full hover:bg-blue-100">
                            <ArrowDownCircle />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 rounded-full hover:bg-blue-100 px-3 py-2" >
                        <MessageCircle />
                        Reply
                    </button>
                    <button className="flex items-center gap-2 rounded-full hover:bg-blue-100 px-3 py-2" >
                        <Share />
                        Share
                    </button>
                </div>
            </div>
            {
                comment.comments?.map((e, idx) => <CommentComponent comment={e} key={idx} margin={margin + 20} />)
            }
        </div>
    )
}
