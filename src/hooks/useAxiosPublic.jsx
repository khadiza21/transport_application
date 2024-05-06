import axios from 'axios';



const axiosPublic = axios.create({
    baseURL: 'https://transfor-f-server-jbh3rh2qc-bibi-khadizas-projects.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};
export default useAxiosPublic;