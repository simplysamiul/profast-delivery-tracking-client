import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiousSecure = axios.create({
    baseURL: "https://zap-shift-server-indol.vercel.app"
})

const useAxiosSecure = () => {
    const naviagte = useNavigate();
    const { user } = useAuth();

    // Remove old interceptors 
    axiousSecure.interceptors.request.handlers = [];
    axiousSecure.interceptors.response.handlers = [];

    axiousSecure.interceptors.request.use((config) => {
        const token = user?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
        }
        return config
    }, error => {
        return Promise.reject(error);
    })


    axiousSecure.interceptors.response.use((res) => {
        return res;
    }, (error => {
        if (error.status === 403) {
            naviagte("/forbidden")
        }
        return Promise.reject(error);
    }))



    return axiousSecure;
};

export default useAxiosSecure;


