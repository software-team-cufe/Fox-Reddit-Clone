import React from "react";
import { Link, Outlet, Route, Routes, useLocation, useParams, } from "react-router-dom";
import EmailSetting from './EmailSetting';
import Accountsetting from './Account';
import Notifications from './NotificationSettings';
import SafetySettings from './SafetySettings';
import Feedsettings from './FeedSettings';
import ProfileSettings from './PofileSettings';
import ChatMessaging from './chat&messaging';
import { Settings } from 'lucide-react';

function Navofsetting() {
    const path = useLocation();
    return (
        <div className="ss:w-max">
            <h3 className="font-bold mb-16">User Settings</h3>
            <nav >
                <ul className="flex flex-wrap gap-10">
                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to={`/setting/account`}>
                            <span>Account</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to={`/profile`}>
                            <span>Profile</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to="setting/safetyandprivacy">
                            <span>SafetyandPrivacy</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to={`/feedsettings`}>
                            <span>Feed settings</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to="/notifications">
                            <span>Notifications</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to='setting/email'>
                            <span>Emails</span>
                        </Link>
                    </li>

                    <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <Link to={`setting/chat`}>
                            <span>Chat & Messaging</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    
    )
};


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