import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import aboutimg from '../../assets/our_story.webp'
import AboutSection from './AboutSection';


const About = () => {
    return (
        <>

            <Helmet>
                <title>City Mover | About</title>
            </Helmet>
            <Cover img={aboutimg} title="Our Story" btntext="Go Home" buttonText={'/'}></Cover >
            <div className='px-44'>


                <div className='my-28  '>
                    <h1 className='text-7xl  bg-slate-800 py-16 px-10 rounded-[70px] '><span className='text-yellow-500 font-bold'>Chose any category,</span> <span className='text-white font-bold'>from our Service to safe movement. </span> </h1>
                </div>

                <AboutSection></AboutSection>
            </div>

            

        </>
    );
};

export default About;