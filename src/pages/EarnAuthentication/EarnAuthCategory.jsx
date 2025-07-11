import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import BusDriver from './CreateAccount/BusDriver';
import CarDriver from './CreateAccount/CarDriver';

const EarnAuthCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState('bus');
    const categories = ['bus', 'car'];

    const handleCategoryClick = (category, event) => {
        event.preventDefault();
        setSelectedCategory(category);
    };

    return (
        <>
            <Helmet>
                <title>City Mover | Make Money</title>
            </Helmet>

            <div className="bg-gray-100 min-h-screen ">
                <div className="container px-4 mx-auto">
                    <div className='text-center font-bold pt-16 pb-5 text-2xl uppercase'><span className='font-bold text-yellow-600'>Sign</span> Up</div>
                    <div className="relative lg:w-1/2 mx-auto card-body px-6 md:px-10 bg-base-100 shadow rounded-lg">

                        <div className=" flex justify-center space-x-4 mb-4">
                            {categories.map((category) => (

                                <button
                                    key={category}
                                    onClick={(e) => handleCategoryClick(category, e)}
                                    className={classNames(
                                        'py-2 px-4 font-semibold rounded-lg focus:outline-none transition delay-5 duration-2 ease-in-out',
                                        selectedCategory === category
                                            ? ' border-b-4 underline text-yellow-700'
                                            : ' text-gray-800'
                                    )}
                                >
                                    {category.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {selectedCategory === 'bus' && <BusDriver />}
                        {selectedCategory === 'car' && <CarDriver />}

                    </div>
                </div>
            </div >
        </>
    );
};

export default EarnAuthCategory;