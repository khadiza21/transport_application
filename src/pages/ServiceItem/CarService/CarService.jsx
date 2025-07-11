import React from 'react';

import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import CarItems from './CarItems/CarItems';
import carmax from "../../../assets/car.mp4";
import Earn from './CarItems/Earn';

const CarService = () => {
    return (
        <div>
            <Helmet>
                <title>City Mover | Car Service</title>
            </Helmet>
            <Cover videoBg={carmax} title="Car services" btntext="Earn By Car"></Cover>
            <CarItems></CarItems>
            <Earn></Earn>



        </div>
    );
};

export default CarService;