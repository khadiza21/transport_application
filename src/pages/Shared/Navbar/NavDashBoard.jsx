import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useUsersAuth from '../../../hooks/useUsersAuth';
import userImge from '../../../assets/user.png'
import { AuthContext } from '../../../providers/AuthProvider';

const NavDashBoard = () => {
 
    const [userData ,loading ] = useUsersAuth();
    console.log(userData?.photo, 'userdata')
    const { user,logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <div className="navbar bg-base-100 px-4 md:px-10 shadow-lg bg-slate-100">
                <div className="flex-1">
                    <Link to='/' className="text-xl font-bold">City Mover</Link>
                </div>
                <div>
                    <div>
                        <h1 className='px-4 font-bold uppercase'>{userData?.name}({userData?.role})</h1>
                        <small className=' px-4 text-gray-500'>{userData?.email}</small>
                    </div>
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    {userData?.photo === undefined  ? <img alt="User Avatar" src={userImge} /> : <img alt="User Avatar" src={userData?.photo} />}
                                  
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <li><Link to='/' >Home</Link></li>
                                <li><Link to='/dashboard' >Dashboard</Link></li>
                                <li>
                                    {userData?.role === 'admin' ?
                                        <Link to='/adminprofile' className="">
                                            Profile

                                        </Link> :

                                        <Link to='/userprofile' className="">
                                            Profile

                                        </Link>

                                    }

                                </li>
                                {
                                    userData?.role === 'user' ?
                                        <>
                                            <li>   <Link className=' ' to="/addreview">Add Review</Link></li>
                                            <li>   <Link className=' ' to="/historylist">History</Link></li></>
                                        : null

                                }
                                {
                                    userData?.role === 'admin' ?
                                        <>
                                            <li>   <Link className=' ' to="/">Driver Manage</Link></li>
                                            <li>   <Link className=' ' to="/">User Manage</Link></li>
                                            <li>   <Link className=' ' to="/">Vehicle Manage</Link></li>
                                            
                                            </>
                                        : null

                                }
                                <li><Link to='/allreview' >Reviews</Link></li>

                                

                                
                                <li>  {
                                    user ? <>

                                        <Link onClick={handleLogOut} className=' font-bold' to="/">Sign Out</Link></>
                                        : <Link className=' font-bold' to="/login">Sign Up</Link>

                                }</li>
                           


                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
{/* <span className="badge">New</span> */ }
export default NavDashBoard;