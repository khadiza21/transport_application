import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginimg from '../../../assets/log2.webp';
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";




const CreateAccount = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { email, password, name, rolename, gender, phone } = data;
        console.log(createUser, 'create user')
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log('logged user ', loggedUser);
                console.log('data', data);
                return updateUserProfile(name, rolename, gender, phone, email);
            })
            .then(() => {
                console.log('User Profile info updated', name, rolename, gender, phone, email);
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('This email address is already in use.');
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
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
                                        <select type="text" {...register("rolename", { required: true, maxLength: 20 })} placeholder="rolename" id="dropdown" className="w-full border-0 mt-2 border-none outline-none" required >
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
                                        <span className="text-red-600" role="alert"> Name is required</span>
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
                                    <div className="input input-bordered">
                                        <span className="mt-2">(+880) </span>
                                        <input type="tel"
                                            country={'bd'}
                                            {...register("phone", { required: true, maxLength: 10, minLength: 10 })} placeholder=" " className="mt-2" required />

                                    </div>
                                    {errors.phone?.type === "required" && (
                                        <span className="text-red-600" role="alert">Phone number is required</span>
                                    )}
                                    {(errors.phone?.type === "maxLength" || errors.phone?.type === "minLength") &&
                                        (<span className="text-red-600" role="alert">Phone number must be 10 digits</span>
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

                                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                                </div>


                                {/* 
                                <div className="form-control">


                                    <label className="label">
                                        <span className="label-text font-bold">Upload Image</span>
                                    </label>
                                    <div className="input input-bordered">
                                        <input
                                            type="file"
                                            {...register("image")}
                                            className="mt-2 "
                                            accept="image/*" // Limit to image files
                                        />
                                    </div>
                                    {errors.image?.type === 'required' && <p className="text-red-600">Image is required</p>}
                                </div> */}


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