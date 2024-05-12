import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import useCarDriverData from '../../../hooks/useCarDriverData';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard';

const CarDriverDashBoard = () => {
    const [cardriverData, loading] = useCarDriverData();
    return (
        <div>
            <h1 className="font-bold  text-dark text-5xl m-10 p-10 text-center">Car driver Dashboard</h1>
            <Link className='flex justify-center items-center mt-2' to='/'><button className="btn btn-success"> GO Home</button></Link>
            <div className="">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div className="">
                        {cardriverData && (
                            <>
                                <div className='text-center font-bold'>
                                    <p>Name: {cardriverData.name}</p>
                                    <p>Email: {cardriverData.email}</p>

                                </div>

                                <Dashboard
                                    userRole={cardriverData.role}
                                ></Dashboard></>
                        )

                        }

                        {console.log(cardriverData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarDriverDashBoard;