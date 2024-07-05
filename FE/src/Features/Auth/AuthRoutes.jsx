/**
 * Array of routes for authentication.
 * @type {Array<Route>}
 */
import {  Route  } from 'react-router-dom';
import LoginPage from './LoginPage/view/LoginPage';
import RegisterPage from './RegisterPage/View/RegisterPage';
import VerifyEmailPage from './VerifyEmail/VerifyEmail';
import ForgetPasswordForm from './ForgetPasswordForm/ForgetPasswordForm';
import ForgetPassword from './ForgetPassword/ForgetPassword';


export default [
    <Route key={'/login'} path='/login' element={<LoginPage />} />,
    <Route key={'/register'} path='/register' element={<RegisterPage />} />,
    <Route key={'/verify-email'} path='/verify-email/:token' element={<VerifyEmailPage />} />,
    <Route key={'/forget-password-form'} path='/forget-password/:token' element={<ForgetPasswordForm />} />,
    <Route key={'/forget-password'} path='/forget-password' element={<ForgetPassword />} />,
]
