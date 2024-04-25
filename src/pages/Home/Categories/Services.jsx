import React from 'react';

const Services = ({ item }) => {
    const { serviceType, description, img } = item;
    return (

        <div className="card lg:card-side bg-base-100 shadow-2xl">
            <figure><img src={img} alt="service vehicles" /></figure>
            <div className="card-body">
                <h2 className="card-title uppercase font-bold">{serviceType}</h2>
                <p>{description}</p>

            </div>
        </div>

    );
};

export default Services;