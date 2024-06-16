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

            <div className='px-24 py-10 mx-auto'>

                <div className="card-body w-6/12  h-[90h] shadow-xl rounded-lg">

                    <h1 className='text-3xl font-bold   my-2 '>Meet At {reqorderhistory?.pickupLocation} </h1>
                    <hr />

                    <div className='flex justify-between'>
                        <div className="avatar ">

                            <div className="w-24 h-24 mask mask-hexagon">
                                {reqorderhistory?.driverPhoto === undefined ? <img src={driverimg} alt="" /> : <img src={reqorderhistory?.driverPhoto} />}

                            </div>
                        </div>
                        <div className='w-[200px]'>
                            <h1 className='text-gray-500 uppercase text-xl text-right font-bold'>{reqorderhistory?.driverName}</h1>
                            <h2 className=' font-bold text-3xl text-right'>{reqorderhistory?.registrationNumber}</h2>

                            <p className='text-gray-500 text-right '>{reqorderhistory?.brandname}</p>
                            <p className='text-gray-500 text-right '>{reqorderhistory?.modelname}</p>
                            <p className='text-red-500 text-right '>{reqorderhistory?.carType} Rent Per km {reqorderhistory?.chargePerKm} BDT</p>
                            <p className='text-gray-500 text-right '>Total Distance {reqorderhistory?.distance} KM</p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-around  px-8 py-4'>
                        <div>
                            <div className='bg-slate-200 text-blue-600 p-2 rounded-[50%]'>
                                <AiFillSafetyCertificate className='text-3xl ' />

                            </div>
                            <span>Safty</span>
                        </div>
                        <div>
                            <div className='bg-slate-200 text-blue-600 p-2 rounded-[50%]'>
                                <MdPayments className='text-4xl' />
                                <span>Pay</span>
                            </div>


                        </div>
                        <div>
                            <div className='bg-slate-200 text-blue-600 p-2 rounded-[50%] tooltip tooltip-open  tooltip-right tooltip-success' data-tip={reqorderhistory?.driverPhone}>
                                <FaMobileScreenButton className='text-3xl ' />
                            </div>

                            <p>Phone</p>
                        </div>


                    </div>
                    <hr />
                   
                    <div className='flex pt-5'>
                        <FaDotCircle className='text-2xl mt-4 ' />
                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>{reqorderhistory?.pickupLocation}</h3>
                            <small className='text-gray-500'>ROad no 90/3434</small>
                        </div>
                    </div>
                    <div className='flex pt-5'>
                        <SiSquare className='text-2xl mt-4 ' />
                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>{reqorderhistory?.destination}</h3>
                            <small className='text-gray-500'>ROad no 90/3434</small>
                        </div>
                    </div>
                    <div className='flex pt-5 '>
                        <MdPayments className='text-3xl mt-4' />

                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>BDT {reqorderhistory?.totalPrice}</h3>
                            <small className='text-gray-500'> Payment </small>
                        </div>
                    </div>

                    <button id='cancelRideButton' className='btn w-full bg-slate-200 mt-5 text-red-600'  onClick={handleCancelRide}>Cancel Ride</button>

                </div>
            </div>
        </>

    );
};

export default ReqCarRide;