import { Link } from 'react-router-dom';
import publicbus from '../../../assets/publicbus.jpeg'; 

const BusCatP = () => { 

    return (
        <div>
            <div className="container px-4 mx-auto py-8 my-24">
                <div className="px-4 md:px-8 lg:px-16 py-10 flex flex-col lg:flex-row items-center gap-10">

                    <div className="text-center lg:text-left w-full lg:w-2/3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                            Available Bus Service For All
                        </h1>
                        <p className="py-4 text-sm sm:text-base text-gray-600">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link
                            className="inline-block mt-4 font-semibold uppercase border-orange-400"
                            to='/publicbus'
                        >
                            <button className="btn btn-outline border-0 bg-slate-200 border-b-4">
                                Take Service
                            </button>
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <img
                            src={publicbus}
                            alt="Female Bus"
                            className="w-full h-auto rounded-lg shadow object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BusCatP;