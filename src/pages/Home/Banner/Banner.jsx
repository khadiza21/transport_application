import { Parallax } from 'react-parallax';
import img2 from '../../../assets/2.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (


        <Parallax
            blur={{ min: -60, max: 60 }}
            bgImage={img2}
            bgImageAlt="transport app"
            strength={-200}
        >
            <div>
                <div className="hero h-screen" >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold uppercase"> <span className='text-yellow-600 font-bold'>CITY</span> MOVER</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <div className='flex flex-col md:flex-row gap-5 md:gap-2 justify-center'>
                              <Link to="/contact" className='btn btn-sm btn-warning px-8 font-bold'>Contact Us</Link>
                                <Link to="/about" className='btn btn-sm btn-white px-8  font-bold'>About Us</Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Banner;