import PostComponent from "@/GeneralComponents/Post/Post";
import UserHeader from "./components/UserHeader";
import { fakePosts } from "../HomePage/fakePosts";
import CommentSection from "./components/CommentSection";


export default function PostPage() {
    return (
        <div className=" space-y-4">
            <UserHeader />
            <PostComponent post={fakePosts[0]} viewMode={true} />
            <CommentSection />
        </div>
    )
}
