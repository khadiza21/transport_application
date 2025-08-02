import { useEffect, useState } from 'react';
import useUsersAuth from '../../hooks/useUsersAuth';
import Loading from '../Shared/Loading/Loading';
import maxcar from '../../assets/car3.jpeg';
import pluscar from '../../assets/car2.jpeg'
import primecar from '../../assets/car1.jpeg'
import NavDashBoard from '../Shared/Navbar/NavDashBoard';
import { FaDotCircle } from 'react-icons/fa';
import { SiSquare } from 'react-icons/si';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const OrderHistory = () => {
    const [orderHistoryDatalist, setOrderHistoryDatalist] = useState([]);
    const [filteredOrderHistory, setFilteredOrderHistory] = useState([]);



    const [userData, loading] = useUsersAuth();

    const userEmail = userData?.email;
    useEffect(() => {
        if (userEmail) {
            fetch('https://transport-server2-1.onrender.com/orderhistory')
                .then(res => res.json())
                .then(data => {
                    setOrderHistoryDatalist(data);
                    console.log('Fetched ', data);

                    const filteredData = data.filter(order => order.orderuseremail === userEmail);
                    setFilteredOrderHistory(filteredData);
                    console.log('Filtered ', filteredData);
                })

        }
    }, [userEmail]);


    const handleDelete = (orderId) => {
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
                fetch(`https://transport-server2-1.onrender.com/orderhistory/${orderId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'Order deleted successfully') {
                            const updatedList = filteredOrderHistory.filter(order => order._id !== orderId);
                            setFilteredOrderHistory(updatedList);
                            toast.success('Order deleted successfully');
                        } else {
                            toast.error('Failed to delete order: ' + data.error);
                        }
                    })

            }
        });
    };

    const handleRebook = (orderId) => {
        const newStatus = 'Rebooked';

        fetch(`https://transport-server2-1.onrender.com/orderhistory/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Order status updated successfully') {
                    const updatedList = filteredOrderHistory.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    );
                    setFilteredOrderHistory(updatedList);
                    toast.success('Ride Rebooked successfully');
                }
            })

    };




    if (loading) {
        return <Loading></Loading>;
    }

    // requestedcarride

    return (
        <>
            <NavDashBoard></NavDashBoard>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl md:text-5xl text-center font-bold my-6 md:my-10'>
                    Ride History ({filteredOrderHistory.length})
                </h1>

                <section className='grid grid-cols-1 gap-6'>
                    <ul className='space-y-4'>
                        {filteredOrderHistory.map((order, index) => (
                            <li key={order._id}>
                                <div className="stats shadow-md md:shadow-xl flex flex-col md:flex-row flex-wrap gap-4 md:gap-0 p-4 md:p-6 rounded-lg">

                                    {/* Pickup Location */}
                                    <div className="stat flex-1 min-w-[250px]">
                                        <div className="stat-figure text-primary">
                                            <FaDotCircle className='text-2xl mt-4' />
                                        </div>
                                        <div className="stat-title">Pickup Location</div>
                                        <div className="stat-value text-primary text-lg md:text-xl">{order?.pickupLocation}</div>
                                        <div className="stat-desc">Ride No: #{String(index + 1).padStart(3, '0')}</div>
                                    </div>

                                    {/* Destination */}
                                    <div className="stat flex-1 min-w-[250px]">
                                        <div className="stat-figure text-secondary">
                                            <SiSquare className='text-2xl mt-4' />
                                        </div>
                                        <div className="stat-title">Destination Address</div>
                                        <div className="stat-value text-secondary text-lg md:text-xl">{order?.destination}</div>
                                    </div>

                                    {/* Car Type and Price */}
                                    <div className="stat flex-1 min-w-[250px]">
                                        <div className="stat-figure text-secondary flex flex-col items-center">
                                            <div className="avatar online mb-1">
                                                <div className="w-16 md:w-24 rounded-full">
                                                    {
                                                        order?.carType === 'Prime Car' ? (
                                                            <img src={primecar} alt="Prime Car" />
                                                        ) : order?.carType === 'Plus Car' ? (
                                                            <img src={pluscar} alt="Plus Car" />
                                                        ) : (
                                                            <img src={maxcar} alt="Max Car" />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <p className='text-center text-sm'>{order?.carType}</p>
                                        </div>
                                        <div className="stat-value text-lg md:text-xl">{order?.totalPrice} /=</div>
                                        <div className="stat-title font-bold uppercase">{order?.status}</div>
                                        <div className="stat-desc text-secondary uppercase font-bold">{order?.paymentStatus}</div>
                                    </div>

                                    {/* Actions */}
                                    <div className="stat flex-1 min-w-[250px]">
                                        <div className="stat-actions flex flex-col gap-2 mt-2">
                                            <button
                                                className="btn btn-sm btn-success w-full"
                                                onClick={() => handleDelete(order._id)}
                                            >
                                                Delete
                                            </button>

                                            {order?.status === 'canceled' && (
                                                <button
                                                    className="btn btn-sm bg-slate-400 w-full"
                                                    onClick={() => handleRebook(order._id)}
                                                >
                                                    Rebook
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

        </>
    );
};

export default OrderHistory;