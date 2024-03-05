import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from '@/GeneralComponents/NavBar/NavBar';
import ProfileOverview from './profilePages/profileoverview';
import ProfileComments from './profilePages/profilecomments';
import ProfileDownvoted from './profilePages/ProfileDownvoted';
import ProfileUpvoted from './profilePages/profileupvoted';
import ProfileSaved from './profilePages/profileSaved';
import ProfileHidden from './profilePages/profilehidden';
import ProfilePosts from './profilePages/Profileposts';
import { Fragment } from 'react';

export default [
    <>
    <Route path='/' key={'/'} element={<HomePage />}></Route>
    <Route path='/overview' key={'/'} element={<ProfileOverview userName="user"/>}></Route>
    <Route path='/comments' key={'/'} element={<ProfileComments userName="user"/>}></Route>
    <Route path='/posts' key={'/'} element={<ProfilePosts userName="user"/>}></Route>
    <Route path='/hidden' key={'/'} element={<ProfileHidden userName="user"/>}></Route>
    <Route path='/downvoted' key={'/'} element={<ProfileDownvoted userName="user"/>}></Route>
    <Route path='/upvoted' key={'/'} element={<ProfileUpvoted userName="user"/>}></Route>
    <Route path='/saved' key={'/'} element={<ProfileSaved userName="user"/>}></Route>
    </>
]


