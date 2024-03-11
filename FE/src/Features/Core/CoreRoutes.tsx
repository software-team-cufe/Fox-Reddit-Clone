import { Route } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';
import SearchPagesLayout from './SearchPages/SearchPagesRoutes';
import CreateCommunity from '@/GeneralComponents/CreateCommunity/CreateCommunity';

export default [
    <Route key={'/'} path='/' element={<HomePage />} />,
    <Route key={'/user'} path='/user/*' element={<ProfilePagesLayout />} />,
    <Route key={'/search'} path='/search/*' element={<SearchPagesLayout />} />,
    <Route key={'/create'} path="create" element={<CreateCommunity />} />
]