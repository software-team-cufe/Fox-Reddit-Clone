import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import EmailSetting from './EmailSetting';
import Accountsetting from './Account';
import Notifications from './NotificationSettings';
import SafetySettings from './SafetySettings';
import Feedsettings from './FeedSettings';
import ProfileSettings from './PofileSettings';
import ChatMessaging from './chatMessaging';
import React from 'react';

/**
 * 
 * this function is used to make user switch between settings` pages
 * @returns {JSX.Element}
 * 
*/
function Navofsetting() {
    return (
        <div className="flex h-full w-full mt-10">
            <div
                className="bg-white md:min-w-40 LeSS:w-0 w-0 h-[737.6px]   max-w-40 mx-2" />
            <div className=" ">
                <h3 className="font-bold mb-8  ">User Settings</h3>
                <nav className="mb-10 ss:w-max  ">
                    <ul className="flex overflow-x-auto gap-10 w-screen mx-4 ">
                        <li className="block h-fit w-max text-gray-900 hover:bg-gray-200 md:hover:bg-transparent rounded-full py-1 px-2 md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to={`./account`}  className="hover:border-b-2 hover:border-orange-500">
                                <span>Account</span>
                            </Link>
                        </li>

                        <li className="block h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to={`./profile`}  className="hover:border-b-2 hover:border-orange-500">
                                <span>Profile</span>
                            </Link>
                        </li>

                        <li className="block flex-nowrap h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to="./safetyandprivacy" className="hover:border-b-2 hover:border-orange-500">
                                <span>Safety and Privacy</span>
                            </Link>
                        </li>

                        <li className="block h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to={`./feedsettings`} className="hover:border-b-2 hover:border-orange-500">
                                <span>Feed settings</span>
                            </Link>
                        </li>

                        <li className="block h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to="./notifications" className="hover:border-b-2 hover:border-orange-500">
                                <span>Notifications</span>
                            </Link>
                        </li>

                        <li className="block h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to='./email' className="hover:border-b-2 hover:border-orange-500">
                                <span>Emails</span>
                            </Link>
                        </li>

                        <li className="block h-fit w-max text-gray-900 rounded-full py-1 px-2 hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to={`./chat`} className="hover:border-b-2 hover:border-orange-500">
                                <span>Chat & Messaging</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="w-3/4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
};
/**
 * this function is used to make user switch between settings` pages
 * @module Settingpagelayout
 * 
 */

export default function Settingpagelayout() {

    return (
        // nested routing for the setting pages renders navofsetting then feed according to route
        <Routes>
            <Route element={<Navofsetting />} >
                <Route key={'/setting'} path='/' element={<></>} />
                <Route key={"/email"} path="/email" element={<EmailSetting />} />
                <Route key={"/account"} path="/account" element={<Accountsetting />} />
                <Route key={"/profile"} path="/profile" element={<ProfileSettings />} />
                <Route key={"/safety&privacy"} path="/safetyandprivacy" element={<SafetySettings />} />
                <Route key={"/feedsettings"} path="/feedsettings" element={<Feedsettings />} />
                <Route key={"/notifications"} path="/notifications" element={<Notifications />} />
                <Route key={"/chat"} path="/chat" element={<ChatMessaging />} />
            </Route>
        </Routes>

    )
}