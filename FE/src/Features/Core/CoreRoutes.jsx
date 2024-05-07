import { Route, Routes } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';
import SearchPagesLayout from './SearchPages/SearchPagesRoutes';
import PostPage from './PostPage/PostPage';
import ViewerProfilePage from './ProfilePages/ViewerProfileRoutes';
import CommunityPage from './CommunityPage/CommunityPage';
import Settingpagelayout from '@/Features/Core/Settings/NavOfSetting';
import { HomeProvider } from './HomePage/HomePage';
import { CommunityProvider } from './CommunityPage/CommunityPage';
import CreatePostPage from './CreatePostPage/CreatePostPage';
import ChatPage from './ThreadsPage/ChatPage';
import NotificationPage from '../../GeneralComponents/Notification & messages/NotificationPage';
import PrivateMessagelayout from './PrivateMessage/PrivateMessage';
import TopCommunities from '../../GeneralComponents/SideBar/TopCommunities';
import RulesRemovalPage from './CommunityPage/rulesRemoval/rulesRemovalpage';
import ModNavbar from '../../GeneralComponents/ModNavbar/ModNavbar';
import UserManagemntRoutes from './moderation/about/UserManagement/pages/UserManagemntRoutes';
import ModSettingsPage from './moderation/about/Settings/ModSettingsPage';
import EditPage from './moderation/about/EditPage/EditPage';
import RemovedPage from './moderation/about/ModQueue/RemovedPage';
import EditedPage from './moderation/about/ModQueue/EditedPage';
import UnmoderatedPage from './moderation/about/ModQueue/UnmoderatedPage';
import ScheduledPosts from './moderation/about/SchedulledPosts/ScheduledPosts';
function CommunityLayout() {
    return <div className='flex gap-3 w-full h-full'>

        <Routes>
            <Route path='/' element={<CommunityProvider><CommunityPage /></CommunityProvider>} />
            <Route path='/about/*' element={<div className='flex gap-3 w-full h-full'>


                <ModNavbar />
                <Routes>
                    <Route path='/*' element={<RulesRemovalPage></RulesRemovalPage>} />
                    <Route path='/edit' element={<EditPage />} />
                    <Route path='/user-management/*' element={<UserManagemntRoutes />} />
                    <Route path='/settings' element={<ModSettingsPage />} />
                    <Route path='/spam' element={<RemovedPage />} />
                    <Route path='/edited' element={<EditedPage />} />
                    <Route path='/unmoderated' element={<UnmoderatedPage />} />
                    <Route path='/scheduledposts' element={<ScheduledPosts />} />
                </Routes>
            </div>
            } />
        </Routes>
    </div>
}


export default [
    <Route key={'/'} path='/' element={<HomeProvider><HomePage /></HomeProvider>} />,
    <Route key={'/user'} path='/user/:user/*' element={<ProfilePagesLayout />} />,
    <Route key={'/posts'} path='/posts/:id' element={<PostPage />} />,
    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<ViewerProfilePage />} />,
    <Route key={'/r'} path='/r/:community/*' element={<CommunityLayout />} />,
    <Route key={"/setting"} path="/setting/*" element={<Settingpagelayout />} />,
    <Route key={"/submit"} path="/submit/*" element={< CreatePostPage />} />,
    <Route key={"/threads"} path="/chat/:id" element={<ChatPage />} />,
    <Route key={"/notification"} path="/notification/*" element={<NotificationPage />} />,
    <Route key={"/message"} path="/message/*" element={<PrivateMessagelayout />} />,
    <Route key={"/notification"} path="/notification/*" element={<NotificationPage />} />,
    <Route key={'/community'} path='/community' element={<TopCommunities />} />,
  
]