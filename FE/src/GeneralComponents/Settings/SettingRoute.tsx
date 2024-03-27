import Navofsetting from './Navofsetting';
import EmailSetting from './EmailSetting';
import Accountsetting from './Account';
import Notifications from './NotificationSettings';
import Safety from './SafetySettings';
import Feedsettings from './FeedSettings';
import ProfileSettings from './PofileSettings';
import { Route } from "react-router-dom";

export default [

    <Route key={"/setting"} path="/setting" element={<Accountsetting />} />,
    <Route key={"/setting/email"} path="/setting/email" element={<EmailSetting />} />,
    <Route key={"/setting/account"} path="/setting/account" element={<Accountsetting />} />,
    <Route key={"/setting/profile"} path="/setting/profile" element={<ProfileSettings />} />,
    <Route key={"/setting/safety&privacy"} path="/setting/safety&privacy" element={<Safety />} />,
    <Route key={"/setting/feedsettings"} path="/setting/feedsettings" element={<Feedsettings />} />,
    <Route key={"/setting/notifications"} path="/setting/notifications" element={<Notifications />} />,


];