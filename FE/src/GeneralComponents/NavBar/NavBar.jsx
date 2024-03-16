import Logo from "@/GeneralElements/Logo/Logo";
import { userStore } from "@/hooks/UserRedux/UserStore";
import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";
import ProfileIcon from "./Components/ProfileIcon";
import { useState, createContext } from "react";
import Tooltip from "@/GeneralElements/Tooltip/Tooltip";
import { MessageCircleMore, BadgePlus, QrCode } from "lucide-react";
import { Settings, UserRound, Bell, LogOut, AlignJustify } from "lucide-react";
import "./ButtonStyling.css";
import SharedContext from "./SharedContext";
export const Mo = createContext();
import Sidebar from "../SideBar/sidebar";

export default function NavBar({ }) {
  const [showModal, setShowModal] = useState(false);
  const [IsOpenMenue, setIsOpenMenue] = useState(false);
  const [IshoverAd, setIshoverAd] = useState(false);
  const [IshoverChat, setIshoverChat] = useState(false);
  const [IshoverCreate, setIshoverCreate] = useState(false);
  const [IshoverBell, setIshoverBell] = useState(false);
  const [IshoverProf, setIshoverProf] = useState(false);
  const [IshoverSide, setIshoverSide] = useState(false);
  const IsLoggedIn = false;

  //handle to use tooltip
  const handleMouseEnterAd = () => {
    setIshoverAd(true);
  };
  const handleMouseLeaveAd = () => {
    setIshoverAd(false);
  };
  const handleMouseEnterChat = () => {
    setIshoverChat(true);
  };
  const handleMouseLeaveChat = () => {
    setIshoverChat(false);
  };
  const handleMouseEnterCreate = () => {
    setIshoverCreate(true);
  };
  const handleMouseLeaveCreate = () => {
    setIshoverCreate(false);
  };
  const handleMouseEnterBell = () => {
    setIshoverBell(true);
  };

  const handleMouseLeaveBell = () => {
    setIshoverBell(false);
  };
  const handleMouseEnterProf = () => {
    setIshoverProf(true);
  };
  const handleMouseLeaveProf = () => {
    setIshoverProf(false);
  };
  const handleMouseEnterSide = () => {
    setIshoverSide(true);
  };
  const handleMouseLeaveSide = () => {
    setIshoverSide(false);
  };
  const handleOpenMenu = () => {
    IsOpenMenue ? setIsOpenMenue(true) : setIsOpenMenue(false);
  };
  const SharedContext = createContext(IsOpenMenue);

  return (
    <div className="px-[1.5rem] pt-[1rem] w-100vl ">
      {/* Send Open Menu to sidebar */}
      <Mo.Provider value={"hhhhhhhhhhhhhhh"}>
        <Sidebar></Sidebar>
      </Mo.Provider>
      <SharedContext.Provider value={IsOpenMenue}>

      </SharedContext.Provider>
      <nav className=" ">
        <div className="flex-row  justify-between items-center  h-10 mx-4">
          {/* userStore.getState().user.user == null ? */}
          <div className="flex items-center gap-4">
            <button
              className="bg-white hover:bg-orange-100  block lg:hidden w-8  h-10 my-2   rounded-full   "
              onMouseEnter={handleMouseEnterSide}
              onMouseLeave={handleMouseLeaveSide}
              onClick={handleOpenMenu}
            >
              <AlignJustify color=" #e94c00" size={24} />

              <Tooltip
                title={"Open navigation "}
                status={IshoverSide}
              ></Tooltip>
            </button>
            <Logo className=" text-2xl" />
            <input
              type="text"
              placeholder=" Search"
              className="border rounded-3xl w-5/6 mx-9 h-9 my-4 bg-gray-100 p-2"
            ></input>

            {IsLoggedIn && (
              <div className="flex  sm:justify-around space-x-2 mx-2 h-16 ">
                <div
                  className="   md:block max-w-1/6 "
                  id="navbar-default"
                ></div>
                <button
                  className="bg-white hover:bg-orange-100   w-8  h-10 my-2   rounded-full   "
                  onMouseEnter={handleMouseEnterAd}
                  onMouseLeave={handleMouseLeaveAd}
                >
                  <img src="./icons/advertise.png"></img>

                  <Tooltip
                    title={"Advertise on Fox "}
                    status={IshoverAd}
                  ></Tooltip>
                </button>

                <button
                  className="bg-white hover:bg-orange-100    min-w-8 h-10 my-2 rounded-full   "
                  onMouseEnter={handleMouseEnterChat}
                  onMouseLeave={handleMouseLeaveChat}
                >
                  <MessageCircleMore color=" #e94c00" size={32} />
                  <Tooltip title={"Open chat"} status={IshoverChat}></Tooltip>
                </button>

                <button
                  className="bg-white hover:bg-orange-100   min-w-8  h-10 my-2 rounded-full   "
                  onMouseEnter={handleMouseEnterCreate}
                  onMouseLeave={handleMouseLeaveCreate}
                >
                  <BadgePlus color=" #e94c00" size={32} />
                  <Tooltip
                    title={"Create new post"}
                    status={IshoverCreate}
                  ></Tooltip>
                </button>
                <div className="relative flex">
                  <button
                    className="bg-white hover:bg-orange-100   min-w-8 h-10 my-2 rounded-full hover:   "
                    onMouseEnter={handleMouseEnterBell}
                    onMouseLeave={handleMouseLeaveBell}
                  >
                    <Bell color=" #e94c00" size={32} />
                    <Tooltip
                      title={"Open inbox"}
                      status={IshoverBell}
                    ></Tooltip>
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsOpenMenue(!IsOpenMenue)}
                    className=" backdrop-opacity-0 hover:bg-orange-100   min-w-8 rounded-full    my-3 "
                    onMouseEnter={handleMouseEnterProf}
                    onMouseLeave={handleMouseLeaveProf}
                  >
                    <UserRound color=" #e94c00" size={32} />
                    <Tooltip
                      title={"Open profile menu"}
                      status={IshoverProf}
                    ></Tooltip>
                  </button>

                  {IsOpenMenue && (
                    <ul className="flex-col shadow-md absolute right-0 w-40 bg-white mt-2 mb-2">
                      <li>
                        <button className="bg-white hover:bg-orange-100  text-black  py-1 px-1 rounded inline-flex items-center w-full">
                          <UserRound color=" #e94c00" size={32} />
                          View profile
                        </button>
                      </li>

                      <li>
                        <button className="bg-white hover:bg-orange-100 text-black  py-1 px-1  rounded inline-flex items-center w-full">
                          <LogOut color=" #e94c00" size={32} />
                          Log out
                        </button>
                      </li>
                      <li>
                        <button className="bg-white hover:bg-orange-100 text-black   py-1 px-1  rounded inline-flex items-center w-full">
                          <Settings color=" #e94c00" size={32} />
                          Settings
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
            {!IsLoggedIn && (
              <div className="flex items-center w-auto">
                <div className="   md:block  " id="navbar-default"></div>
                <Link to="/register">
                  <button className="NavButtons bg-gray-400 hover:bg-slate-500">
                    <QrCode color=" white" size={32} />
                    Get App
                  </button>
                </Link>
                <Link to="/login">
                  <button className="NavButtons bg-orange-600">
                    <div>Log in</div>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="NavButtons bg-orange-600">
                    Create Account
                  </button>
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
