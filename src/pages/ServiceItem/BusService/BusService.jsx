import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import busimg from '../../../assets/buscover.jpg';

import BusCatF from './BusCatF';
import BusCatP from './BusCatP';
const BusService = () => {
    return (
        <>
            <Helmet>
                <title>City Mover | Bus Service</title>
            </Helmet>
            <Cover img={busimg} title="Bus services" btntext="Earn By Bus"></Cover>
            <BusCatF></BusCatF>
            <BusCatP></BusCatP>
        </>
    );
};

export default BusService;