import React from "react";

import { userStore } from "@/hooks/UserRedux/UserStore"
import { useState } from "react";
import { useQuery } from 'react-query';
import Spinner from '../../../GeneralElements/Spinner/Spinner'
import { userAxios } from "../../../Utils/UserAxios";
import { useParams, useSearchParams } from "react-router-dom";
export default function VerifyEmailPage({ }) {
    const { token } = useParams();

   
    const { isLoading, isError, data } = useQuery("verify email", () => userAxios.get(`api/users/signup/verify/${token}`), {
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: true,
    });

    if (!isLoading && data != null) {
        return <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            <h4>Your email has been verified</h4>
        </div>
    }
    if (!isLoading && isError ) {
        return <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            <h4>Your email hasn't verified or the token has expired.</h4>
        </div>
    }
    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
            {
                isLoading && <Spinner />
            }
        </div>

    )
}
