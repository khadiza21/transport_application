import { useContext, useEffect, useState } from 'react';
import loginimg from '../../../assets/log2.webp';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [selectedValue, setSelectedValue] = useState("");


    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password, selectedValue);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })

        // Perform login logic

        // form.email.value = "";
        // form.password.value = "";
        // setSelectedValue("");
        form.captcha.value = "";
        form.reset();
        setSelectedValue("");
    }




    return (
        <ChildComponent
            disabled={disabled}
            selectedValue={selectedValue}
            handleSelectChange={handleSelectChange}
            handleLogin={handleLogin}
            handleValidateCaptcha={handleValidateCaptcha}
        />
    );
}

function ChildComponent({ selectedValue, handleSelectChange, handleLogin, handleValidateCaptcha, disabled }) {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Helmet>
                <title>CITY MOVER | Login</title>
            </Helmet>
            <div className='my-24 px-44 mx-48 sm:px-8 md:py-'>
                <h1 className='text-center font-bold uppercase text-4xl py-8'>Sign Up</h1>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                    <div className='flex justify-center items-center'>
                        <figure><img src={loginimg} alt="authentication-login" /></figure>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                            <form className="card-body" onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label dropdown">
                                        <span className="label-text font-bold">Sign Up As</span>
                                    </label>







                                    <div className='input input-bordered' >
                                        <select id="dropdown" value={selectedValue} onChange={handleSelectChange} className='border-0 mt-2 border-none outline-none' required>
                                            <option className="text-gray-400" value="">Select...</option>
                                            <option className="" value="As an Admin">As an Admin</option>
                                            <option className="" value="As a User">As a User</option>
                                            <option className="" value="As a Driver">As a Driver</option>
                                        </select>
                                    </div>
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <p className="text-red-500 text-xs italic mt-2">Please choose a password.</p>

                                    <div className="form-control">
                                        <label className="label ">
                                            <LoadCanvasTemplate />
                                        </label>
                                        <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                                    </div>



                                    <div className="flex items-start my-5">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300">Remember me</label>
                                    </div>



                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover align-baseline font-bold text-sm text-dark-600 hover:text-yellow-800">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <input disabled={disabled} className='btn bg-yellow-600 hover:bg-yellow-700 text-white font-bold' type="submit" value="Sign Up" />
                                </div>
                            </form>

                            <p className='text-center mb-4 pb-4 '><small className='font-bold'>New Here? <Link className='font-bold text-blue-600' to="/signup">Create an account</Link> </small></p>
                            {/* <SocialLogin></SocialLogin> */}
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-xs font-bold my-24">
                    &copy;{currentYear} bk group. All rights reserved.
                </p>
            </div> </>
    );
};

export default Login;
