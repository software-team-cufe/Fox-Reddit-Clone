import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserHeader() {
  return (
    <div className=" flex items-center gap-3">
      <Link className=" rounded-full bg-gray-100 p-2" to={'/'}>
        <ArrowLeft />
      </Link>
      <div className=" space-y-2">
        <div className="flex items-center gap-2">
          <img className="h-[40px] rounded-full overflow-hidden aspect-square " src="https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg" />
          <div className="w-fit">
            <div className="flex items-center gap-2">
              <p>r/programming . </p>
              <p className=" text-sm text-gray-500">15 hr ago</p>
            </div>
            <p className=" text-sm text-gray-500">Spacesh1psoda</p>
          </div>
        </div>
      </div>
    </div>
  )
}
