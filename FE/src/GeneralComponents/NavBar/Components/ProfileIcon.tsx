
import { Avatar, AvatarFallback, AvatarImage } from "@/GeneralComponents/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/GeneralComponents/dropdown-menu';
import { logOutUser } from "@/hooks/UserRedux/UserModelSlice";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileIcon({ }) {
    const [show, setShow] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();
    const user = userStore.getState().user.user;
    if (user == null) {
        return <></>
    }
    const logOut = () => {
        disp(logOutUser());
        nav(0);
        return;
    };
    return (
        <div className="ml-3">

            <button
                onClick={() => setShow(!show)}
                type="button"
                className="flex text-sm m-0 rounded-full border w-[40px]  items-center justify-center aspect-square focus:ring-2 focus:ring-gray-300"
                id="user-menu-button-2"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-2"
            >
                <span className="sr-only"></span>
                <i className="fa-solid fa-user text-lg p-0 m-0"></i>
            </button>
            {
                show && <>
                    <div onClick={() => setShow(false)} className="absolute top-0 left-0 right-0 bottom-0 " />
                    <div
                        className="z-50 my-4 text-base list-none bg-white shadow border rounded divide-y divide-gray-100 block"
                        id="dropdown-2"
                        style={{
                            position: "absolute",
                            inset: "auto auto auto auto",
                            margin: 0,
                        }}
                        data-popper-placement="bottom">

                        <div className="py-3 px-4" role="none">
                            <p className="text-sm " role="none">
                                {user.name}
                            </p>
                            <p className="text-sm font-medium  truncate" role="none">
                                {user.email}
                            </p>
                        </div>
                        <ul className="list-none py-1" role="none">
                            <li>
                                <Link
                                    onClick={() => setShow(false)}
                                    to="/settings"
                                    className="block py-2 px-4 text-sm   hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Settings
                                </Link>
                            </li>
                            {
                                (userStore.getState().user.user != null && !userStore.getState().user.user.verifiedEmail) && <li>
                                    <Link
                                        onClick={() => setShow(false)}
                                        to="/verify-email"
                                        className="block py-2 px-4 text-sm   hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Active account
                                    </Link>
                                </li>
                            }

                            <li onClick={logOut} className="block cursor-pointer py-2 px-4 text-sm   hover:bg-gray-100">
                                logout
                            </li>
                        </ul>
                    </div>
                </>
            }
        </div>

    )
}
