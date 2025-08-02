import { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import maxcar from '../../../assets/car3.jpeg'
import pluscar from '../../../assets/car2.jpeg'
import primecar from '../../../assets/car1.jpeg'
import useUsersAuth from '../../../hooks/useUsersAuth';
import {  useNavigate } from 'react-router-dom';


const ChooseCar = ({ pickupLocation, destination, distance }) => {
    const [userData] = useUsersAuth();
    const [cardata, setCarData] = useState([]);
    const [cardriverdata, setCardriverData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [move, setMove] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredDriver, setFilteredDriver] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate = useNavigate();
    const orderusername = userData?.name;
    const orderuseremail = userData?.email;
    const driveremail = cardriverdata?.email;
  
  

    console.log(userData?.name)

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




    const handleRequestRide = () => {

        const orderData = {
            paymentStatus: 'unpaid',
            orderusername,
            orderuseremail,
            driveremail,
            pickupLocation,
            destination,
            distance:distance.toFixed(3),
            carType: selectedItem.cartype,
            driverEmail: selectedItem.email,
            driverPhoto: filteredDriver.photo,
            driverName: selectedItem.name,
            registrationNumber:selectedItem.registrationNumber,
            brandname:selectedItem.brandname,
            modelname:selectedItem.modelname,
            cartype: selectedItem.carType,
            driverPhone: filteredDriver.phone,
            chargePerKm: selectedItem.chargePerKm,
            totalPrice: (selectedItem.chargePerKm * distance).toFixed(3),
        };
        fetch('https://transport-server2-1.onrender.com/orderhistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then(res => res.json())
            .then(data => {
         
                setOrderHistory(prevHistory => [...prevHistory, data]);
                setMove(true);
                console.log('Order saved:', data);
                navigate('/requestedcarride', { state: { orderHistory: [...orderHistory, data] } });

            })
           

    };
    console.log('Order history:', orderHistory);

    return (
        <div className=''>
        
            {!move && (

                <div className='w-full '>
                    <h1 className='text-xl  lg:text-4xl font-bold my-2 px-5 '>Choose A Ride </h1>
                    <hr />

                    <div className='overflow-y-auto max-h-[60vh] lg:max-h-[73vh]'>
                        {loading ? (
                            <Loading></Loading>
                        ) : (

                            cardata.map(item =>
                                <div key={item._id}
                                    id={item._id}
                                    className="focus:outline rounded-[20px] border hover:shadow-md mx-2 md:mx-5 my-2 carlistppp"
                                    tabIndex={0}
                                    onClick={() => handleClick(item)}
                                >

                                    <div
                                        className="h-100 flex justify-between py-6 px-5 " >
                                        <div className='flex justify-start '>
                                            <div className="avatar">
                                                <div className=" w-16 lg:w-24 rounded">
                                                    <div className="avatar">
                                                        <div className="w-16 lg:w-24 rounded">
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
                                                    <h2 className='font-bold text-sm lg:text-xl '> {item?.cartype}</h2>
                                                    <small className='font-bold text-gray-400 text-xs lg:text-sm'>Affodable everyday rides</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>

                                            <h1 className='font-bold text-sm pl-2 lg:text-2xl'> BDT {(item?.chargePerKm * distance).toFixed(3)}</h1>
                                        </div>
                                    </div>

                                </div>


                            ))}
                    </div>

                    <hr />
                    <section className='flex justify-end px-5 py-4 shadow-lg'>



                        {selectedItem !== null ? <div>
                            <button className='btn btn-neutral' id='finalReqRide' onClick={handleRequestRide}>Request For Ride</button>


                        </div> : <div><button className='btn btn-disabled'

                        >Request For Ride</button></div>}




                    </section>


                </div>)
            }







        </div>
    );
};

export default ChooseCar;