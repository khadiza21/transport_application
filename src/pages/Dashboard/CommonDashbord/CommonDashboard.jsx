import useUsersAuth from '../../../hooks/useUsersAuth';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import carimg from '../../../assets/car.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const CommonDashboard = () => {
    const [userData, loading] = useUsersAuth();
    return (
        <div>
            <NavDashBoard>

            </NavDashBoard>
            <Cover img={carimg} title={'Welcome'}></Cover>


            <div className='px-44 my-24'>
                <div className="card lg:card-side bg-base-100 shadow-xl my-10 ">
                    <figure><img className='rounded-xl shadow-xl' src="https://t3.ftcdn.net/jpg/00/85/13/32/360_F_85133296_uRf7VrGLUDUj8Tq2kvCSViGxYE4vRQxB.jpg" alt="Album" /></figure>
                    <div className="card-body ml-10">
                        <h2 className="card-title text-4xl font-bold mt-14">Car Ride Available For All!</h2>
                        <p className='text-gray-400'>Click the button to listen on Spotiwhy app. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aspernatur id quo eos suscipit accusantium totam dolorem veniam ducimus? Consequuntur.</p>
                        <div className="card-actions mb-14 mt-5">
                        <Link to='/primeCar'> <button className="btn bg-slate-900 text-white hover:bg-slate-800">Book Car</button></Link>
                        </div>
                    </div>
                </div>
            </div>


            <Cover img={carimg} title={'Welcome'}></Cover>


            <div className='my-24 px-44 py-10'>
                <div className="hero  shadow-xl rounded-lg">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold">Bus Service Available for all ride!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to='/'> <button className="btn bg-slate-900 text-white  hover:bg-slate-800">Take Service</button></Link>
                           
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default CommonDashboard;