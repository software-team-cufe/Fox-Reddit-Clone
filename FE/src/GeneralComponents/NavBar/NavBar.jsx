import Logo from "@/GeneralElements/Logo/Logo";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Tooltip from "@/GeneralElements/Tooltip/Tooltip";
import { MessageCircleMore, BadgePlus, QrCode, Megaphone } from "lucide-react";
import { Settings, Search, Bell, LogOut, AlignJustify, Ellipsis } from "lucide-react";
import "./ButtonStyling.css";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../profileicon/Profileicon";
import { useLocation } from "react-router-dom";
import { userStore } from '../../hooks/UserRedux/UserStore';
import SearchComponent from "../../GeneralElements/Search/Search";
import NotificationsPopup from "./NotificationsPopup";
export default function NavBar({ SetOpenSiseBar, ProfileImageSrc, UserName, IsOnline, IsLogged }) {


  const navigator = useNavigate();
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
  const [OpenSmList, setOpenSmList] = useState(false);
  const [ShowBellPop, setShowBellPop] = useState(false);
  const ThreePoints = useRef(null);
  const OpenSmRef = useRef(null);
  const path = useLocation();


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
      if (listProfRef.current && !listProfRef.current.contains(event.target)
        && !UserProfRef.current.contains(event.target)) {
        setIsOpenProfList(false);
      }
    };
    const handleClickOutsideSm = (event) => {
      if (OpenSmRef.current && !OpenSmRef.current.contains(event.target)
        && !ThreePoints.current.contains(event.target)) {
        setOpenSmList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideSm);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideSm);
    };
  }, []);
  useEffect(() => {
    // Function to handle clicks outside the popup
    function handleClickOutside(event) {
      const popup = document.getElementById('notificationsPopup');
      const bell = document.getElementById("bellButton");
      if (bell && popup && !popup.contains(event.target) &&
        bell.contains(event.target)) { }
      else if (popup && !popup.contains(event.target)) {
        setShowBellPop(false);
      }
    }

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className=" px-[1.5rem] z-40 w-100vl fixed  w-full h-[69px]  bg-white top-0">
      <div className="flex w-full ">
        <button
          className={`bg-white hover:bg-orange-100  lg:hidden w-8  h-10 my-2 
            rounded-full  ${path.pathname.includes('setting') ||
              path.pathname.includes('submit') ? "hidden" : " block"} `}
          onMouseEnter={handleMouseEnterSide}
          onMouseLeave={handleMouseLeaveSide}
          onClick={SetOpenSiseBar}
        >
          <AlignJustify strokeWidth={1} color=" #e94c00" size={24} />

          <Tooltip
            title={"Open navigation "}
            status={IshoverSide}
          ></Tooltip>
        </button>
        <Logo role="FoxLogo"
          className=" text-2xl" />

        <SearchComponent />

        {IsLogged && <>

          <div className="flex sm:justify-around sm:space-x-2 sm:mx-2 h-16 ">
            <div
              className=" lg:block max-w-1/6 "
              id="navbar-default"
            ></div>
            <Ellipsis ref={ThreePoints}
              onClick={() => { OpenSmList ? setOpenSmList(false) : setOpenSmList(true); }}
              strokeWidth={2} className="my-4 relative mx-2 sm:hidden block " color=" #e94c00" size={24} />
            {OpenSmList && (
              <ul ref={OpenSmRef} className=" top-10 rounded-lg flex-col sm:hidden block 
              shadow-2xl absolute right-0 w-max   bg-white mt-2 py-2   mb-2">
                <li>
                  <button onClick={() => { navigator(`/user/${UserName}/posts`); setOpenSmList(false); }}
                    className="bg-white    text-black h-16 py-2 px-4 rounded inline-flex items-center w-full">
                    <ProfileIcon imageSrc={ProfileImageSrc} altText={UserName} isOnline={IsOnline} />
                    <div className="flex-col flex my-2">
                      <div className="mx-2 text-sm">View Profile</div>
                      <div className="text-xs text-gray-400 mx-1 text-left">{UserName}</div>
                    </div>
                  </button>
                </li>

                <li>
                  <button onClick={() => { setOpenSmList(false); setShowBellPop(!ShowBellPop) }}
                    className="bg-white relative  mx-4 flex min-w-8 h-10 my-2 rounded-full hover:   "
                    onMouseEnter={handleMouseEnterBell}
                    onMouseLeave={handleMouseLeaveBell}
                  >
                    <Bell strokeWidth={1} color=" #e94c00" size={24} />
                    <p className="text-sm mx-2 ">Notifications</p>
                  </button>
                  {ShowBellPop &&
                    <div className="absolute top-14 right-0">
                      <NotificationsPopup setShowBellPop={setShowBellPop} />
                    </div>}
                </li>

                <li>
                  <button
                    className="bg-white   mx-4  min-w-8 flex  h-10 my-2 rounded-full   "
                    onMouseEnter={handleMouseEnterCreate}
                    onMouseLeave={handleMouseLeaveCreate}
                    onClick={() => { navigator("submit"); setOpenSmList(false); }}
                  >
                    <BadgePlus strokeWidth={1} color=" #e94c00" size={24} />
                    <p className="text-sm mx-2 ">Create Post</p>
                  </button>
                </li>
                <li>
                  <Link to={'/chat/1'}>
                    <button onClick={() => { setOpenSmList(false); }}
                      className="bg-white  mx-4 flex  min-w-8 h-12 my-2 rounded-full   "
                      onMouseEnter={handleMouseEnterChat}
                      onMouseLeave={handleMouseLeaveChat}
                    >
                      <MessageCircleMore strokeWidth={1} color=" #e94c00" size={24} />
                      <p className="text-sm mx-2 ">Open Chat</p>
                    </button>
                  </Link>
                </li>
                <div className="bg-gray-200 h-px mx-4  "></div>
                <li>
                  <button onClick={() => { navigator("/setting/account"); setOpenSmList(false); }}
                    className="bg-white   text-black h-12  py-1 px-1 
                         rounded inline-flex items-center w-full">
                    <Settings strokeWidth={1} className="mx-4" color=" #e94c00" size={24} />
                    Settings
                  </button>
                </li>
                <li>
                  <button onClick={() => { setOpenSmList(false); }}
                    className="bg-white   text-black h-12 py-1 px-1  rounded inline-flex items-center w-full">
                    <LogOut strokeWidth={1} className="mx-4" color=" #e94c00" size={24} />
                    Log out
                  </button>
                </li>
              </ul>
            )}
            <button role="advertisement-button"
              className="bg-white hover:bg-orange-100 sm:block hidden    my-3 h-fit   rounded-full   "
              onMouseEnter={handleMouseEnterAd}
              onMouseLeave={handleMouseLeaveAd}
            >
              <Megaphone strokeWidth={1} color=" #e94c00" size={32} />

              <Tooltip
                title={"Advertise on Fox "}
                status={IshoverAd}
              ></Tooltip>
            </button>

            <Link to={'/chat/1'}>
              <button role="ChatButton"
                className="bg-white hover:bg-orange-100  sm:block hidden  min-w-8 h-10 my-2 rounded-full   "
                onMouseEnter={handleMouseEnterChat}
                onMouseLeave={handleMouseLeaveChat}
              >
                <MessageCircleMore strokeWidth={1} color=" #e94c00" size={32} />
                <Tooltip title={"Open chat"} status={IshoverChat}></Tooltip>
              </button>
            </Link>

            <button role="CretePostButton"
              className="bg-white hover:bg-orange-100 sm:block hidden   min-w-8  h-10 my-2 rounded-full   "
              onMouseEnter={handleMouseEnterCreate}
              onMouseLeave={handleMouseLeaveCreate}
              onClick={() => { navigator("submit") }}
            >
              <BadgePlus strokeWidth={1} color=" #e94c00" size={32} />
              <Tooltip
                title={"Create new post"}
                status={IshoverCreate}
              ></Tooltip>
            </button>
            <div className="relative flex">
              <button id="bellButton" onClick={() => { setShowBellPop(!ShowBellPop) }}
                role="NotificationsButton"
                className="bg-white hover:bg-orange-100 
                sm:block hidden   min-w-8 h-10 my-2 rounded-full hover:   "
                onMouseEnter={handleMouseEnterBell}
                onMouseLeave={handleMouseLeaveBell}
              >
                <Bell strokeWidth={1} color=" #e94c00" size={32} />
                <Tooltip
                  title={"Open inbox"}
                  status={IshoverBell}
                ></Tooltip>
              </button>
              {ShowBellPop &&
                <div className="absolute top-14 right-0">
                  <NotificationsPopup setShowBellPop={setShowBellPop} />
                </div>}
            </div>

            <div className="relative "

            >
              <div role="ProfIcon"
                ref={UserProfRef}
                onClick={() => handleOpenProfList()}

                onMouseEnter={handleMouseEnterProf}
                onMouseLeave={handleMouseLeaveProf} className=" sm:block hidden  w-12 h-12 cursor-pointer">
                <ProfileIcon imageSrc={ProfileImageSrc} altText={UserName} isOnline={IsOnline} />
              </div>
              <Tooltip
                title={"Open profile menu"}
                status={IshoverProf}
              ></Tooltip>


              {IsOpenProfList && (
                <ul ref={listProfRef} role="profile-menu" className=" rounded-lg flex-col shadow-2xl absolute right-0 w-max   bg-white mt-2 py-2   mb-2">
                  <li>
                    <button onClick={() => { navigator(`/user/${UserName}/posts`) }}
                      className="bg-white hover:bg-orange-100  text-black h-16 py-2 px-4 rounded inline-flex items-center w-full">
                      <ProfileIcon imageSrc={ProfileImageSrc} altText={UserName} isOnline={IsOnline} />
                      <div className="flex-col flex my-2">
                        <div className="mx-2 text-sm">View Profile</div>
                        <div className="text-xs text-gray-400 mx-1 text-left">{UserName}</div>
                      </div>
                    </button>
                  </li>

                  <li>
                    <button onClick={() => {
                      localStorage.removeItem('authorization');
                      localStorage.removeItem('refreshToken');
                      window.location.href = '/'
                    }} className="bg-white hover:bg-orange-100 text-black h-12 py-1 px-1  rounded inline-flex items-center w-full">
                      <LogOut strokeWidth={1} className="mx-4" color=" #e94c00" size={24} />
                      Log out
                    </button>
                  </li>
                  <div className="bg-gray-200 h-px mx-4 my-2"></div>
                  <li>
                    <button className="bg-white hover:bg-orange-100 text-black  h-12 py-1 px-4  rounded inline-flex items-center w-full">
                      <Megaphone strokeWidth={1} className="mx-2" color=" #e94c00" size={24} />
                      Advertise on Fox
                    </button>
                  </li>
                  <div className="bg-gray-200 h-px mx-4 my-2"></div>
                  <li>
                    <button onClick={() => { navigator("/setting/account"); }}
                      className="bg-white hover:bg-orange-100 text-black h-12  py-1 px-1 
                         rounded inline-flex items-center w-full">
                      <Settings strokeWidth={1} className="mx-4" color=" #e94c00" size={24} />
                      Settings
                    </button>
                  </li>

                </ul>
              )}
            </div>
          </div>

        </>}
        {!IsLogged && (
          <>
            <Ellipsis ref={ThreePoints}
              onClick={() => { OpenSmList ? setOpenSmList(false) : setOpenSmList(true); }}
              strokeWidth={2} className="my-4 relative mx-2  sm:hidden block " color=" #e94c00" size={24} />
            {OpenSmList && (
              <ul ref={OpenSmRef} className=" top-10 rounded-lg flex-col sm:hidden block 
              shadow-2xl absolute right-0 w-max   bg-white mt-2 py-2   mb-2">
                <li>
                  <Link to="/register">
                    <button onClick={() => { setOpenSmList(false); }}
                      className="NavButtons w-full p-2 text-sm text-black">
                      <QrCode className=" h-5 mx-1 w-5" color=" #e94c00" size={32} />
                      Get App
                    </button>
                  </Link>
                </li>
                <hr className="mx-4 my-1" />
                <li>
                  <Link to="/login">
                    <button onClick={() => { setOpenSmList(false); }}
                      className="text-sm p-2 text-black w-full">
                      <div>Log in</div>
                    </button>
                  </Link>
                </li>
                <hr className="mx-4 my-1" />
                <li>
                  <Link to="/register">
                    <button onClick={() => { setOpenSmList(false); }}
                      className="text-sm p-2 text-black w-full">
                      Create Account
                    </button>
                  </Link>
                </li>
              </ul>
            )}

            <div className="sm:flex items-center sm:visible hidden invisible w-auto">
              <div className="   lg:block  " id="navbar-default"></div>
              <Link to="/register">
                <button role="GetAppButton"
                  className="NavButtons flex sm:visible  invisible bg-gray-400 hover:bg-slate-500">
                  <QrCode className=" h-5 w-5 mx-1" color=" white" size={32} />
                  Get App
                </button>
              </Link>
              <Link to="/login">
                <button role="LogInButton"
                  className="NavButtons sm:block hidden bg-orange-600">
                  <div>Log in</div>
                </button>
              </Link>
              <Link to="/register">
                <button role="CreateAccountButton"
                  className="NavButtons sm:block hidden bg-orange-600">
                  Create Account
                </button>
              </Link>
            </div>
          </>)}
      </div>
      <div className="bg-gray-200 h-px mx-4"></div>

    </nav>


  );
}
