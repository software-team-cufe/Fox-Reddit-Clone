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

    if (!email || !password || email == "" || password == "") {
      toast.error("Please enter all the required information.");
      return;
    }
    setLoading(true);
    try {
      const res = await userAxios.post('login', { email, password });
      const user = await userModel.parseAsync(res.data.user);
      disp(setUser(user));
      if (user.banned) {
        nav(0)
        return;
      }
      if (!user.verifiedEmail) {
        nav('/verify-email');
      } else {
        nav('/');
      }
    } catch (ex) {
      if (ex.issues != null && ex.issues.length != 0) {
        toast.error(ex.issues[0].message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-[80px] w-auto"
          src="/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form id="frm-login" className="space-y-6" onSubmit={login}>
          <TextBox name="email" disabled={loading} placeholder="me@domain.com" label="Email address" />
          <TextBox name="password" disabled={loading} placeholder="********" label="Password" />
          
          <Button disabled={loading} loading={loading} onClick={login} className="w-full">
            Login
          </Button>

        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>

  )
}
