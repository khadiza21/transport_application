import { useEffect, useState } from 'react';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import useUsersAuth from '../../../hooks/useUsersAuth';
import Loading from '../../Shared/Loading/Loading';
import userimg from '../../../assets/user.png'
import 'react-toastify/dist/ReactToastify.css'
import { FaFacebook } from 'react-icons/fa';
import { FaChildDress, FaChildReaching } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';



const ManageUser = () => {
  const [userData, loading] = useUsersAuth();
  const [newUserList, setNewUserList] = useState([]);


  useEffect(() => {
    fetch('https://transport-server2-1.onrender.com/users')
      .then(res => res.json())
      .then(data => {
        const filteredUsers = data.filter(user => user.role === 'user');
       
        setNewUserList(filteredUsers);

      })

  }, []);

  if (loading) {
    return <Loading></Loading>;
  };

  console.log(newUserList);
  const handleDelete = (userId) => {

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
        fetch(`https://transport-server2-1.onrender.com/users/${userId}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'User removed successfully') {
              const updatedList = newUserList.filter(user => user._id !== userId);
              setNewUserList(updatedList);
           
              toast.success('User removed successfully');
            } else {
              toast.error('Failed to remove user: ' + data.error);
            }
          })

      }
    });
  };


  const handleVerify = (userId) => {
    fetch(`https://transport-server2-1.onrender.com/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ verifiedStatus: 'verified' })
    })
      .then(res => res.json().then(data => ({ status: res.status, body: data }))) 
      .then(({ status, body }) => {
        if (status === 200) {
          const updatedList = newUserList.map(user =>
            user._id === userId ? { ...user, verifiedStatus: 'verified' } : user
          );
          setNewUserList(updatedList);
          toast.success('User verified successfully');
        } else {
          toast.error('Failed to verify user: ' + body.message);
        }
      })
     
  };




  return (
    <div>
      <NavDashBoard></NavDashBoard>
      <div className="p-4">

        <div className='flex justify-center'>
          <ul className="">
            {newUserList.map((user, index) => (
              <li key={user.id}

                className='my-5 p-5'
              >
                <div>
                  <div className="stats shadow-xl rounded-xl w-full">
                    <div className="stat flex items-center w-8/12">
                      <div className='mt-4'>
                        <div className="avatar online">
                          <div className="w-16 rounded-full">
                            {
                              user?.photo === undefined ?
                                <img src={userimg} alt="Prime Car" />
                                : <img src={user?.photo} />

                            }
                          </div>
                        </div>
                      </div>
                      <div>

                        <div className="stat-title">{user?.role} #00{index + 1}</div>

                        <div className='flex '>
                          <div className="stat-value text-yellow-600 text-3xl">{user.name} </div>
                          <small className=" mt-2 ml-2  stat-desc uppercase font-bold badge bg-blue-600 text-white">{user?.gender}</small>
                          <span>
                            {user?.verifiedStatus === 'verified' ? <FaCheckCircle className='text-bold text-blue-600 mt-3 ml-3' /> : <IoIosCheckmarkCircleOutline className='text-bold text-blue-600 mt-3 ml-3' />}

                          </span>
                        </div>
                        <div className='flex my-1 '>
                          {user?.gender === 'male' ? <FaChildReaching className='font-bold' /> : <FaChildDress className='font-bold' />}


                          <small className="  ml-1 stat-desc  font-bold text-slate-900">{user.dob}</small>
                        </div>
                        <div className='flex'>
                          <small className=" mr-2  stat-desc   badge bg-green-400 text-slate-900">{user?.phone}</small>
                          <a href={user?.facebook} target='_blank'><FaFacebook /> </a>


                        </div>


                        <div className="stat-desc text-gray-500">{user?.email}</div>

                        <div className="stat-desc text-secondary mt-1">{user?.location}, {user?.upazila}, {user?.address} </div>


                      </div>



                    </div>

                    <div className="stat flex items-center jsutify-between">
                      <div className=''>
                        <button className="btn btn-sm bg-yellow-900 hover:bg-yellow-600  text-white"
                          onClick={() => handleDelete(user?._id)}
                        >Remove User</button><br />

                        {user?.verifiedStatus === undefined || user?.verifiedStatus === "" ? <button className="btn btn-sm hover:bg-slate-600  bg-slate-800 mt-2 text-white"
                          onClick={() => handleVerify(user?._id)}
                        >Verify User</button> : null}

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

export default ManageUser;