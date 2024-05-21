
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import busdriverdata from '../../../hooks/busdriverdata';
import Loading from '../../Shared/Loading/Loading';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';
import userimg from '../../../assets/user.png'
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaChildDress, FaChildReaching, FaFacebook } from 'react-icons/fa6';

const ManageDriver = () => {
    const [loading] = busdriverdata();
    const [newCarDriverLIst, setNewCarDriverLIst] = useState([]);


    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/cardriveraccount')
            .then(res => res.json())
            .then(data => {
        setNewCarDriverLIst(data); })

    }, []);

    if (loading) {
        return <Loading></Loading>;
    };

    console.log(newCarDriverLIst);

    
    const handleDelete = (cardriverId) => {

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
                fetch(`https://transport-server2-1.onrender.com/cardriveraccount/${cardriverId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'Cardriver removed successfully') {
                            const updatedList = newCarDriverLIst.filter(cardriver => cardriver._id !== cardriverId);
                            setNewCarDriverLIst(updatedList);

                            toast.success('Cardriver removed successfully');
                        } else {
                            toast.error('Failed to remove Cardriver: ' + data.error);
                        }
                    })

            }
        });
    };


    const handleVerify = (cardriverId) => {
        fetch(`https://transport-server2-1.onrender.com/cardriveraccount/${cardriverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ verifiedStatus: 'verified' })
        })
            .then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    const updatedList = newCarDriverLIst.map(cardriver =>
                        cardriver._id === cardriverId ? { ...cardriver, verifiedStatus: 'verified' } : cardriver
                    );
                    setNewCarDriverLIst(updatedList);
                    toast.success('Cardriver verified successfully');
                } else {
                    toast.error('Failed to verify Cardriver: ' + body.message);
                }
            })

    };

    return (
        <div>
            <NavDashBoard></NavDashBoard>

            <div className="p-4">

                <div className='flex justify-center'>
                    <ul className="">
                        {newCarDriverLIst.map((cardriver, index) => (
                            <li key={cardriver.id}

                                className='my-5 p-5'
                            >
                                <div>
                                    <div className="stats shadow-xl rounded-xl w-full">
                                        <div className="stat flex items-center w-8/12">
                                            <div className='mt-4'>
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-full">
                                                        {
                                                            cardriver?.photo === undefined ?
                                                                <img src={userimg} alt="Prime Car" />
                                                                : <img src={cardriver?.photo} />

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                <div className="stat-title">{cardriver?.role} #00{index + 1}</div>

                                                <div className='flex '>
                                                    <div className="stat-value text-yellow-600 text-3xl">{cardriver.name} </div>
                                                    <small className=" mt-2 ml-2  stat-desc uppercase font-bold badge bg-blue-600 text-white">{cardriver?.gender}</small>
                                                    <span>
                                                        {cardriver?.verifiedStatus === 'verified' ? <FaCheckCircle className='text-bold text-blue-600 mt-3 ml-3' /> : <IoIosCheckmarkCircleOutline className='text-bold text-blue-600 mt-3 ml-3' />}

                                                    </span>
                                                </div>
                                                <div className='flex my-1 '>
                                                    {cardriver?.gender === 'male' ? <FaChildReaching className='font-bold' /> : <FaChildDress className='font-bold' />}


                                                    <small className="  ml-1 stat-desc  font-bold text-slate-900">{cardriver.dob}</small>
                                                </div>
                                                <div className='flex'>
                                                    <small className=" mr-2  stat-desc   badge bg-green-400 text-slate-900">{cardriver?.phone}</small>
                                                    <a href={cardriver?.facebook} target='_blank'><FaFacebook /> </a>


                                                </div>


                                                <div className="stat-desc text-gray-500">{cardriver?.email}</div>

                                                <div className="stat-desc text-secondary mt-1">{cardriver?.location}, {cardriver?.upazila}, {cardriver?.address} </div>


                                            </div>



                                        </div>

                                        <div className="stat flex items-center jsutify-between">
                                            <div className=''>
                                                <button className="btn btn-sm bg-yellow-800  hover:bg-yellow-600 text-white"
                                                    onClick={() => handleDelete(cardriver?._id)}
                                                >Remove Driver</button><br />

                                                {cardriver?.verifiedStatus === undefined || cardriver?.verifiedStatus === "" ? <button className="btn btn-sm bg-slate-900 hover:bg-slate-600 mt-2 text-white"
                                                    onClick={() => handleVerify(cardriver?._id)}
                                                >Verify Driver</button> : null}

                                            </div>



                                        </div>

                                    </div>
                                </div>


                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );

   
};

export default ManageDriver;