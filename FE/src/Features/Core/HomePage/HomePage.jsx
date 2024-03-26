import PostComponent from "@/GeneralComponents/Post/Post";
import { fakePosts } from "./fakePosts";

export default function HomePage() {

  return (
    <div className="w-full h-full flex gap-10">
      <div className="w-full overflow-y-auto space-y-4">
        {
          fakePosts.map((e, idx) => <PostComponent post={e} key={idx} />)
        }
      </div>
      <div className="p-5   w-[600px] shadow  rounded-md border h-fit  hidden lg:flex lg:flex-col">
          <h2 className=" font-bold">Recent Posts</h2>
          <hr className="my-2" />
        </div>
    </div>
  )
}
