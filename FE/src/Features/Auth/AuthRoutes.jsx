import {  Route  } from 'react-router-dom';
import LoginPage from './LoginPage/view/LoginPage';
import RegisterPage from './RegisterPage/View/RegisterPage';
import VerifyEmailPage from './VerifyEmail/VerifyEmail';


export default [
    <Route key={'/login'} path='/login' element={<LoginPage />} />,
    <Route key={'/register'} path='/register' element={<RegisterPage />} />,
    <Route key={'/verify-email'} path='/verify-email' element={<VerifyEmailPage />} />,
]
