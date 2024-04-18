/**
 * Renders the ForgetPassword component.
 * This component allows users to reset their password by providing their username and email address.
 *
 * @module ForgetPassword
 * 
 * @returns {JSX.Element} The ForgetPassword component.
 */
import React from "react";
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
export default function ForgetPassword() {
 
  const [loading, setLoading] = useState(false);
  const disp = useDispatch();
  const nav = useNavigate();

  const forgetPassword = async (e) => {
    e.preventDefault();
    const obj = Object.fromEntries(new FormData(document.getElementById("forgetPassword")).entries());
    console.log(obj);

    setLoading(true);
    try {

      const res = await userAxios.post('api/users/forgotpassword', obj);

      disp(setUser(res.data.user));
      nav('/login');
      setLoading(false);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }

  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={forgetPassword} id="forgetPassword" className=" max-w-[400px] border shadow p-6 rounded-lg">
        <h2 className="mb-3 text-xl font-bold">Reset your password</h2>
        <p className="text-sm">Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.</p>
        {/* <TextBox name={'username'} role={'username'} className="mb-6" placeholder="username" /> */}
        <TextBox name={'email'} role={'email'} className="mb-6" placeholder="Email" />
        <Link className="text-blue-700 underline text-sm" to={`/forget-username`}>
          Forgot your username ?
        </Link>
        <div className="flex items-center gap-3 my-4 ">
          <Link className="text-blue-700 underline text-sm" to={`/register`}>
            Sign Up
          </Link>
          •
          <Link className="text-blue-700 underline text-sm" to={`/login`}>
            Log In
          </Link>
        </div>


        <Button disabled={loading} loading={loading}    role="btn" className="w-full" type="submit">Reset Password</Button>
      </form>
    </div>
  )
}
