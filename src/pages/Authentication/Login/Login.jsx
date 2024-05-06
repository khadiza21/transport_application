import { useContext } from 'react';
import loginimg from '../../../assets/log2.webp';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const currentYear = new Date().getFullYear();
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(data);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Sign In Successfully!",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true });
            }).catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    Swal.fire({
                        title: "Invaid email or password.  Try Again!",
                        showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                    });
                }
            });

        reset();

    };




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
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>





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
                                            {...register("password", { required: true, })}
                                            className="input input-bordered"
                                            required
                                        />
                                        {errors.password?.type === 'required' && <p className="text-red-600"> Password is required</p>}
                                        {errors.password?.type === 'validate' && <p className="text-red-600">{errors.password.message}</p>}
                                    </div>


                                    <div className="form-control mt-6">
                                        <input value={"Sign In"} type="submit" className="btn bg-yellow-600 hover:bg-yellow-700 text-white" />
                                    </div>

                                </form>
                                <div className=" mt-6 w-full">
                                    <Link to='/' ><button className=" w-full btn bg-slate-600 hover:bg-slate-700 text-white"> Back Home</button></Link>

                                </div>
                            </div>
                            <p className='text-center mb-4 pb-4 '><small className='font-bold'>New Here? <Link className='font-bold text-blue-600' to="/signup">Create Account</Link> </small></p>
                        </div>
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
