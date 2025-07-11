import { Link } from 'react-router-dom';
import femalebus from '../../../assets/femalebus.jpg';
import useUsersAuth from '../../../hooks/useUsersAuth';


const BusCatF = () => {
    const [userData, loading] = useUsersAuth();
    console.log(userData?.gender, 'gender find')
    return (
        <>
            <div className="container px-4 mx-auto py-8 my-24">
                <div className="px-4 md:px-8 lg:px-16 py-10 flex flex-col lg:flex-row-reverse items-center gap-10">

                    <div className="text-center lg:text-left w-full lg:w-2/3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                            Available Only Female Bus Service
                        </h1>
                        <p className="py-4 text-sm sm:text-base text-gray-600">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>

                        {userData?.gender === 'female' ? (
                            <Link
                                className="inline-block mt-4 font-semibold uppercase border-orange-400"
                                to="/femalebus"
                            >
                                <button className="btn btn-outline border-0 bg-slate-200 border-b-4">
                                    Take Service
                                </button>
                            </Link>
                        ) : (
                            <button
                                className="btn btn-outline border-0 bg-slate-200 border-b-4 mt-4"
                                disabled
                            >
                                Take Service
                            </button>
                        )}
                    </div>


                    <div className="w-full lg:w-1/3">

                        <img
                            src={femalebus}
                            alt="Female Bus"
                            className="w-full h-auto rounded-lg shadow object-cover"
                        />

                    </div>
                </div>

            </div>

        </>
    );
};

export default BusCatF;