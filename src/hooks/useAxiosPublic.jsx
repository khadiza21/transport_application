import axios from 'axios';



const axiosPublic = axios.create({
    baseURL: 'https://transport-server2-1.onrender.com'
})

const useAxiosPublic = () => {
    return axiosPublic;
};
export default useAxiosPublic;