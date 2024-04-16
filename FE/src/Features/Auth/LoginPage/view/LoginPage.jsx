
/**
 * LoginPage component for user login.
 * @module LoginPage
 * @component
 * @example
 * return (
 *   <LoginPage />
 * )
 * @returns {JSX.Element} The LoginPage component.
 */
import React from "react";
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import userModel from "@/Models/UserModel";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function LoginPage({ }) {

  const [loading, setLoading] = useState(false);
  const disp = useDispatch();
  const nav = useNavigate();
  const login = async (e) => {
    e?.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(document.getElementById("frm-login")).entries());
    console.log({ email, password });
    if (!email || !password || email == "" || password == "") {
      toast.error("Please enter all the required information.");
      return;
    }
    setLoading(true);
    try {
      const res = await userAxios.post('auth/login', { username: email, password });

      disp(setUser(res.data.user));
     
      nav('/');
    } catch (ex) {
      if (ex.issues != null && ex.issues.length != 0) {
        toast.error(ex.issues[0].message);
      }
    }
    setLoading(false);
  };

  return (
    <div

      className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded-md border shadow p-7 w-fit">
        <div className="">

          <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In
          </h2>
          <p className=" text-sm text-gray-400">
            By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
          </p>
        </div>
        <div className="mt-10">
          <form id="frm-login" className="space-y-6" onSubmit={login}>
            <TextBox role="email" name="email" disabled={loading} placeholder="me@domain.com" label="Email address" />
            <TextBox role="password" name="password" disabled={loading} placeholder="********" label="Password" />
            <div className=" space-y-2" >
              <p className="mt-4 text-sm text-gray-500">
                Forgot your <Link className="text-blue-700 underline text-sm" to={`/forget-username`}>
                  username
                </Link> or <Link className="text-blue-700 underline text-sm" to={`/forget-password`}>
                  password
                </Link>?
              </p>
              <p className="  text-sm text-gray-500">
                New to Reddit? {" "}
                <Link
                  to="/register"
                  className="font-semibold hover:underline leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Create account
                </Link>
              </p>
            </div>
            <Button role="login-btn" disabled={loading} loading={loading} onClick={login} className="w-full">
              Login
            </Button>

          </form>


        </div>
      </div>
    </div>

  )
}
