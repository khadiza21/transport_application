import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { SiSquare } from "react-icons/si";
import { MdPayments } from "react-icons/md";
import driverimg from '../../../assets/user.png'
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ReqCarRide = () => {
    const location = useLocation();
    const orderHistory = location.state?.orderHistory || [];
    console.log(orderHistory[0]?.insertedId)
    const findingID = orderHistory[0]?.insertedId;
    const [reqorderhistory, setReqorderhistory] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (findingID) {
            fetch(`https://transport-server2-1.onrender.com/orderhistory/${findingID}`)
                .then(res => res.json())
                .then(data => { setReqorderhistory(data); })
                .catch(error => console.error('Error fetching order history:', error));
        }
    }, [findingID]);

    const handleCancelRide = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel this ride?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://transport-server2-1.onrender.com/orderhistory/${findingID}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'canceled' })
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success('Ride canceled successfully!');
                        navigate('/primeCar');
                    })

            }
        });
    };

    console.log(reqorderhistory)
    return (
        <>
            <NavDashBoard></NavDashBoard>

            <div className='px-4 sm:px-6 lg:px-24 py-10 mx-auto'>
                <div className="card-body w-full lg:w-6/12 mx-auto shadow-xl rounded-lg">
                    <h1 className='text-2xl sm:text-3xl font-bold my-2 text-center lg:text-left'>
                        Meet At {reqorderhistory?.pickupLocation}
                    </h1>
                    <hr />

               
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4 my-4'>
                        <div className="avatar">
                            <div className="w-24 h-24 mask mask-hexagon">
                                {reqorderhistory?.driverPhoto === undefined ? (
                                    <img src={driverimg} alt="driver" />
                                ) : (
                                    <img src={reqorderhistory?.driverPhoto} alt="driver" />
                                )}
                            </div>
                        </div>

                        <div className='text-right sm:text-right lg:text-right w-full sm:w-[200px]'>
                            <h1 className='text-gray-500 uppercase text-lg sm:text-xl font-bold'>{reqorderhistory?.driverName}</h1>
                            <h2 className='font-bold text-2xl sm:text-3xl'>{reqorderhistory?.registrationNumber}</h2>
                            <p className='text-gray-500'>{reqorderhistory?.brandname}</p>
                            <p className='text-gray-500'>{reqorderhistory?.modelname}</p>
                            <p className='text-red-500'>{reqorderhistory?.carType} Rent Per km {reqorderhistory?.chargePerKm} BDT</p>
                            <p className='text-gray-500'>Total Distance {reqorderhistory?.distance} KM</p>
                        </div>
                    </div>

                    <hr />

                   
                    <div className='flex flex-wrap justify-around px-4 py-4 text-center gap-4'>
                        <div>
                            <div className='bg-slate-200 text-blue-600 p-3 rounded-full inline-block'>
                                <AiFillSafetyCertificate className='text-2xl sm:text-3xl' />
                            </div>
                            <p className='mt-1'>Safety</p>
                        </div>

                        <div>
                            <div className='bg-slate-200 text-blue-600 p-3 rounded-full inline-block'>
                                <MdPayments className='text-3xl' />
                            </div>
                            <p className='mt-1'>Pay</p>
                        </div>

                        <div>
                            <div
                                className='bg-slate-200 text-blue-600 p-3 rounded-full inline-block tooltip tooltip-open tooltip-up tooltip-success'
                                data-tip={reqorderhistory?.driverPhone}
                            >
                                <FaMobileScreenButton className='text-2xl sm:text-3xl' />
                            </div>
                            <p className='mt-1'>Phone</p>
                        </div>
                    </div>

                    <hr />

             
                    <div className='flex items-start pt-5'>
                        <FaDotCircle className='text-xl sm:text-2xl mt-1.5' />
                        <div className='px-4'>
                            <h3 className='font-bold text-lg sm:text-xl'>{reqorderhistory?.pickupLocation}</h3>
                            <small className='text-gray-500'>Road no 90/3434</small>
                        </div>
                    </div>

                  
                    <div className='flex items-start pt-5'>
                        <SiSquare className='text-xl sm:text-2xl mt-1.5' />
                        <div className='px-4'>
                            <h3 className='font-bold text-lg sm:text-xl'>{reqorderhistory?.destination}</h3>
                            <small className='text-gray-500'>Road no 90/3434</small>
                        </div>
                    </div>

                
                    <div className='flex items-start pt-5'>
                        <MdPayments className='text-2xl sm:text-3xl mt-1.5' />
                        <div className='px-4'>
                            <h3 className='font-bold text-lg sm:text-xl'>BDT {reqorderhistory?.totalPrice}</h3>
                            <small className='text-gray-500'>Payment</small>
                        </div>
                    </div>

                    <button
                        id='cancelRideButton'
                        className='btn w-full bg-slate-200 mt-6 text-red-600'
                        onClick={handleCancelRide}
                    >
                        Cancel Ride
                    </button>
                </div>
            </div>

        </>

    );
};

export default ReqCarRide;