
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import aboutVideo from '../../assets/about.mp4'
import AboutSection from './AboutSection';


const About = () => {
    return (
        <>

            <Helmet>
                <title>City Mover | About</title>
            </Helmet>
            <Cover videoBg={aboutVideo} title="Our Story" btntext="Get Started" buttonText={'/'}></Cover >
            <div className='container mx-auto px-4'>
                <div className='my-28 text-center '>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-slate-800 py-10 sm:py-12 md:py-14 rounded-3xl inline-block'>
                        <span className='text-yellow-500 font-bold'>Chose any category,</span> 
                        <span className='text-white font-bold'>from our Service to safe movement. </span> 
                    </h1>
                </div>


                <AboutSection></AboutSection>
            </div>

            

        </>
    );
};

export default About;