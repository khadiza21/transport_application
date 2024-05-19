import React, { useEffect, useState } from 'react';
import { MdPayments } from "react-icons/md";
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import maxcar from '../../../assets/car3.jpeg'
import pluscar from '../../../assets/car2.jpeg'
import primecar from '../../../assets/car1.jpeg'
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { SiSquare } from "react-icons/si";
import driverimg from '../../../assets/user.png'





const ChooseCar = ({ pickupLocation, destination, distance }) => {


    const [cardata, setCarData] = useState([]);
    const [cardriverdata, setCardriverData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [move, setMove] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredDriver, setFilteredDriver] = useState(null);

    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/cardata')
            .then(res => res.json())
            .then(data => {

                const sortedData = data.sort((a, b) => a.price - b.price);
                setCarData(sortedData);
                setLoading(false);
                console.log(data)

            })

    }, [])

    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/cardriveraccount')
            .then(res => res.json())
            .then(data => {
                setCardriverData(data);
                console.log(data)

            })

    }, [])

    useEffect(() => {
        if (selectedItem && cardriverdata.length > 0) {
            const matchedDriver = cardriverdata.find(driver => driver.email === selectedItem.email);
            setFilteredDriver(matchedDriver);
        }
    }, [selectedItem, cardriverdata]);
    console.log(filteredDriver?.photo, 'distance')


    const handleClick = (item) => {
        setSelectedItem(item);
        Swal.fire({
            title: "Price Breakdown",
            text: "Additional wait time charges may apply to your trip if the driver has waited 5 minute(s): up to BDT 4.50 per minute, depending on how busy it is.",
            showCancelButton: true,
            cancelButtonColor: "#000000",
        });


    };
  


    return (
        <div className='flex'>
            {move ? null :

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

                                                            {
                                                                item?.cartype === 'Prime Car' ? (
                                                                    <img src={primecar} alt="Prime Car" />
                                                                ) : item?.cartype === 'Plus Car' ? (
                                                                    <img src={pluscar} alt="Plus Car" />
                                                                ) : (
                                                                    <img src={maxcar} alt="Max Car" />
                                                                )
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex items-center pl-3 '>
                                                <div>
                                                    <h2 className='font-bold text-xl '> {item?.cartype}</h2>
                                                    <small className='font-bold text-gray-400'>Affodable everyday rides</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>

                                            <h1 className='font-bold text-2xl'> BDT {(item?.chargePerKm * distance).toFixed(3)}</h1>
                                        </div>
                                    </div>

                                </div>


                            ))}
                    </div>

                    <hr />
                    <section className='flex justify-end px-5 py-4 shadow-lg'>

                       

                        {selectedItem !== null ? <div>
                            <button className='btn btn-neutral'

                                onClick={() => setMove(true)}>Request For Ride</button>

                        </div> : <div><button className='btn btn-disabled'

                        >Request For Ride</button></div>}




                    </section>


                </div>
            }


            {move ?
                <div className="card-body  w-1/3 h-[90h] shadow-xl rounded-lg">

                    <h1 className='text-3xl font-bold   my-2 '>Meet At {pickupLocation} </h1>
                    <hr />

                    <div className='flex justify-between'>
                        <div className="avatar ">

                            <div className="w-24 h-24 mask mask-hexagon">
                                {filteredDriver?.photo === undefined ? <img src={driverimg} alt="" /> : <img src={filteredDriver?.photo} />}

                            </div>
                        </div>
                        <div className='w-[200px]'>
                            <h1 className='text-gray-500 uppercase text-xl text-right font-bold'>{selectedItem?.name}</h1>
                            <h2 className=' font-bold text-3xl text-right'>{selectedItem?.registrationNumber}</h2>
                            <p className='text-gray-500 text-right '>{selectedItem?.brandname}</p>
                            <p className='text-gray-500 text-right '>{selectedItem?.modelname}</p>
                            <p className='text-red-500 text-right '>{selectedItem?.cartype} Rent Per km {selectedItem?.chargePerKm} BDT</p>
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

                            </div>
                            <span>Pay</span>
                        </div>
                        <div>
                            <div className='bg-slate-200 text-blue-600 p-2 rounded-[50%] tooltip tooltip-open  tooltip-right tooltip-success'  data-tip={filteredDriver?.phone}>
                                 <FaMobileScreenButton className='text-3xl ' />
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
                            <h3 className='font-bold text-xl'>BDT {(selectedItem?.chargePerKm * distance).toFixed(3)}</h3>
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