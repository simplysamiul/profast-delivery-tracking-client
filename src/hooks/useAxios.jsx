import axios from "axios";

const axiousInstance = axios.create({
    baseURL: "https://zap-shift-server-indol.vercel.app"
})
const useAxios = () => {
    return axiousInstance;
};

export default useAxios;