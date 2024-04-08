import { Route } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';
import SearchPagesLayout from './SearchPages/SearchPagesRoutes';
import PostPage from './PostPage/PostPage';
import ViewerProfilePage from './ProfilePages/ViewerProfileRoutes';
import CommunityPage from './CommunityPage/CommunityPage';
import Settingpagelayout from '@/Features/Core/Settings/NavOfSetting';
import { HomeProvider } from './HomePage/HomePage';
import { CommunityProvider } from './CommunityPage/CommunityPage';


export default [
    <Route key={'/'} path='/' element={<HomeProvider><HomePage /></HomeProvider>} />,
    <Route key={'/user'} path='/user/:user/*' element={<ProfilePagesLayout />} />,
    <Route key={'/posts'} path='/posts/:id' element={<PostPage />} />,
    <Route key={'/search'} path='/search/:searchkey/*' element={<SearchPagesLayout />} />,
    <Route key={'/viewer'} path='/viewer/:viewer/*' element={<ViewerProfilePage />} />,
    <Route key={'/r'} path='/r/:community' element={<CommunityProvider><CommunityPage /></CommunityProvider>} />,
    <Route key={"/setting"} path="/setting/*" element={<Settingpagelayout />} />
]