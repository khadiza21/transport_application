import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navOptions = <>
      <li><Link to="/">Home</Link></li>
        <li>
            <details>
                <summary>Services</summary>
                <ul className="p-2 bg-opacity-50 bg-neutral-950">
                    <li><Link to="/busService">Bus</Link></li>
                    <li><Link to="/carService">Car</Link></li>
                    <li><Link to="/bikeService">Bike</Link></li>

                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary>Earn</summary>
                <ul className="p-2 bg-opacity-50 bg-neutral-950">
                    <li><a>Bus</a></li>
                    <li><a>Bike</a></li>
                    <li><a>Car</a></li>
                </ul>
            </details>
        </li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

    </>

    return (
        // px-48 is appropriet for large device. for small device not appropriet. need to responsive
        <div className="navbar fixed z-10 bg-opacity-50  bg-neutral-950 text-white font-bold px-48">
            <div className="navbar-start   mx-auto ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  text-white font-bold px-48">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold">CityMover</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white font-bold px-48">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Sign In</a>
            </div>
        </div>


    );
};

export default Navbar;  