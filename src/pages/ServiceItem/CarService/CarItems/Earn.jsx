import React from 'react';
import { Parallax } from 'react-parallax';
import caBanner from '../../../../assets/car.jpeg';
const Earn = () => {
    return (
        <div className='mb-36 '>
        <Parallax
       
            blur={{ min: -50, max: 50 }}
            bgImage={caBanner}
            bgImageAlt="car services"
            strength={-200}
        >
            <div>
                <div className="hero h-[700px]  " >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md ">
                            <h1 className="mb-5 text-5xl font-bold uppercase">Make Earn </h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in.</p>
                            <button className="btn px-10 font-bold">Earn By Car</button>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax></div>
    );
};

export default Earn;