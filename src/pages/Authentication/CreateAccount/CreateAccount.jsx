import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginimg from '../../../assets/log2.webp';



const CreateAccount = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <>
            <Helmet>
                <title>City Mover | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">

                    <div className='flex justify-center items-center mx-24 py-4 w-full h-full '>
                        <div>
                            <h1 className='text-center mt-4 font-bold uppercase text-4xl mb-24'><span className=' font-bold text-yellow-600 drop-shadow-xl'>Sign</span>Up</h1>
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
                                        <span className="label-text font-bold"> Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true, maxLength: 20, pattern: /^[A-Za-z\s]+$/i })} placeholder="name" className="input input-bordered" required />
                                    {errors.name?.type === "required" && (
                                        <span className="text-red-600" role="alert">First name is required</span>
                                    )}
                                    {errors.name?.type === 'pattern' && <p className="text-red-600">Name can only contain letters and spaces</p>}
                                </div>


                                {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Last Name</span>
                                    </label>
                                    <input type="text" {...register("lastName", { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i })} placeholder="lastname" className="input input-bordered" required />
                                    {errors.lastname?.type === "required" && (
                                        <span className="text-red-600" role="alert">Last name is required</span>
                                    )}
                                </div> */}

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Phone</span>
                                    </label>
                                    <input type="phone"
                                        country={'bd'}
                                        {...register("phone", { required: true })} placeholder="phone" className="input input-bordered" required />
                                    {errors.phone?.type === "required" && (
                                        <span className="text-red-600" role="alert">Phone number is required</span>
                                    )}
                                </div>







                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Gender </span>
                                    </label>
                                    <div className="input input-bordered">
                                        <select type="text" {...register("gender", { required: true, maxLength: 20 })} placeholder="gender" required className="border-0 mt-2 border-none outline-none" >
                                            <option value="female">female</option>
                                            <option value="male">male</option>
                                            <option value="other">other</option>
                                        </select>
                                    </div>
                                    {errors.gender?.type === "required" && (
                                        <span className="text-red-600" role="alert">Gender is required</span>
                                    )}
                                </div>




                                {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Age</span>
                                </label>
                                <input type="number" {...register("age", { min: 18, max: 99 })} placeholder="age" className="input input-bordered" required />

                            </div> */}

                                {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div> */}


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input type="email" placeholder="email"  {...register("email", { required: true })} className="input input-bordered" required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Password</span>
                                    </label>
                                    <input type="password" placeholder="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} className="input input-bordered" required />
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                </div>


                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        {...register("confirmPassword", {
                                            required: true,
                                            validate: value => value === watch('password') || "Passwords do not match"
                                        })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.confirmPassword?.type === 'required' && <p className="text-red-600">Confirm Password is required</p>}
                                    {errors.confirmPassword?.type === 'validate' && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                                </div>




                                <div className="form-control mt-6">

                                    <input value={"Sign Up"} type="submit" className="btn bg-yellow-600 hover:bg-yellow-700 text-white" />
                                </div>
                            </form>
                            <p className='text-center mb-4 pb-4 '><small className='font-bold'>Already have an account <Link className='font-bold text-blue-600' to="/login">SignUp</Link> </small></p>
                            {/* <SocialLogin></SocialLogin> */}
                        </div></div>









                </div>
            </div>
        </>
    );
};

export default CreateAccount;