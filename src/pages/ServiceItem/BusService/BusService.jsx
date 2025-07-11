import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import busVideo from '../../../assets/bus.mp4';

import BusCatF from './BusCatF';
import BusCatP from './BusCatP';
const BusService = () => {
    return (
        <>
            <Helmet>
                <title>City Mover | Bus Service</title>
            </Helmet>
            <Cover videoBg={busVideo} title="Bus services" btntext="Earn By Bus" buttonText='/' ></Cover>
            <BusCatF></BusCatF>
            <BusCatP></BusCatP>
        </>
    );
};

export default BusService;