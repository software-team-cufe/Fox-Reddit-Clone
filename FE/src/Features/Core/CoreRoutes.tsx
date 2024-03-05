import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from '@/GeneralComponents/NavBar/NavBar';
import ProfileOverview from './profilePages/profileoverview';
import { Fragment } from 'react';

export default [
    <>
    <Route path='/' key={'/'} element={<HomePage />}></Route><Route path='/overview' key={'/'} element={<ProfileOverview userName="user"/>}></Route>
    </>
]


