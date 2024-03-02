import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from '@/GeneralComponents/NavBar/NavBar';


export default [
    <Route path='/' key={'/'} element={<HomePage />}></Route>
]


