import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as z from 'zod';

export default function ForgetUsername() {
  const [str, setStr] = useState("");
  console.log(z.string().email().safeParse(str).success);
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
