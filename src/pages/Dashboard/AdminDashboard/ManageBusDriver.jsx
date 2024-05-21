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

const ManageBusDriver = () => {
    const [loading] = busdriverdata();
    const [newBusDriverLIst, setNewBusDriverLIst] = useState([]);


    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/busdriveraccount')
            .then(res => res.json())
            .then(data => {
                setNewBusDriverLIst(data);
            })

    }, []);

    if (loading) {
        return <Loading></Loading>;
    };

    console.log(newBusDriverLIst);


    const handleDelete = (busdriverId) => {
        console.log(busdriverId)

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
                fetch(`https://transport-server2-1.onrender.com/busdriveraccount/${busdriverId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'Busdriver removed successfully') {
                            const updatedList = newBusDriverLIst.filter(busdriver => busdriver._id !== busdriverId);
                            setNewBusDriverLIst(updatedList);

                            toast.success('Bus driver removed successfully');
                        } else {
                            toast.error('Failed to remove Bus driver: ' + data.error);
                        }
                    })

            }
        });
    };


    const handleVerify = (busdriverId) => {
        fetch(`https://transport-server2-1.onrender.com/busdriveraccount/${busdriverId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ verifiedStatus: 'verified' })
        })
            .then(res => res.json().then(data => ({ status: res.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    const updatedList = newBusDriverLIst.map(busdriver =>
                        busdriver._id === busdriverId ? { ...busdriver, verifiedStatus: 'verified' } : busdriver
                    );
                    setNewBusDriverLIst(updatedList);
                    toast.success('busdriver verified successfully');
                } else {
                    toast.error('Failed to verify busdriver: ' + body.message);
                }
            })

    };




    return (
        <div>
            <NavDashBoard></NavDashBoard>

            <div className="p-4">

                <div className='flex justify-center'>
                    <ul className="">
                        {newBusDriverLIst.map((busdriver, index) => (
                            <li key={busdriver.id}

                                className='my-5 p-5'
                            >
                                <div>
                                    <div className="stats shadow-xl rounded-xl w-full">
                                        <div className="stat flex items-center w-8/12">
                                            <div className='mt-4'>
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-full">
                                                        {
                                                            busdriver?.photo === undefined ?
                                                                <img src={userimg} alt="Bus driver" />
                                                                : <img src={busdriver?.photo} />

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                <div className="stat-title">{busdriver?.role} #00{index + 1}</div>

                                                <div className='flex '>
                                                    <div className="stat-value text-yellow-600 text-3xl">{busdriver.name} </div>
                                                    <small className=" mt-2 ml-2  stat-desc uppercase font-bold badge bg-blue-600 text-white">{busdriver?.gender}</small>
                                                    <span>
                                                        {busdriver?.verifiedStatus === 'verified' ? <FaCheckCircle className='text-bold text-blue-600 mt-3 ml-3' /> : <IoIosCheckmarkCircleOutline className='text-bold text-blue-600 mt-3 ml-3' />}

                                                    </span>
                                                </div>
                                                <div className='flex my-1 '>
                                                    {busdriver?.gender === 'male' ? <FaChildReaching className='font-bold' /> : <FaChildDress className='font-bold' />}


                                                    <small className="  ml-1 stat-desc  font-bold text-slate-900">{busdriver.dob}</small>
                                                </div>
                                                <div className='flex'>
                                                    <small className=" mr-2  stat-desc   badge bg-green-400 text-slate-900">{busdriver?.phone}</small>
                                                    <a href={busdriver?.facebook} target='_blank'><FaFacebook /> </a>


                                                </div>


                                                <div className="stat-desc text-gray-500">{busdriver?.email}</div>

                                                <div className="stat-desc text-secondary mt-1">{busdriver?.location}, {busdriver?.upazila}, {busdriver?.address} </div>


                                            </div>



                                        </div>

                                        <div className="stat flex items-center jsutify-between">
                                            <div className=''>
                                                <button className="btn btn-sm bg-yellow-800  hover:bg-yellow-600 text-white"
                                                    onClick={() => handleDelete(busdriver?._id)}
                                                >Remove Driver</button><br />

                                                {busdriver?.verifiedStatus === undefined || busdriver?.verifiedStatus === "" ? <button className="btn btn-sm bg-slate-900 hover:bg-slate-600 mt-2 text-white"
                                                    onClick={() => handleVerify(busdriver?._id)}
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

export default ManageBusDriver;