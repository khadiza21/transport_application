import axios from 'axios';



const axiosPublic = axios.create({
    baseURL: 'https://transfar-f-server2.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};
export default useAxiosPublic;