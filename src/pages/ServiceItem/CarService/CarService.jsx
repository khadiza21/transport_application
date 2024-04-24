import React from 'react';
import caBanner from '../../../assets/car.jpeg';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import CarItems from './CarItems/CarItems';


const CarService = () => {
    return (
        <div>
            <Helmet>
                <title>City Mover | Car Service</title>
            </Helmet>
            <Cover img={caBanner} title="Car services"></Cover>

            <CarItems></CarItems>

        </div>
    );
};

export default CarService;