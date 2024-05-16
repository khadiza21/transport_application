import React, { useEffect, useState } from 'react';
import { MdPayments } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import { SiSquare } from "react-icons/si";

const ChooseCar = ({ pickupLocation, destination }) => {
    const [cardata, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [move, setMove] = useState(false);

    useEffect(() => {
        fetch('/cardata.json')
            .then(res => res.json())
            .then(data => {

                const sortedData = data.sort((a, b) => a.price - b.price);
                setCarData(sortedData);
                setLoading(false);
                console.log(data)

            })

    }, [])


    const [selectedItem, setSelectedItem] = useState(null);
    const handleClick = (item) => {
        setSelectedItem(item);
        Swal.fire({
            title: "Price Breakdown",
            text: "Additional wait time charges may apply to your trip if the driver has waited 5 minute(s): up to BDT 4.50 per minute, depending on how busy it is.",
            showCancelButton: true,
            cancelButtonColor: "#000000",
        });


    };
    console.log(selectedItem);

    return (
        <div className='flex'>
            <div className='w-2/3 '>
                <h1 className='text-4xl font-bold   my-2 px-5'>Choose A Ride </h1>
                <hr />

                <div className='overflow-y-scroll h-[73vh] '>
                    {loading ? (
                        <Loading></Loading>
                    ) : (

                        cardata.map(item =>
                            <div key={item._id}

                                id={item._id}
                                className="focus:outline rounded-[30px] focus:border-2 focus:shadow-outline mx-5 my-2"

                                tabIndex={0}
                                onClick={() => handleClick(item)}

                            >

                                <div
                                    className=" h-100 flex justify-between py-6 px-5 " >
                                    <div className='flex justify-start '>
                                        <div className="avatar">
                                            <div className="w-24 rounded">
                                                <div className="avatar">
                                                    <div className="w-24 rounded">
                                                        <img src={item?.img} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center pl-3 '>
                                            <div>
                                                <h2 className='font-bold text-xl '> {item?.carype}</h2>
                                                <p className='text-gray-500'>{item?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <h1 className='font-bold text-2xl'> BDT {item?.price}</h1>
                                    </div>
                                </div>

                            </div>


                        ))}
                </div>

                <hr />
                <section className='flex justify-between px-5 py-4 shadow-lg'>

                    <div className='flex  '><MdPayments className='text-4xl' /><span className='mt-2 font-bold pl-2'>Pay</span></div>

                    {selectedItem !== null ? <div><button className='btn btn-neutral'
                        onClick={() => setMove(true)}
                    >Request For Ride</button></div> : <div><button className='btn btn-disabled'

                    >Request For Ride</button></div>}




                </section>


            </div>



            {move ?
                <div className="card-body  w-1/3 h-[90h] shadow-xl rounded-lg">

                    <h1 className='text-3xl font-bold   my-2 '>Meet At Road 6d, Avenue 8, Mirpur DOSH </h1>
                    <hr />

                    <div className='flex justify-between'>
                        <div className="avatar ">
                            <div className="w-24 h-24 mask mask-hexagon">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div className='w-[200px]'>
                            <h1 className='text-gray-500 uppercase text-xl text-right font-bold'>MD Zahid</h1>
                            <h2 className=' font-bold text-3xl text-right'>DHM-GA-29-7002</h2>
                            <p className='text-gray-500 text-right '>Nissan Bluebird</p>
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
                            <div className='bg-slate-200 text-blue-600 p-2 rounded-[50%]'> <FaMobileScreenButton className='text-3xl ' />
                            </div>

                            <p>Phone</p>
                        </div>


                    </div>
                    <hr />

                    <div className='flex pt-5'>
                        <FaDotCircle className='text-2xl mt-4 ' />
                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>{pickupLocation}</h3>
                            <small className='text-gray-500'>ROad no 90/3434</small>
                        </div>
                    </div>
                    <div className='flex pt-5'>
                        <SiSquare className='text-2xl mt-4 ' />
                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>{destination}</h3>
                            <small className='text-gray-500'>ROad no 90/3434</small>
                        </div>
                    </div>
                    <div className='flex pt-5 '>
                        <MdPayments className='text-3xl mt-4' />

                        <div className='px-5'>
                            <h3 className='font-bold text-xl'>BDT {selectedItem?.price}</h3>
                            <small className='text-gray-500'> Payment </small>
                        </div>
                    </div>

                    <button className='btn w-full bg-slate-200 mt-5 text-red-600'>Cancel Ride</button>

                </div>

                : null}


        </div>
    );
};

export default ChooseCar;