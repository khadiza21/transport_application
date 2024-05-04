import { Link } from 'react-router-dom';
import femalebus from '../../../assets/femalebus.jpg';


const BusCatF = () => {
    return (
        <>
            <div className="hero py-8 my-24  ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="pl-14 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Available Only Female Bus Service</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary"> <Link className="font-semibold uppercase border-orange-400" to='/femalebus'>  Take Service </Link></button>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <img src={femalebus} className="max-w-sm rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>

        </>
    );
};

export default BusCatF;