
import axios from "axios";
import { toast } from "react-toastify";
import { extractAxiosError } from "./Utils";

const userAxios = axios.create({
    baseURL: "http://app.fox-nour:3000/",
    withCredentials: true,

})
userAxios.interceptors.request.use(request => {

    request.headers.set('authorization', `Bearer ${localStorage.getItem('authorization')}`);
    request.headers.set('refreshToken', `Bearer ${localStorage.getItem('refreshToken')}`);
    return request;
}, error => {
    return Promise.reject(error);
});

userAxios.interceptors.response.use(response => {
    const token = response.data.accessToken ?? response.data.token;
    if (token != null) {
        localStorage.setItem('authorization', token);
    }
    if (response.data.refreshToken != null) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    if(response?.data?.status == 'succeeded'){
        toast.success(response?.data?.status);
        return response;
    }
    if (response != null && response.data.msg != null) {
        toast(response.data.msg);
        return response;
    }

    return response;
},
    error => {
        if (error?.response?.data?.error != null) {
            toast.error(error?.response?.data?.error);
            return Promise.reject(error);
        }
        const err = extractAxiosError(error);
        if (err != null) {
            toast.error(err);
            return Promise.reject(error);
        }
        if (error.response == null) {
            toast.error("Please check your internet connection and try again.");
        } else if (error.response != null && error.response.data.msg != null) {
            toast.error(error.response.data.msg);
            error.message = null;
        }
        else if (error.response != null && error.response.data.errors != null && error.response.data.errors.length != 0) {
            toast.error(error.response.data.errors[0].msg);
            error.message = null;
        }
        return Promise.reject(error);
    });


export { userAxios };
