import React from "react";
import { Settings } from 'lucide-react';

export default function Navofsetting() {
  return (
    <div>
        <h3 className="font-bold mb-16">User Settings</h3>
        <nav >
            {/*there is an issue in the styling of navbar*/}
            <ul className="flex flex-wrap gap-10">
                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/Account">
                        <span>Account</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/profile">
                        <span>Profile</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/Safety&Privacy">
                        <span>Safety & Privacy</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/Notifications">
                        <span>Notifications</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/email">
                        <span>Emails</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/Subscription">
                        <span>Subscription</span>
                    </a>
                </li>

                <li className="block text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <a href="/setting/Chat&Messaging">
                        <span>Chat & Messaging</span>
                    </a>
                </li>
            </ul>
            <hr></hr>
        </nav>
    </div>
    )};