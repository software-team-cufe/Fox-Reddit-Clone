import Logo from "@/GeneralElements/Logo/Logo";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Tooltip from "@/GeneralElements/Tooltip/Tooltip";
import { MessageCircleMore, BadgePlus, QrCode, Megaphone } from "lucide-react";
import { Settings, UserRound, Bell, LogOut, AlignJustify } from "lucide-react";
import "./ButtonStyling.css";




export default function NavBar({ SetOpenSiseBar }) {
  const listProfRef = useRef(null);
  const UserProfRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [IsOpenProfList, setIsOpenProfList] = useState(false);
  const [IshoverAd, setIshoverAd] = useState(false);
  const [IshoverChat, setIshoverChat] = useState(false);
  const [IshoverCreate, setIshoverCreate] = useState(false);
  const [IshoverBell, setIshoverBell] = useState(false);
  const [IshoverProf, setIshoverProf] = useState(false);
  const [IshoverSide, setIshoverSide] = useState(false);
  const IsLoggedIn = true;


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
    if (!IsOpenProfList)
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
  const handleOpenProfList = () => {
    setIsOpenProfList(!IsOpenProfList);
  };
  //handle click outside profile list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listProfRef.current && !listProfRef.current.contains(event.target) && !UserProfRef.current.contains(event.target)) {
        setIsOpenProfList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className=" px-[1.5rem]  z-50 w-100vl fixed w-full h-[69px]  bg-white top-0">
      <div className="flex-row   justify-between items-center  h-8 mx-4">
        {/* userStore.getState().user.user == null ? */}
        <div className="flex items-center gap-4">
          <button
            className="bg-white hover:bg-orange-100  block md:hidden w-8  h-10 my-2   rounded-full   "
            onMouseEnter={handleMouseEnterSide}
            onMouseLeave={handleMouseLeaveSide}
            onClick={SetOpenSiseBar}
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
                className="bg-white hover:bg-orange-100 hidden md:block   my-3 h-fit   rounded-full   "
                onMouseEnter={handleMouseEnterAd}
                onMouseLeave={handleMouseLeaveAd}
              >
                <Megaphone color=" #e94c00" size={32} />

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
                <BadgePlus  color=" #e94c00" size={32} />
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
                <button ref={UserProfRef}
                  onClick={() => handleOpenProfList()}
                  className=" backdrop-opacity-0 hover:bg-orange-100  min-w-8 rounded-full    my-3 "
                  onMouseEnter={handleMouseEnterProf}
                  onMouseLeave={handleMouseLeaveProf}
                >
                  <UserRound color=" #e94c00" size={32} />
                  <Tooltip
                    title={"Open profile menu"}
                    status={IshoverProf}
                  ></Tooltip>
                </button>

                {IsOpenProfList && (
                  <ul ref={listProfRef} className=" rounded-lg flex-col  shadow-2xl absolute right-0 w-max   bg-white mt-2 py-2   mb-2">
                    <li>
                      <button className="bg-white hover:bg-orange-100  text-black h-12 py-1 px-1 rounded inline-flex items-center w-full">
                        <UserRound className="mx-4" color=" #e94c00" size={24} />
                        View profile
                      </button>
                    </li>

                    <li>
                      <button className="bg-white hover:bg-orange-100 text-black h-12 py-1 px-1  rounded inline-flex items-center w-full">
                        <LogOut className="mx-4" color=" #e94c00" size={24} />
                        Log out
                      </button>
                    </li>
                    <div className="bg-gray-200 h-px mx-4 my-2"></div>
                    <li>
                      <button className="bg-white hover:bg-orange-100 text-black  h-12 py-1 px-4  rounded inline-flex items-center w-full">
                        <Megaphone className="mx-2" color=" #e94c00" size={24} />
                        Advertise on Fox
                      </button>
                    </li>
                    <div className="bg-gray-200 h-px mx-4 my-2"></div>
                    <li>
                      <button className="bg-white hover:bg-orange-100 text-black h-12  py-1 px-1  rounded inline-flex items-center w-full">
                        <Settings className="mx-4" color=" #e94c00" size={24} />
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
                  <QrCode className=" h-5 w-5" color=" white" size={32} /> 
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


  );
}
