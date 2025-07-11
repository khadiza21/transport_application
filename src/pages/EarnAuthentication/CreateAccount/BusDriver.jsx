import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import { CgInternal } from "react-icons/cg";

const BusDriver = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(createUser, 'create user')
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
                                        position: 'center',
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
            <div className="card-body p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Bus Entry for</span>
                        </label>
                        <select
                            {...register("role", { required: true, maxLength: 20 })}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="femalebus">Only Female Passenger</option>
                            <option value="publicbus">Public Passenger</option>
                        </select>
                        {errors.role?.type === "required" && (
                            <span className="text-red-600 text-sm mt-1">This field is required</span>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: true,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z\s]+$/i,
                                })}
                                placeholder="Your name"
                                className="input input-bordered"
                                required
                            />
                            {errors.name?.type === "required" && (
                                <span className="text-red-600 text-sm mt-1">Name is required</span>
                            )}
                            {errors.name?.type === "pattern" && (
                                <span className="text-red-600 text-sm mt-1">Only letters and spaces allowed</span>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Your email"
                                className="input input-bordered"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-600 text-sm mt-1">Email is required</span>
                            )}
                            {errorMessage && (
                                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                            )}
                        </div>

                    </div>



                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Phone</span>
                            </label>
                            <div className="flex items-center input input-bordered gap-2 px-3">
                                <span>(+880)</span>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: true,
                                        maxLength: 10,
                                        minLength: 10,
                                    })}
                                    className="w-full outline-none border-none"
                                    placeholder="1234567890"
                                    required
                                />
                            </div>
                            {errors.phone && (
                                <span className="text-red-600 text-sm mt-1">
                                    Phone number must be 10 digits
                                </span>
                            )}
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Gender</span>
                            </label>
                            <select
                                {...register("gender", { required: true })}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender?.type === "required" && (
                                <span className="text-red-600 text-sm mt-1">Gender is required</span>
                            )}
                        </div>
                    </div>




                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                className="input input-bordered"
                                placeholder="Password"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.password.type === "minLength"
                                        ? "Password must be at least 6 characters"
                                        : errors.password.type === "maxLength"
                                            ? "Password must be less than 20 characters"
                                            : errors.password.type === "pattern"
                                                ? "Must include uppercase, lowercase, number & special character"
                                                : "Password is required"}
                                </p>
                            )}
                        </div>


                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                                className="input input-bordered"
                                placeholder="Confirm password"
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.confirmPassword.message ||
                                        "Confirm Password is required"}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            value="Sign Up"
                            className="btn bg-yellow-600 hover:bg-yellow-700 text-white w-full"
                        />
                    </div>
                </form>

                <p className="text-center mt-4 text-sm">
                    <small className="font-bold">
                        Already have an account?
                        <Link className="text-yellow-600 hover:text-yellow-700 ml-1" to="/signupdriver">
                            Sign In
                        </Link>
                    </small>
                </p>

                <div className=' border mx-auto border-2 shadow px-2 border-dotted py-1'>
                    <Link to="/" className="flex items-center gap-1 text-center text-sm hover:text-yellow-600 text-black underline w-auto max-w-max">Go Home <CgInternal /></Link>
                </div>
            </div>

        </>
    );
};

export default BusDriver;