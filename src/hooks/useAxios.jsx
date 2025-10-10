import axios from "axios";

const axiousInstance = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxios = () => {
    return axiousInstance;
};

export default useAxios;