import { useEffect, useState } from 'react';
import NavDashBoard from '../../Shared/Navbar/NavDashBoard';
import useUsersAuth from '../../../hooks/useUsersAuth';
import Loading from '../../Shared/Loading/Loading';
import userimg from '../../../assets/user.png'

import { FaFacebook } from 'react-icons/fa';
import { FaChildDress, FaChildReaching } from "react-icons/fa6";

const ManageUser = () => {
  const [userData, loading] = useUsersAuth();
  const [useronly, setUseronly] = useState([]);

  useEffect(() => {
    fetch('https://transport-server2-1.onrender.com/users')
      .then(res => res.json())
      .then(data => {
        const filteredUsers = data.filter(user => user.role === 'user');
        setUseronly(filteredUsers);

      })

  }, []);

  if (loading) {
    return <Loading></Loading>;
  };




  console.log(useronly);
  return (
    <div>
      <NavDashBoard></NavDashBoard>
      <div className="p-4">
        <h1 className="text-2xl font-bold">user Management</h1>
        <div className='flex justify-center'>
          <ul className="users-list">
            {useronly.map((user, index) => (
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
                        <div className="stat-figure text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">{user?.role} #00{index + 1}</div>

                        <div className='flex '>
                          <div className="stat-value text-yellow-600 text-3xl">{user.name} </div>
                          <small className=" mt-2 ml-2  stat-desc uppercase font-bold badge bg-blue-600 text-white">{user?.gender}</small>
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
                        <button className="btn btn-sm bg-yellow-900 hover text-white">Delete User</button><br />
                        <button className="btn btn-sm  bg-slate-800 mt-2 text-white" >Verify User</button>
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