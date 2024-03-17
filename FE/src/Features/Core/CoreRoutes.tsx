import { Route } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';
import SearchPagesLayout from './SearchPages/SearchPagesRoutes';
import CreateCommunity from '@/GeneralComponents/CreateCommunity/CreateCommunity';
import viewerProfilePage from './ProfilePages/viewerProfileRoutes';
import ViewerProfilePage from './ProfilePages/viewerProfileRoutes';

export default [
    <Route key={'/'} path='/' element={<HomePage />} />,
    <Route key={'/user'} path='/user/*' element={<ProfilePagesLayout />} />,
    <Route key={'/search'} path='/search/*' element={<SearchPagesLayout />} />,
    <Route key={'/viewer'} path='/viewer/*' element={<ViewerProfilePage />} />,
]