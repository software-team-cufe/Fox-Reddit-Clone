import React from 'react';
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { ArrowDownCircle, ArrowUpCircle, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export default function CommentComponent({ comment, margin = 0 }) {
    const [showComment, setShowCommetn] = useState(false);
    const [comm, setComm] = useState(comment);
    const handelVote = async (add) => {
        const id = toast.loading('Please wait');
        try {
            const res = await axios.patch(`http://localhost:3002/comments/${comment.id}`, {
                votesCount: comment.votesCount + add
            });
            setComm(res.data);
        } catch (ex) {

        }
        toast.dismiss(id);
    };
    return (
        <div style={{
            marginLeft: margin,
        }}>
            <div className=" flex gap-2 items-center">
                <img src={comm.user.avatar} className=" aspect-square w-[30px] rounded-full overflow-hidden" />
                <p className="font-bold">{comm.user.username}</p>
                <p className="font-bold">.</p>
                <p className="text-sm text-gray-500">{comm.createdAt}</p>
            </div>
            <div className="mt-2 mb-6 ml-3">
                <p className="ml-2">{comm.commentText}</p>
                <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <button onClick={() => handelVote(1)} className="p-2 rounded-full hover:bg-blue-100">
                            <ArrowUpCircle />
                        </button>
                        <p>{comm.votesCount}</p>
                        <button onClick={() => handelVote(-1)} className="p-2 rounded-full hover:bg-blue-100">
                            <ArrowDownCircle />
                        </button>
                    </div>
                    <button onClick={() => setShowCommetn(!showComment)} className="flex items-center gap-2 rounded-full hover:bg-blue-100 px-3 py-2" >
                        <MessageCircle />
                        Reply
                    </button>
                    <button className="flex items-center gap-2 rounded-full hover:bg-blue-100 px-3 py-2" >
                        <Share />
                        Share
                    </button>
                </div>
            </div>
            {/* {
                showComment && <div className="my-4">
                    <TextBox area={true} placeholder="Enter your comment..." />
                    <div className="flex mt-4 items-center gap-4">
                        <Button>Comment</Button>
                        <button onClick={()=> setShowCommetn(false)} className=" bg-gray-100 text-black rounded-full px-4 py-2">Cancel</button>
                    </div>
                </div>
            }
            {
                comment.comments?.map((e, idx) => <CommentComponent comment={e} key={idx} margin={margin + 20} />)
            } */}
        </div>
    )
}
