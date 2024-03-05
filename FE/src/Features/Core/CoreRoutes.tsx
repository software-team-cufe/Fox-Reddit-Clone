import { Route } from 'react-router-dom';
import ProfilePagesLayout from './ProfilePages/ProfilePagesRoutes';
import HomePage from './HomePage/HomePage';

export default [
    <Route key={'/'} path='/' element={<HomePage />} />,
    <Route key={'/user'} path='/user/*' element={<ProfilePagesLayout />} />
]