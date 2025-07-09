import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <li><Link to="/home" className="text-white">Home</Link></li>

            {(driverData || cardriverData || userData) &&
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
                            <li><Link to="/busService" className='text-white'>Bus</Link></li>
                            <li><Link to="/carService" className='text-white'>Car</Link></li>
                        </ul>
                    </details>
                </li>
            )}

            {userData && (userData?.role === 'user' || userData?.role === 'admin') ? null : (
                <li>
                    <details>
                        <summary className='text-white'>Earn</summary>
                        <ul className="p-2 bg-opacity-50 bg-neutral-950">
                            {(cardriverData?.role === 'primecardriver' ||
                                cardriverData?.role === 'maxcardriver' ||
                                cardriverData?.role === 'pluscardriver') ? null : (
                                <li><Link to="/busdriverdashboard" className='text-white'>Bus</Link></li>
                            )}
                            {(driverData?.role === 'publicbus' || driverData?.role === 'femalebus') ? null : (
                                <li><Link to="/cardriverdashboard" className='text-white'>Car</Link></li>
                            )}
                        </ul>
                    </details>
                </li>
            )}

            {userData?.role === 'user' && <li><Link to="/dashboard" className='text-white'>Dashboard</Link></li>}
            {userData?.role === 'admin' && <li><Link to="/dashboard" className='text-white'>Dashboard</Link></li>}
            {(driverData?.role === 'publicbus' || driverData?.role === 'femalebus') &&
                <li><Link to="/busdriverdashboard" className='text-white'>Dashboard</Link></li>}
            {(cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') &&
                <li><Link to="/cardriverdashboard" className='text-white'>Dashboard</Link></li>}

            <li><Link to="/about" className="text-white">About</Link></li>
            <li><Link to="/contact" className="text-white">Contact</Link></li>
        </>
    );

    return (
        <div className="navbar fixed z-10 bg-opacity-50 bg-neutral-950 text-white w-full px-4 md:px-10 lg:px-20">
            <div className="flex-1">
                <div className="dropdown lg:hidden">
                    <button tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-bold">
                    <span className='text-yellow-500'>City</span>Mover
                </Link>
            </div>
            <div className="hidden lg:flex flex-1 justify-center">
                <ul className="menu menu-horizontal space-x-2 text-white font-semibold">
                    {navOptions}
                </ul>
            </div>
            <div className="flex-none">
                {user ? (
                    <Link onClick={handleLogOut} className="btn btn-sm md:btn-md">Sign Out</Link>
                ) : (
                    <Link to="/login" className="btn btn-sm md:btn-md">Sign Up</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
