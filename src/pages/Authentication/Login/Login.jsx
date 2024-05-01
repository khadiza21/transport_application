import { useState } from 'react';
import loginimg from '../../../assets/log2.webp';

const Login = () => {
    const currentYear = new Date().getFullYear();

    const [selectedValue, setSelectedValue] = useState();

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    }
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.email.value;
        
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

    }

  
    return (
        <div className=' my-24 px-44 mx-48 sm:px-8 md:py-  '>
            <h1 className='text-center font-bold uppercase text-4xl py-8 '>Sign Up</h1>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
                <div className=' flex justify-center items-center'>
                    <figure><img src={loginimg} alt="authentication-login" /></figure>
                </div>

                <div className='flex justify-center items-center'>
                    <div className="card shrink-0 w-full  shadow-2xl bg-base-100  ">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">


                           

                         
                                <label className="label dropdown ">
                                    <span className="label-text font-bold"> Sign Up As  </span>
                                </label>
                                <div className='input input-bordered'>
                                    <select id="dropdown" value={selectedValue} onChange={handleSelectChange} className='border-0 mt-2 border-none outline-none'>
                                        <option className=" text-gray-400" value="">Select...</option>
                                        <option className=""  value="As an Admin">As an Admin</option>
                                        <option className=""  value="As a User">As a User</option>
                                        <option className=""  value="As a Driver">As a Driver</option>
                                    </select>
                                    
                                </div>



                                <label className="label">
                                    <span className="label-text font-bold">  Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />

                                <p className="text-red-500 text-xs italic">Please choose a password.</p>
                                <div className="flex items-start my-5">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300">Remember me</label>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover align-baseline font-bold text-sm text-dark-600 hover:text-yellow-800">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className='btn bg-yellow-600 hover:bg-yellow-700 text-white font-bold' type="submit" value="Sign Up" />
                            </div>

                        </form>

                    </div>
                </div>


            </div>

            <p className="text-center text-gray-500 text-xs font-bold my-24">
                &copy;{currentYear} bk group. All rights reserved.
            </p>
        </div>
    );
};

export default Login;