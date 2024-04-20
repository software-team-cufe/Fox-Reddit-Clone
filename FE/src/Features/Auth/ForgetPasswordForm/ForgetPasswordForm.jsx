/**
 * ForgetUsername Component
 * 
 * This component is used for recovering a user's username.
 * @module ForgetUsername
 * 
 * @component
 *  
 * Props:
 * None
 * 
 * State:
 * - str: A string state variable used to store the value of the email input field.
 * 
 * Children:
 * - Button: A general purpose button component.
 * - TextBox: A general purpose text box component.
 * 
 * Functions:
 * - setStr: A function that updates the value of the `str` state variable. It's used as the `onChange` handler for the TextBox component.
 * 
 * External Libraries:
 * - react-router-dom: Used for the `Link` component, which is used to navigate to the register page.
 * - zod: A library for creating schemas and validating data. It's imported in this file, but it's not used in the component.
 * 
 * @example
 * 
 * return (
 *   <ForgetUsername />
 * )
 * 
 * @returns {JSX.Element} The ForgetUsername component.
 *
 * 
 */
import React from "react";
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'

export default function ForgetPasswordForm() {
  const [str, setStr] = useState("");
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const disp = useDispatch();
  const nav = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    const obj = Object.fromEntries(new FormData(document.getElementById("forgetPassword")).entries());
    console.log(obj);

    setLoading(true);
    try {
      const res = await userAxios.post(`api/users/resetpassword?token=${token}`, obj);
      nav('/login');
      setLoading(false);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={resetPassword} id="forgetPassword" className=" max-w-[400px] border shadow p-6 rounded-lg">
        <h2 className="mb-3 text-xl font-bold">Reset your password`</h2>
        <TextBox name={"password"} className="mb-6 mt-4" placeholder="Password" />
        <TextBox name={"passwordConfirmation"} className="mb-6 mt-4" placeholder="Confirm Password" />
        <div className="flex items-center gap-3 my-4 ">
          <Link className="text-blue-700 underline text-sm" to={`/register`}>
            Sign Up
          </Link>
          •
          <Link className="text-blue-700 underline text-sm" to={`/login`}>
            Log In
          </Link>
        </div>
        <Button disabled={loading} loading={loading} className="w-full">Email me</Button>
      </form>
    </div>
  )
}
