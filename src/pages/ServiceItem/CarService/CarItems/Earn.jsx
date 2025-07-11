import { Parallax } from 'react-parallax';
import caBanner from '../../../../assets/car.jpeg';
import { Link } from 'react-router-dom';
const Earn = () => {
    return (
       
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={caBanner}
            bgImageAlt="car services"
            strength={-200}
        >
            <div>
                <div className="hero h-screen" >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md ">
                            <h1 className="mb-5 text-5xl font-bold uppercase">Make Earn </h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in.</p>
                            <Link className='btn' to='/cardriverdashboard'>Provide Car Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Earn;