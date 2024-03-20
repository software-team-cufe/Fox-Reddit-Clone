import { Route } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';
import SearchPagesLayout from './SearchPages/SearchPagesRoutes';
import ViewerProfilePage from './ProfilePages/viewerProfileRoutes';
import CommunityPage from './CommunityPage/CommunityPage';

export default [
    <Route key={'/'} path='/' element={<HomePage />} />,
    <Route key={'/user'} path='/user/*' element={<ProfilePagesLayout />} />,
    <Route key={'/search'} path='/search/*' element={<SearchPagesLayout />} />,
    <Route key={'/viewer'} path='/viewer/*' element={<ViewerProfilePage />} />,
    <Route key={'/r/community'} path='/r/community' element={<CommunityPage />} />
]