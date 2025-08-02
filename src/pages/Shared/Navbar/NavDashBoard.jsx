import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useUsersAuth from '../../../hooks/useUsersAuth';
import userImge from '../../../assets/user.png'
import { AuthContext } from '../../../providers/AuthProvider';

const NavDashBoard = () => {

    const [userData, loading] = useUsersAuth();
    console.log(userData?.photo, 'userdata')
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <div className="shadow-xl bg-slate-100">
            <div className="navbar container mx-auto px-4 sm:px-6 lg:px-8">
              
                <div className="flex-1">
                    <Link to="/" className="text-xl font-bold whitespace-nowrap">
                        <span className="text-[26px] font-bold">
                            <span className="text-yellow-500 text-[28px]">City</span> Mover
                        </span>
                    </Link>
                </div>

             
                <div className="flex items-center gap-4">
                  
                    <div className="hidden sm:block text-right">
                        <h1 className="font-bold uppercase text-sm">
                            {userData?.name} ({userData?.role})
                        </h1>
                        <small className="text-gray-500 text-xs">{userData?.email}</small>
                    </div>

                 
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={userData?.photo === undefined ? userImge : userData?.photo}
                                />
                            </div>
                        </div>

                       
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li>
                                {userData?.role === "admin" ? (
                                    <Link to="/adminprofile">Profile</Link>
                                ) : (
                                    <Link to="/userprofile">Profile</Link>
                                )}
                            </li>

                            {userData?.role === "user" && (
                                <>
                                    <li><Link to="/addreview">Add Review</Link></li>
                                    <li><Link to="/historylist">History</Link></li>
                                </>
                            )}

                            {userData?.role === "admin" && (
                                <>
                                    <li><Link to="/managecardriver">Car Driver Manage</Link></li>
                                    <li><Link to="/managebusdriver">Bus Driver Manage</Link></li>
                                    <li><Link to="/manageuser">User Manage</Link></li>
                                    <li><Link to="/managecar">Car Manage</Link></li>
                                    <li><Link to="/managebus">Bus Manage</Link></li>
                                </>
                            )}

                            <li><Link to="/allreview">Reviews</Link></li>

                            <li>
                                {user ? (
                                    <Link onClick={handleLogOut} className="font-bold" to="/">
                                        Sign Out
                                    </Link>
                                ) : (
                                    <Link className="font-bold" to="/login">
                                        Sign Up
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};
{/* <span className="badge">New</span> */ }
export default NavDashBoard;