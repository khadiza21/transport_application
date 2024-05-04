
import {useNavigation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from './useAxiosPublic';

const GoogleLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigation();
    



    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        })

    }
    return (
        <div>
            <div className="divider py-0 my-0 "></div>
            <div className="w-full text-center">

                <button onClick={handleGoogleSignIn} className=" w-full py-0 my-0 btn bg-black btn-outline hover:bg-slate-800 text-white">
                    <FaGoogle></FaGoogle><span className='font-bold'>Continue With Google...</span>
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;