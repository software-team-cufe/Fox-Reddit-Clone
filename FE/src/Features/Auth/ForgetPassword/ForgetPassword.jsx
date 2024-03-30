import React from "react";
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" max-w-[400px] border shadow p-6 rounded-lg">
        <h2 className="mb-3 text-xl font-bold">Reset your password</h2>
        <p className="text-sm">Tell us the username and email address associated with your Reddit account, and we’ll send you an email with a link to reset your password.</p>
        <TextBox role={'username'} className="my-4" placeholder="Username" />
        <TextBox role={'email'} className="mb-6" placeholder="Email" />
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


        <Button role="btn" className="w-full" onClick={() => window.location.href = '/'}>Reset Password</Button>
      </div>
    </div>
  )
}
