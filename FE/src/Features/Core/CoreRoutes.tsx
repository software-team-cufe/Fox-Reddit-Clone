import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';

export default [
    <Route key={'/'} path='/' element={<HomePage />} />,
    <Route key={'/user'} path='/user/*' element={<ProfilePagesLayout />} />
]