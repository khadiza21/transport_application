import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';

const BusDriver = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(createUser, 'create user')
        console.log('uid');
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log('logged user ', loggedUser.uid);
                const uid = loggedUser.uid;
                updateUserProfile(data.name, data.role, data.gender, data.phone, data.email, uid)
                    .then(() => {
                        const busdriverinfo = {
                            _id: uid,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            gender: data.gender,
                            phone: data.phone
                        };
                        axiosPublic.post('/busdriveraccount', busdriverinfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate("/");

                                } else {
                                    setErrorMessage('An error occurred while adding user to the database.');
                                }
                            })
                            .catch(error => {
                                console.error("Error adding user to the database:", error);
                                setErrorMessage('An error occurred while adding user to the database. Please try again later.');
                            });
                    })
                    .catch(error => {
                        console.error("Error updating user profile:", error);
                        setErrorMessage('An error occurred while updating user profile. Please try again later.');
                    });
            })

            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('This email address is already in use.');
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
    };


    return (
        <>
            <Helmet>
                <title>City Mover | Sign Up | Bus Driver</title>
            </Helmet>
            <div className="card-body" >
                <form onSubmit={handleSubmit(onSubmit)}>



                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Bus Entry for  </span>
                        </label>
                        <div className='input input-bordered' >
                            <select type="text" {...register("role", { required: true, maxLength: 20 })} placeholder="" id="dropdown" className="w-full border-0 mt-2 border-none outline-none" required >
                                <option value="femalebus">Only Female Passanger</option>
                                <option value="publicbus">Public Passanger</option>
                            </select>
                        </div>

                        {errors.role?.type === "required" && (
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


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="email"  {...register("email", { required: true })} className="input input-bordered" required />
                        {errors.email && <span className="text-red-600">Email is required</span>}

                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
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
            </div>
            <p className='text-center mb-4 pb-4 '><small className='font-bold'>Already have an account <Link className='font-bold text-blue-600' to="/signupdriver">SignIn</Link> </small></p>
        </>
    );
};

export default BusDriver;