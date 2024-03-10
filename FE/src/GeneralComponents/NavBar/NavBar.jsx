import Logo from "@/GeneralElements/Logo/Logo";
import { userStore } from "@/hooks/UserRedux/UserStore";
import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";
import ProfileIcon from "./Components/ProfileIcon";
import { useState } from "react";
import Tooltip from "@/GeneralElements/Tooltip/Tooltip";
import { Settings } from "lucide-react";

export default function NavBar({}) {
  const [showModal, setShowModal] = useState(false);
  const [IsOpenMenue, setIsOpenMenue] = useState(false);
  const IsLoggedIn = true;
  return (
    <div className="px-[1.5rem] pt-[1rem] w-100vl ">
      <nav className="flex items-center justify-between">
        {/* <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        ></div> */}
        <div className="">
          {/* userStore.getState().user.user == null ? */}
          <div className="flex items-center gap-3">
            <Logo className=" text-2xl" />
            <input
              type="text"
              placeholder=" Search"
              className="border rounded-3xl w-1/2 mx-4 h-9 my-4 bg-gray-100 p-2"
            ></input>
            {IsLoggedIn && (
              <div className="flex  sm:justify-around space-x-2 mx-2 h-16 ">
                <button className="bg-white hover:bg-orange-100   w-8  h-10 my-2   rounded-full   ">
                  <img src="./icons/advertise.png"></img>
                </button>

                <button className="bg-white hover:bg-orange-100    min-w-8 h-10 my-2 rounded-full   ">
                  <img src="./icons/chat.png"></img>
                </button>

                <button className="bg-white hover:bg-orange-100   min-w-8  h-10 my-2 rounded-full   ">
                  <img src="./icons/circle.png"></img>
                </button>
                <div className="relative flex">
                  <button className="bg-white hover:bg-orange-100   min-w-8 h-10 my-2 rounded-full    ">
                    <img src="./icons/bell-ring.png"></img>
                  </button>
                  <Tooltip title={"hh"}></Tooltip>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsOpenMenue(!IsOpenMenue)}
                    className=" backdrop-opacity-0 hover:bg-orange-100   min-w-8 rounded-full    my-3 "
                  >
                    <img src="./icons/user.png"></img>
                  </button>

                  {IsOpenMenue && (
                    <ul className="flex-col shadow-md absolute right-0 w-40 bg-white mt-2 mb-2">
                      <li>
                        <button className="bg-white hover:bg-orange-100  text-black  py-1 px-1 rounded inline-flex items-center w-full">
                          <img src="./icons/user.png" className="mx-1"></img>
                          View profile
                        </button>
                      </li>

                      <li>
                        <button className="bg-white hover:bg-orange-100 text-black  py-1 px-1  rounded inline-flex items-center w-full">
                          <img src="./icons/logout.png" className="mx-1"></img>
                          Log out
                        </button>
                      </li>
                      <li>
                        <button className="bg-white hover:bg-orange-100 text-black   py-1 px-1  rounded inline-flex items-center w-full">
                          <img
                            src="./icons/settings.png"
                            className="mx-1"
                          ></img>
                          Settings
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
            {!IsLoggedIn && (
              <div className="flex">
                <Link to="/register">
                  <Button>
                    <img src="./icons/qr-code.png" className="mx-1"></img>
                    Get App
                  </Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Create Account</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="bg-gray-200 h-px mx-4"></div>
        </div>
      </nav>
    </div>
  );
}
