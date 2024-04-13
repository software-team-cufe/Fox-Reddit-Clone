/**
 * Array of routes for authentication.
 * @type {Array<Route>}
 */
import {  Route  } from 'react-router-dom';
import LoginPage from './LoginPage/view/LoginPage';
import RegisterPage from './RegisterPage/View/RegisterPage';
import VerifyEmailPage from './VerifyEmail/VerifyEmail';
import ForgetUsername from './ForgetUsername/ForgetUsername';
import ForgetPassword from './ForgetPassword/ForgetPassword';


export default [
    <Route key={'/login'} path='/login' element={<LoginPage />} />,
    <Route key={'/register'} path='/register' element={<RegisterPage />} />,
    <Route key={'/verify-email'} path='/verify-email' element={<VerifyEmailPage />} />,
    <Route key={'/forget-username'} path='/forget-username' element={<ForgetUsername />} />,
    <Route key={'/forget-password'} path='/forget-password' element={<ForgetPassword />} />,
]
