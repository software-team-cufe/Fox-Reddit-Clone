import PostComponent from "@/GeneralComponents/Post/Post";
import UserHeader from "./components/UserHeader";
import { fakePosts } from "../HomePage/fakePosts";
import CommentSection from "./components/CommentSection";
import { useParams } from "react-router-dom";


export default function PostPage() {
    const params = useParams();
    const idx = parseInt(params.id);
    if(idx > fakePosts.length) return <></>;
    return (
        <div className=" space-y-4">
            <UserHeader post={fakePosts[parseInt(idx)]}/>
            <PostComponent post={fakePosts[parseInt(idx)]} viewMode={true} />
            <CommentSection />
        </div>
    )
}
