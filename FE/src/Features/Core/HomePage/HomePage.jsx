import PostComponent from "@/GeneralComponents/Post/Post";
import { fakePosts } from "./fakePosts";

export default function HomePage() {

  return (
    <div className="w-full flex flex-col">
      <div className=" mx-auto space-y-4">
        {
          fakePosts.map((e, idx) => <PostComponent post={e} key={idx} />)
        }
      </div>
    </div>
  )
}
