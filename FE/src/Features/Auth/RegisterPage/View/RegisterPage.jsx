import React from "react";
import Button from "@/GeneralElements/Button/Button";
import ComboBox from "@/GeneralElements/ComboBox/ComboBox";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import userModel from "@/Models/UserModel";
import { userAxios } from "@/Utils/UserAxios";
import { setUser } from "@/hooks/UserRedux/UserModelSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const genders = [{ text: "Male", value: true, }, { text: "Female", value: false, }];
export default function RegisterPage({ }) {
    const [gender, setGender] = useState(genders[0]);
    const [loading, setLoading] = useState(false);
    // const disp = useDispatch();
    const nav = useNavigate();

    const onSelect = (e) => {
        setGender(e);
    };
    const register = async (e) => {
        nav('/');
        // const obj = Object.fromEntries(new FormData(document.getElementById("from-register")).entries());
        // if (obj.password != obj.confirmPassword && obj.password != "" && obj.confirmPassword != "") {
        //     toast.error("Please enter the password!");
        // }
        // obj.gender = gender.value;
        // setLoading(true);
        // try {
        //     const data = await userModel.parseAsync(obj);
        //     const res = await userAxios.post('signup', data);
        //     const user = await userModel.parseAsync(res.data.user);
        //     disp(setUser(user));
        //     nav('/verify-email');
        //     setLoading(false);
        // } catch (ex) {
        //     if (ex.issues != null && ex.issues.length != 0) {
        //         toast.error(ex.issues[0].message);
        //     }
        //     setLoading(false);
        // }

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
                            <TextBox role={'name'} disabled={loading} label="name" placeholder="name" name="name" />
                            <TextBox role={'email'} disabled={loading} label="Email" placeholder="ex@domain.com" name="email" type="email" />
                            <TextBox role={'password'} disabled={loading} label="Password" placeholder="••••••••" name="password" type="password" />
                            <TextBox role={'confirm-password'} disabled={loading} label="Confirm password" placeholder="••••••••" name="confirmPassword" type="password" />
                            <TextBox role={'phone'} disabled={loading} label="Phone" placeholder="0xx23456789" name="phone" />
                            <ComboBox role="gender" text="Gender" items={genders} selected={gender} onSelect={onSelect} />
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

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
