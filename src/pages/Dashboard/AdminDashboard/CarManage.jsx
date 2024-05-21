import { useEffect, useState } from 'react';
import maxcar from '../../../assets/car3.jpeg';
import pluscar from '../../../assets/car2.jpeg'
import primecar from '../../../assets/car1.jpeg'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import Loading from '../../Shared/Loading/Loading';
import useUsersAuth from '../../../hooks/useUsersAuth';
import { FaChildDress, FaChildReaching } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";



const CarManage = () => {
    const [user, loading] = useUsersAuth();
    const [newCarLIst, setNewCarLIst] = useState([]);


    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/cardata')
            .then(res => res.json())
            .then(data => {
                setNewCarLIst(data);
            })

    }, []);
    console.log(newCarLIst)

    const handleDelete = (carId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://transport-server2-1.onrender.com/cardata/${carId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === "Car Deleted Successfully") {
                            console.log(data.message);
                            const updatedList = newCarLIst.filter(car => car._id !== carId);
                            setNewCarLIst(updatedList);
                            toast.success('Car Deleted successfully');
                        } else {
                            toast.error('Failed to remove Car:  ' + (data.error || 'Unknown error'));
                        }
                    })
            }
        });
    };
   

    const handleVerify = (carId) => {
        console.log(carId)
        fetch(`https://transport-server2-1.onrender.com/cardata/${carId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ verifiedStatus: 'verified' })

        })
        
        .then(res => res.json()
        .then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
            if (status === 200) {
                const updatedList = newCarLIst.map(car =>
                    car._id === carId ? { ...car, verifiedStatus: 'verified' } : car
                );
                setNewCarLIst(updatedList);
                toast.success('Car verified successfully');
            } else {
                toast.error('Failed to verify Car: ' + (body.message || 'Unknown error'));
            }
        })
       
    };
    



    if (loading) {
        return <Loading></Loading>;
    };
    return (
        <div>
            <NavDashBoard></NavDashBoard>
            <div className='px-44 '>
                <h1 className='text-5xl text-center font-bold my-10'>Total Car ({newCarLIst.length})</h1>

                <section className='flex justify-center '>

                    <ul className=' w-8/12'>
                        {newCarLIst.map((car, index) => (

                            <li key={car._id}
                                className='my-5 p-5'
                            >

                                <div>
                                    <div className="stats shadow-xl rounded-xl w-full">
                                        <div className="stat flex items-center w-8/12">
                                            <div className='mt-4'>
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-full">
                                                        {
                                                            car?.cartype === 'Prime Car' ? (
                                                                <img src={primecar} alt="Prime Car" />
                                                            ) : car?.cartype === 'Plus Car' ? (
                                                                <img src={pluscar} alt="Plus Car" />
                                                            ) : (
                                                                <img src={maxcar} alt="Max Car" />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='pl-2'>

                                                <div className="stat-title"> #00{index + 1} ({car?.registrationNumber})</div>

                                                <div className='flex '>
                                                    <div className="stat-value text-yellow-600 text-3xl">{car.cartype} </div>
                                                    <small className=" mt-2 ml-2  stat-desc uppercase font-bold badge bg-blue-600 text-white">{car?.year}</small>
                                                    <span>
                                                        {car?.verifiedStatus === 'verified' ? <FaCheckCircle className='text-bold text-blue-600 mt-3 ml-3' /> : <IoIosCheckmarkCircleOutline className='text-bold text-blue-600 mt-3 ml-3' />}

                                                    </span>
                                                </div>
                                                <div className='flex  '>
                                                    <FaChildDress className='font-bold my-1' /> <p className='ml-1 font-bold'>{car?.name}</p>



                                                </div>
                                                <div className="stat-desc text-gray-500">{car?.email}</div>
                                                <div className='flex'>
                                                    <small className=" mr-2  stat-desc   badge bg-green-400 text-slate-900"> {car?.licensePlate}LP </small>
                                                    <small className=" mr-2  stat-desc   badge bg-green-400 text-slate-900"> {car?.chargePerKm} TK/Km </small>


                                                </div>




                                                <div className="stat-desc text-secondary mt-1">{car?.brandname}, {car?.modelname}, ({car?.color}) </div>


                                            </div>



                                        </div>


                                        <div className="stat flex items-center jsutify-end">
                                            <div className=''>
                                                <button className="btn btn-sm bg-yellow-900 hover:bg-yellow-600 text-white"
                                                    onClick={() => handleDelete(car?._id)}
                                                >Remove car</button><br />

                                                {car?.verifiedStatus === undefined || car?.verifiedStatus === "" ? <button className="btn btn-sm  bg-slate-800 mt-2 text-white hover:bg-slate-600"
                                                    onClick={() => handleVerify(car?._id)}
                                                >Verify car</button> : null}

                                            </div>



                                        </div>

                                    </div>
                                </div>


                            </li>
                        ))}
                    </ul></section>
            </div>
        </div>
    );
};

export default CarManage;