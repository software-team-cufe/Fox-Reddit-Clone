import React, { useState } from "react";
import Navofsetting from './navofsetting';
import EmailSetting from './EmailSetting';
import Accountsetting from './Account';
import ChatMessaging from './chat&messaging';
import Notifications from './notifications';
import Subscription from './subscriptions';
import Safety from './Safety';
import Feedsettings from './feedsettings';
import Profile from './ProfileSettings/profile';
import { Route, Routes } from "react-router-dom";



export default [
  <Route key={"/setting"} path="/setting" element={<Navofsetting />} />,
  <Route key={"/setting/email"} path="/setting/email" element={<EmailSetting />} />,
  <Route key={"/setting/account"} path="/setting/account" element={<Accountsetting />} />,
  <Route key={"/setting/profile"} path="/setting/profile" element={<Profile />} />,
  <Route key={"/setting/safety&privacy"} path="/setting/safety&privacy" element={<Safety />} />,
  <Route key={"/setting/feedsettings"} path="/setting/feedsettings" element={<Feedsettings />} />,
  <Route key={"/setting/notifications"} path="/setting/notifications" element={<Notifications />} />,
  <Route key={"/setting/subscription"} path="/setting/subscription" element={<Subscription />} />,
  <Route key={"/setting/chat&messaging"} path="/setting/chat&messaging" element={<ChatMessaging />} />,
]

