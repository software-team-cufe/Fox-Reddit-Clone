import React from "react";
import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import GoogleIcon from "../../../../GeneralComponents/GoogleIcon";
/**
 * RegisterPage Component
 * 
 * This component is used for user registration.
 * 
 * @component
 * 
 * @example
 * 
 * return (
 *   <RegisterPage />
 * )
 * 
 * @returns {JSX.Element} The RegisterPage component.
 * 
 * Props:
 * None
 * 
 * State:
 * - gender: A state variable used to store the selected gender. It's initially set to the first gender in the `genders` array.
 * - loading: A state variable used to indicate whether the component is in a loading state. It's initially set to `false`.
 * 
 * Children:
 * - Button: A general purpose button component.
 * - ComboBox: A general purpose combo box component.
 * - TextBox: A general purpose text box component.
 * 
 * Functions:
 * - setGender: A function that updates the value of the `gender` state variable. It's used as the `onChange` handler for the ComboBox component.
 * - setLoading: A function that updates the value of the `loading` state variable.
 * - onSelect: A function that sets the selected gender when a gender is selected from the ComboBox.
 * 
 * External Libraries:
 * - react-router-dom: Used for the `Link` and `useNavigate` components, which are used to navigate between pages.
 * - react-toastify: Used to display notifications to the user.
 * - react-redux: Used for the `useDispatch` hook, which allows the component to dispatch actions to the Redux store.
 */

export default function RegisterPage({ }) {
    const [loading, setLoading] = useState(false);
    const disp = useDispatch();
    const nav = useNavigate();
    const handelContinueWithGoogle = () => { 

    };
    const register = async (e) => {
        const obj = Object.fromEntries(new FormData(document.getElementById("from-register")).entries());
        if (obj.password != obj.passwordConfirmation && obj.password != "" && obj.passwordConfirmation != "") {
            toast.error("Please enter the password!");
        }

        setLoading(true);
        try {

            const res = await userAxios.post('api/users/signup', obj);

            disp(setUser(res.data.user));
            nav('/login');
            setLoading(false);
        } catch (ex) {
            console.log(ex);
            setLoading(false);
        }

    }
    return (
        <section >
            <div className="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full  rounded-lg   md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-4 border shadow rounded-lg space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Sign Up
                        </h1>
                        <p className=" text-sm text-gray-400">
                            By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
                        </p>
                        <form id="from-register" className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => e.preventDefault()}>
                            <TextBox role={'name'} disabled={loading} label="username" placeholder="name" name="username" />
                            <TextBox role={'email'} disabled={loading} label="Email" placeholder="ex@domain.com" name="email" type="email" />
                            <TextBox role={'password'} disabled={loading} label="Password" placeholder="••••••••" name="password" type="password" />
                            <TextBox role={'confirm-password'} disabled={loading} label="Confirm password" placeholder="••••••••" name="passwordConfirmation" type="password" />
                            <p className="text-sm font-light text-gray-500 ">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline "
                                >
                                    Login
                                </Link>
                            </p>
                            <Button role="register-btn" className=" w-full" loading={loading} disabled={loading} onClick={register} >
                                Create account
                            </Button>
                            <button type="button" onClick={handelContinueWithGoogle} className=" border px-4 rounded-full w-full py-3 flex items-center justify-between">
                                <div className=" w-4">
                                    <GoogleIcon />
                                </div>

                                Continue With Google
                                <p></p>

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
