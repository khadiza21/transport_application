import { Parallax } from 'swiper/modules';
import useUsersAuth from '../../../hooks/useUsersAuth';
import Loading from '../../Shared/Loading/Loading';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import carimg from '../../../assets/car.jpg'
import Cover from '../../Shared/Cover/Cover';

const CommonDashboard = () => {
    const [userData, loading] = useUsersAuth();
    return (
        <div>
            <NavDashBoard>

            </NavDashBoard>
            <Cover img={carimg} title={'Welcome'}></Cover>


            <div className='px-44 my-24'>
                <div className="card lg:card-side bg-base-100 shadow-xl my-10 ">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New album is released!</h2>
                        <p>Click the button to listen on Spotiwhy app.</p>
                        <div className="card-actions ">
                            <button className="btn btn-primary">Listen</button>
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
                            <h1 className="text-5xl font-bold">!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    );
};

export default CommonDashboard;