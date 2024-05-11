import React, { useState } from "react";
import { ArrowLeft, Edit, EllipsisVertical, EyeOff, Flag, Info, Lock, Pocket, Trash } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from "react";
import { userStore } from "../../../../hooks/UserRedux/UserStore";
import { userAxios } from "../../../../Utils/UserAxios";
import { toast } from "react-toastify";
import ReportPostModal from "./ReportPostModal";
export default function UserHeader({ post }) {
  const params = useParams();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const handelSave = async () => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post("/api/save", {
        "linkID": `t3_${params.id}`,
      })
    } catch (ex) { }
    toast.dismiss(id);
  };
  const handelDelete = async () => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post("/api/del", {
        "linkID": `t3_${params.id}`,
      })
    } catch (ex) { }
    toast.dismiss(id);
  };
  const handelLock = async () => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post("/api/lock", {
        "linkID": `t3_${params.id}`,
      })
    } catch (ex) { }
    toast.dismiss(id);
  };

  const handelHide = async () => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post("/api/hide", {
        "linkID": `t3_${params.id}`,
      })
      window.location.reload();
    } catch (ex) { }
    toast.dismiss(id);
  };
  const handelAddNSFW = async (nsfw) => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post(`/api/${nsfw ? "marknsfw" : "unmarknsfw"}`, {
        "linkID": `t3_${params.id}`,
      })
      window.location.reload();
    } catch (ex) { }
    toast.dismiss(id);
  };
  const handelAddSpoiler = async (spoiler) => {
    const id = toast.loading("Please wait");
    try {
      const res = await userAxios.post(`/api/${spoiler ? "spoiler" : "unspoiler"}`, {
        "linkID": `t3_${params.id}`,
      })
      window.location.reload();
    } catch (ex) { }
    toast.dismiss(id);
  };

  const userId = userStore.getState().user.user?._id;

  return (
    <div className=" flex items-center justify-between gap-3">
      <ReportPostModal isOpen={isOpen} closeModal={() => setOpen(false)} />
      <div className=" flex items-center gap-3">
        <button id="arrow-left" className=" rounded-full bg-gray-100 p-2" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <div className=" space-y-2">
          <div className="flex items-center gap-2">
            <Link to={`/r/${post?.coummunityName}`}>
              <img className="h-[40px] rounded-full overflow-hidden aspect-square " src="https://t3.ftcdn.net/jpg/05/85/86/44/360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg" />
            </Link>
            <div className="w-fit">
              <div className="flex items-center gap-2">
                <Link to={`/r/${post?.coummunityName}`}>
                  <p>r/{post.coummunityName} . </p>
                </Link>
                <p className=" text-sm text-gray-500">15 hr ago</p>
              </div>
              <Link to={`/user/${post.username}`}>
                <p className=" text-sm text-gray-500">Spacesh1psoda</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {
        userId != null && <Menu as="div" className="flex">

          {/* Sort button header*/}
          <Menu.Button id="open-btn" role="dropDownButton" className="inline-flex justify-center border border-black hover:bg-gray-200 active:bg-gray-300 rounded-full aspect-square w-[30px] bg-white text-sm text-gray-900 ">
            <EllipsisVertical className="h-5 w-4 fill-black" />
          </Menu.Button>

          {/*the animation of menu opening and closing*/}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >

            {/* Sort options list mapped*/}
            <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {
                (post?.post?.userID == userId && userId != null) && <>
                  <Menu.Item>
                    <Link to={`/submit/${params.id}`}>
                      <button id="icon-edit" onClick={handelSave} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                        <Edit className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                        <span className="font-semibold text-sm">Edit</span>
                      </button>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button id="icon-trash" onClick={handelDelete} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                      <Trash className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                      <span className="font-semibold text-sm">Delete</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button id="lock" onClick={handelLock} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                      <Lock className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                      <span className="font-semibold text-sm">Lock</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button icon="info" onClick={() => handelAddNSFW(!post.nsfw)} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                      <Info className="w-7  mt-1 text-gray-500" aria-hidden="true" />
                      <span className="font-semibold text-sm">{post.nsfw ? "Remove NSFW tag" : "Add NSFW tag"}</span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button id="icon-infooooooo" onClick={() => handelAddSpoiler(!post.spoiler)} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                      <Info className="w-7  mt-1 text-gray-500" aria-hidden="true" />
                      <span className="font-semibold text-sm">{post.spoiler ? "Remove spoiler tag" : "Add spoiler tag"}</span>
                    </button>
                  </Menu.Item>
                </>
              }
              <Menu.Item>
                <button id="icon-pocketttttt" onClick={handelSave} className="text-start flex gap-3 p-3 hover:bg-gray-200 w-full">
                  <Pocket className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                  <span className="font-semibold text-sm">Save</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button id="eyeoffffff" onClick={handelHide} className="text-start p-3 flex gap-3 mb-2 hover:bg-gray-200 w-full">
                  <EyeOff className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                  <span className='font-semibold text-sm'>Hide</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button id="flaaag" onClick={() => setOpen(true)} className="text-start p-3 pt-2 flex gap-3 hover:bg-gray-200 w-full">
                  <Flag className="w-4 h-4 mt-1 text-gray-500" aria-hidden="true" />
                  <span className='font-semibold text-sm'>Report</span>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      }
    </div>
  )
}
