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
                <div className="hero min-h-[800px] " >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold uppercase"> <span className='text-yellow-600 font-bold'>CITY</span> MOVER</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-warning  px-10 font-bold"><Link to="/" className='font-bold'>Earn Money</Link></button> <br />
                            <button className="btn btn-white px-14 mt-4 "><Link to="/about" className='font-bold'>About Us</Link> </button>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>
    
    );
};
 
export default Banner;