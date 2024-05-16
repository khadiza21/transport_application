import React, { useEffect, useState } from 'react';

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
        <div className='shadow-xl '>
            <h1 className='text-4xl font-bold  uppercase my-5 px-5'>Choose a Ride </h1>
            <hr />
            {loading ? (
                <Loading></Loading>
            ) : (

                cardata.map(item => 
                    <div
                     key={item._id}
                     
                    
                    class="flex justify-between py-6 px-5 " >
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

               )) }


        </div>
    );
};

export default ChooseCar;