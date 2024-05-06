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

    console.log(driverData, 'driverdata');
    console.log(userData, 'driverdata');
    console.log(userData?.role, 'user data rolename');
    console.log(driverData?.role, 'driver rolename');
    console.log(cardriverData?.role, 'car driver rolename');
    console.log('user data from navbar', userData);



    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const navOptions = <>

        <li> <Link to="/home"> <span className='text-white'>Home</span></Link></li>

        {(driverData || cardriverData) && (driverData?.role === 'pubilcbus' || driverData?.role === 'femalebus' || cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') ? null :
            <li>
                <details>
                    <summary><span className='text-white'>Services</span></summary>
                    <ul className="p-2 bg-opacity-50 bg-neutral-950">
                        <li><Link to="/busService"><span className='text-white'>Bus</span></Link></li>
                        <li><Link to="/carService"><span className='text-white'>Car</span></Link></li>
                        <li><Link to="/bikeService"><span className='text-white'>Bike</span></Link></li>
                    </ul>
                </details>
            </li>
        }

        {userData && (userData?.role === 'user' || userData?.role === 'admin') ? null :
            <li>
                <details>
                    <summary><span className='text-white'>Earn</span></summary>
                    <ul className="p-2 bg-opacity-50 bg-neutral-950">


                        {(cardriverData) && (cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') ? null : <li><Link to="/busdriverdashboard"><span className='text-white'>Bus</span></Link></li>}

                        {(driverData) && (driverData?.role === 'pubilcbus' || driverData?.role === 'femalebus') ? null :
                            <li><Link to="/cardriverdashboard"><span className='text-white'>Car</span></Link></li>}


                        {(driverData || cardriverData) && (driverData?.role === 'pubilcbus' || driverData?.role === 'femalebus' || cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') ? null : <li><Link to="/bikedriver"><span className='text-white'>Bike</span></Link></li>}
                    </ul>
                </details>
            </li>
        }


        {userData && (userData?.role === 'user') ? <li><Link to="/userdashboard"><span className='text-white'>DashBoard</span></Link></li> : null}
        {userData && (userData?.role === 'admin') ? <li><Link to="/admindashboard"><span className='text-white'>DashBoard</span></Link></li> : null}


        {driverData && (driverData?.role === 'publicbus' || driverData?.role === 'femalebus') ? <li><Link to="/busdriverdashboard"><span className='text-white'>DashBoard</span></Link></li> : null}
        {cardriverData && (cardriverData?.role === 'primecardriver' || cardriverData?.role === 'maxcardriver' || cardriverData?.role === 'pluscardriver') ? <li><Link to="/cardriverdashboard"><span className='text-white'>DashBoard</span></Link></li> : null}





        <li><Link to="/about"><span className='text-white'>About</span></Link></li>
        <li><Link to="/contact"><span className='text-white'>Contact</span></Link></li>


    </>

    return (
        // px-48 is appropriet for large device. for small device not appropriet. need to responsive bg-base-100
        <div className="navbar fixed z-10 bg-opacity-50  bg-neutral-950 text-white px-40">
            <div className="navbar-start   mx-auto ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className=" font-bold menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-white rounded-box w-48  bg-slate-900 font-bold px-0">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className=" py-2  px-2 text-xl font-bold "> <span className='text-[26px] font-bold '>  <span className='px-0 mx-0 text-yellow-500  font-bold text-[28px]'>City</span >Mover</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white font-bold px-48 ">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>

                        <Link onClick={handleLogOut} className='btn font-bold' to="/">Sign Out</Link></>
                        : <Link className='btn font-bold' to="/login">Sign Up</Link>

                }

            </div>
        </div>


    );
};

export default Navbar;  