import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useUsersAuth from '../../../hooks/useUsersAuth';
import busdriverdata from '../../../hooks/busdriverdata';
import useCarDriverData from '../../../hooks/useCarDriverData';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userData, loading] = useUsersAuth();
    const [driverData] = busdriverdata();
    const [cardriverData] = useCarDriverData();

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const navOptions = (
        <>
            <li><NavLink to="/home" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Home</NavLink></li>

            {
                (driverData || cardriverData || userData) &&
                    (driverData?.role === 'publicbus' ||
                        driverData?.role === 'femalebus' ||
                        cardriverData?.role === 'primecardriver' ||
                        cardriverData?.role === 'maxcardriver' ||
                        cardriverData?.role === 'pluscardriver' ||
                        userData?.role === 'admin') ? null : (
                    <li>
                        <details>
                            <summary className='text-white'>Services</summary>
                            <ul className="p-2 bg-opacity-50 bg-neutral-950">
                                <li><NavLink to="/busService" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Bus</NavLink></li>
                                <li><NavLink to="/carService" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Car</NavLink></li>
                            </ul>
                        </details>
                    </li>
                )
            }

            {userData && (userData?.role === 'user' || userData?.role === 'admin') ? null : (
                <li>
                    <details>
                        <summary className='text-white'>Earn</summary>
                        <ul className="p-2 bg-opacity-50 bg-neutral-950">
                            {(cardriverData?.role === 'primecardriver' ||
                                cardriverData?.role === 'maxcardriver' ||
                                cardriverData?.role === 'pluscardriver') ? null : (
                                <li><NavLink to="/busdriverdashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Bus</NavLink></li>
                            )}
                            {(driverData?.role === 'publicbus' || driverData?.role === 'femalebus') ? null : (
                                <li><NavLink to="/cardriverdashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Car</NavLink></li>
                            )}
                        </ul>
                    </details>
                </li>
            )}

            {userData?.role === 'user' && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Dashboard</NavLink></li>}
            {userData?.role === 'admin' && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Dashboard</NavLink></li>}
            {(driverData?.role === 'publicbus' || driverData?.role === 'femalebus') &&
                <li><NavLink to="/busdriverdashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Dashboard</NavLink></li>}
            {(cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') &&
                <li><NavLink to="/cardriverdashboard" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Dashboard</NavLink></li>}

            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-500" : "text-white"}>Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-opacity-50 bg-neutral-950 text-white w-full ">

            <div className="container px-4 mx-auto">
                <div className='flex items-center justify-between w-full'>

                    <div className="flex items-center gap-2">
                        <div className='flex items-center flex-row'>
                            <div className="dropdown lg:hidden">
                                <button tabIndex={0} className="btn btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 rounded-box ">
                                    {navOptions}
                                </ul>
                            </div>

                            <div>
                                <NavLink to="/" className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase">
                                    <span className='text-yellow-500 font-bold'>City </span>Mover
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center ">
                        <ul className="menu menu-horizontal text-white font-semibold">
                            {navOptions}
                        </ul>
                    </div>

                    <div>
                        {user ? (
                            <NavLink onClick={handleLogOut} className="btn btn-xs md:btn-sm">Sign Out</NavLink>
                        ) : (
                            <NavLink to="/login" className="btn btn-xs md:btn-sm">Sign Up</NavLink>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
