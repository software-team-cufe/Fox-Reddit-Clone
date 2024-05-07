import React, { useState } from "react";
import CommentComponent from "@/GeneralComponents/Comment/CommentComponent"
import TextBox from "@/GeneralElements/TextBox/TextBox"
import { toast } from "react-toastify";
import { userAxios } from "../../../../Utils/UserAxios";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";





export default function CommentSection({ comments }) {
  const params = useParams();

  const [commentts, setComments] = useState(comments ?? []);
  const { data, isLoading, isError } =
    useQuery(`get-comms-${params.id}`, () => axios.get(`http://localhost:3002/comments?postID=${params.id}`).then(data => {
      setComments(data?.data ?? comments ?? []);
      return data;
    }),
      {
        refetchOnWindowFocus: false,
        retry: 0,
      }
    );

  const handelAddComment = async () => {
    const comm = document.getElementById('txt-comment').value;
    if (comm == null || comm == "") {
      toast.error("Please enter the comment");
      return;
    }
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post("/api/comment", {
        "linkID": params.id,
        "textHTML": comm,
        "textJSON": comm,
      });

    } catch (ex) { }
    try {
      const res2 = await axios.post("http://localhost:3002/comments", {
        "user": {
          "avatar": "https://images.unsplash.com/photo-1616509091215-57bbece93654?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "username": "user1",
          "userID": 1
        },
        "votesCount": 10,

        "createdAt": "2022/02/15, 15:05:45",
        "commentText": comm,
        "postID": params.id,
      },);
      setComments([...commentts, res2.data])
    } catch (ex) { }
    toast.dismiss(id);
  };
  if (isLoading) {
    return <>Loading ...</>;
  }
  return (
    <div>
      <div className="flex gap-2  w-full items-center">
        <TextBox id="txt-comment" placeholder="Add a comment" className="w-full rounded-2xl " />
        <button onClick={handelAddComment} className=" hover:bg-gray-300 h-full p-3 rounded-md flex items-center justify-center">
          <span>Post</span>
        </button>
      </div>
      <div className="my-5">
        {
          commentts.map((e, idx) => <CommentComponent comment={e} key={idx} />)
        }
      </div>
    </div>
  )
}
