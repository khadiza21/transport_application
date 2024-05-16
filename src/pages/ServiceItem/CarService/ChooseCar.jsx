import React, { useEffect, useState } from 'react';
import { MdPayments } from "react-icons/md";
import Loading from '../../Shared/Loading/Loading';

const ChooseCar = () => {
    const [cardata, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/cardata.json')
            .then(res => res.json())
            .then(data => {
                setCarData(data);
                setLoading(false);
                console.log(data)

            })

    }, [])
    return (
        <div className=''>
            <h1 className='text-4xl font-bold   my-2 px-5'>Choose A Ride </h1>
            <hr />

            <div className='overflow-y-scroll h-[73vh]'>
                {loading ? (
                    <Loading></Loading>
                ) : (

                    cardata.map(item =>
                        <div key={item._id} >

                            <div
                                className=" h-100 flex justify-between py-6 px-5 " >
                                <div className='flex justify-start '>
                                    <div className="avatar">
                                        <div className="w-24 rounded">
                                            <img src={item?.img} />
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
                <div className='text-4xl'><MdPayments /></div>
                <div><button className='btn btn-neutral'>Request For Ride</button></div>
            </section>

        </div>
    );
};

export default ChooseCar;