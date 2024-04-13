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
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as z from 'zod';


export default function ForgetUsername() {
  const [str, setStr] = useState("");
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" max-w-[400px] border shadow p-6 rounded-lg">
        <h2 className="mb-3 text-xl font-bold">Recover your username</h2>
        <p className="text-sm">Tell us the email address associated with your Reddit account, and we'll send you an email with your username.</p>
        <TextBox value={str} onChanged={(e) => setStr(e.target.value)} className="mb-6 mt-4" placeholder="Email" />
        <div className="flex items-center gap-3 my-4 ">
          <Link className="text-blue-700 underline text-sm" to={`/register`}>
            Sign Up
          </Link>
          •
          <Link className="text-blue-700 underline text-sm" to={`/login`}>
            Log In
          </Link>
        </div>
        <Button disabled={!z.string().email().safeParse(str).success} className="w-full">Email me</Button>
      </div>
    </div>
  )
}
