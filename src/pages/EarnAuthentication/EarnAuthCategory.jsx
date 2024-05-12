import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import BusDriver from './CreateAccount/BusDriver';
import CarDriver from './CreateAccount/CarDriver';


const EarnAuthCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState('bus');

    const categories = ['bus',  'car'];

    const handleCategoryClick = (category, event) => {
        event.preventDefault();
        setSelectedCategory(category);
    };
    return (
        <>
            <Helmet>
                <title>City Mover | Make Money</title>
            </Helmet>

            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                    </div>
                    <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
                        <div className=" flex justify-center space-x-4 mb-4">
                            {categories.map((category) => (
                         
                               <button
                                    key={category}
                                    onClick={(e) => handleCategoryClick(category, e)}
                                    className={classNames(
                                        'py-2 px-4 font-semibold rounded-lg focus:outline-none',
                                        selectedCategory === category
                                            ? ' border-b-4 underline text-yellow-700'
                                            : ' text-gray-800'
                                    )}
                                >
                                    {category.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <Transition
                            show={selectedCategory === 'bus'}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div>
                                <BusDriver></BusDriver>
                            </div>
                        </Transition>
                        <Transition
                            show={selectedCategory === 'car'}
                            enter="transition ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div>
                                <CarDriver></CarDriver>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>


        </>
    );
};

export default EarnAuthCategory;