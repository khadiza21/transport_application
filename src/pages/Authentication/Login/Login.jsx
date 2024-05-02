import { useContext, useEffect, useRef, useState } from 'react';
import loginimg from '../../../assets/log2.webp';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const captchaRef = useRef(null);
    const currentYear = new Date().getFullYear();
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);


    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(data);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })

        reset();

    };


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        const isValidCaptcha = validateCaptcha(user_captcha_value);
        setDisabled(!isValidCaptcha);

    }

    return (
        <>
            <Helmet>
                <title>CITY MOVER | Login</title>
            </Helmet>
          



            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">

                    <div className='flex justify-center items-center mx-24 py-4 w-full h-full '>
                        <div>
                            <h1 className='text-center mt-4 font-bold uppercase text-4xl mb-24'><span className=' font-bold text-yellow-600 drop-shadow-xl'>Sign</span>In</h1>
                            <figure ><img src={loginimg} alt="authentication-login" /></figure>
                        </div>
                    </div>



                    <div className="w-full">

                        <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Join as  </span>
                                    </label>
                                    <div className='input input-bordered' >
                                        <select type="text" {...register("rolename", { required: true, maxLength: 20 })} placeholder="rolename" id="dropdown" className="border-0 mt-2 border-none outline-none" required >
                                            <option className="text-gray-400" >Select...</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>

                                    {errors.rolename?.type === "required" && (
                                        <span className="text-red-600" role="alert">This is required</span>
                                    )}
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input type="email" placeholder="email"  {...register("email", { required: true })} className="input input-bordered" required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold"> Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        {...register("password", {
                                            required: true,
                                            validate: value => value === watch('password') || "Passwords do not match"
                                        })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.password?.type === 'required' && <p className="text-red-600"> Password is required</p>}
                                    {errors.password?.type === 'validate' && <p className="text-red-600">{errors.password.message}</p>}
                                </div>



                                <div className="form-control">
                                    <label className="label ">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handleValidateCaptcha} ref={captchaRef} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                                </div>



                                {/* <div className="flex items-start my-5">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-dark-300">Remember me</label>
                                </div> */}



                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover align-baseline font-bold text-sm text-dark-600 hover:text-yellow-800">Forgot password?</a>
                                </label>


                                <div className="form-control mt-6">

                                    <input disabled={disabled} value={"Sign In"} type="submit" className="btn bg-yellow-600 hover:bg-yellow-700 text-white" />
                                </div>

                            </form>

                            <p className='text-center mb-4 pb-4 '><small className='font-bold'>New Here? <Link className='font-bold text-blue-600' to="/signup">Create Account</Link> </small></p>
                        </div>


                        {/* <SocialLogin></SocialLogin> */}
                    </div>



                </div>

            </div>
            <p className="text-center text-gray-500 text-xs font-bold my-24">
                &copy;{currentYear} bk group. All rights reserved.
            </p>

        </>

    );
};

export default Login;
