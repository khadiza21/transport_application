import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import bikeimg from '../../../assets/coverscoty.jpg'
import BikeSide from './BikeSide';
import Scotyside from './Scotyside';

const BikeService = () => {
    return (
        <div>
            <Helmet>
                <title>City Mover | Bike Service</title>
            </Helmet>


            <Cover img={bikeimg} title="Happy Moving" btntext="Make Earn"></Cover>
            <BikeSide></BikeSide>
            <Scotyside></Scotyside>
        </div>
    );
};

export default BikeService;