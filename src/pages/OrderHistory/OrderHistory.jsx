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
        <div className='px-24'>
            <h1 className='text-5xl text-center font-bold my-10'>Ride History ({filteredOrderHistory.length})</h1>

            <section className='grid h-20 card  rounded-box place-items-center'>
             
                <ul className=''>
                    {filteredOrderHistory.map((order,index )=> (
                        
                        <li key={order._id}>
                            <div className="stats shadow m-5 shadow-xl">

                                <div className="stat">
                                    <div className="stat-figure text-primary">
                                    <FaDotCircle className='text-2xl mt-4 ' />
                    
                                    </div>
                                    <div className="stat-title">Pickup Location</div>
                                    <div className="stat-value text-primary text-xl">{order?.pickupLocation}</div>
                                    <div className="stat-desc">Ride No: #00{index+1}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                    <SiSquare className='text-2xl mt-4 ' />
                                    </div>
                                    <div className="stat-title">Destination Address</div>
                                    <div className="stat-value text-secondary text-xl">{order?.destination}</div>
                                  
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className='flex display-flex'>
                                            <div className="avatar online">
                                                <div className="w-24 rounded-full">
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
                                        </div>
                                        <p className='text-center'>{order?.carType}</p>

                                    </div>

                                    <div className="stat-value text-xl">{order?.totalPrice} /=</div>
                                    <div className="stat-title font-bold uppercase">{order?.status}</div>
                                    <div className="stat-desc text-secondary uppercase font-bold">{order?.paymentStatus}</div>
                                </div>

                                <div className="stat">


                                    <div className="stat-actions">
                                        <button className="btn btn-sm btn-success"
                                        onClick={() => handleDelete(order._id)}
                                        >Delete</button><br />

                                        {order?.status === 'canceled'   && <button className="btn btn-sm  bg-slate-400 mt-2"
                                         onClick={() => handleRebook(order._id)}
                                        >Rebook</button>  }

                                       
                                    </div>
                                </div>

                            </div>



                        </li>
                    ))}
                </ul></section>
        </div>
        </>
    );
};

export default OrderHistory;