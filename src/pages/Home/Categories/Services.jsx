import React from 'react';

const Services = ({ item }) => {
    const { serviceType, description, img } = item;
    return (

        <div className="flex flex-col gap-5  md:flex-row justify-center items-center p-5 rounded shadow-lg">
            <div className='w-full md:w-1/2'><img src={img} alt="service vehicles" /></div>
            <div className="w-full md:w-1/2">
                <h2 className="card-title uppercase font-bold">{serviceType}</h2>
                <p>{description}</p>

            </div>
        </div>

    );
};

export default Services;