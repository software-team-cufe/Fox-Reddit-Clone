import Navofsetting from './Navofsetting';
import EmailSetting from './EmailSetting';
import Accountsetting from './Account';
import Notifications from './NotificationSettings';
import Safety from './SafetySettings';
import Feedsettings from './FeedSettings';
import ProfileSettings from './PofileSettings';
import ChatMessaging from './chatmessaging';
import { Route } from "react-router-dom";
import SafetySettings from './SafetySettings';

export default [

    <Route key={"/setting"} path="/setting" element={<Navofsetting />} />,
    <Route key={"/setting/email"} path="/setting/email" element={<EmailSetting />} />,
    <Route key={"/setting/account"} path="/setting/account" element={<Accountsetting />} />,
    <Route key={"/setting/profile"} path="/setting/profile" element={<ProfileSettings />} />,
    <Route key={"/setting/safety&privacy"} path="/setting/safety&privacy" element={<SafetySettings />} />,
    <Route key={"/setting/feedsettings"} path="/setting/feedsettings" element={<Feedsettings />} />,
    <Route key={"/setting/notifications"} path="/setting/notifications" element={<Notifications />} />,
    <Route key={"/setting/chat"} path="/setting/chat" element={<ChatMessaging />} />

];