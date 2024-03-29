import axios from "axios";
import { toast } from "react-toastify";

const userAxios = axios.create({
    baseURL: "http://localhost:3002/",
    
})


userAxios.interceptors.response.use(response => {
    if (response.data.token != null) {
        localStorage.setItem('token', response.data.token);
    }
    if (response != null && response.data.msg != null) {
        toast(response.data.msg);
    }
    return response;
}, 
error => {
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
