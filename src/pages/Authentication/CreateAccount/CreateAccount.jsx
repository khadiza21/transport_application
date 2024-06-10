import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginimg from '../../../assets/log2.webp';
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const CreateAccount = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Form data:', data);
        if (data.role === 'admin' && data.secretPassword !== '@192002040Bk') {

            setErrorMessage('Incorrect secret password for admin role.');
            return;
        } else {

        }

        setErrorMessage('');
        console.log(createUser, 'create user')
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log('logged user ', loggedUser.uid);
                const uid = loggedUser.uid;
                updateUserProfile(data.name, data.role, data.gender, data.phone, data.email, uid)
                    .then(() => {
                        const userInfo = {
                            _id: uid,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            gender: data.gender,
                            phone: data.phone
                        };
                        axiosPublic.post('/users', userInfo)
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

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };





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
                            <div className="card-body" >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Join as  </span>
                                        </label>
                                        <div className='input input-bordered' >
                                            <select type="text" {...register("role", { required: true, maxLength: 20 })} placeholder="" id="dropdown =" className=" role w-full border-0 mt-2 border-none outline-none" required
                                                onChange={handleRoleChange}
                                            ><option value="user">User</option>
                                                <option value="admin">Admin</option>

                                            </select>
                                        </div>

                                        {errors.role?.type === "required" && (
                                            <span className="text-red-600" role="alert">This is required</span>
                                        )}
                                    </div>




                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold "> Name</span>
                                        </label>
                                        <input type="text"  {...register("name", { required: true, maxLength: 20, pattern: /^[A-Za-z\s]+$/i })} placeholder="name" className=" name input input-bordered" required />
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
                                                {...register("phone", { required: true, maxLength: 10, minLength: 10 })} placeholder=" " className=" phone mt-2" required />

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
                                            <select type="text" {...register("gender", { required: true, maxLength: 20 })} placeholder="gender" required className="gender border-0 mt-2 border-none outline-none" >
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="other">Other</option>
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
                                        <input type="email" placeholder="email"  {...register("email", { required: true })} className=" email input input-bordered" required />
                                        {errors.email && <span className="text-red-600">Email is required</span>}

                                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                                    </div>

                                    {role === 'admin' && (
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-bold">Secret Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                {...register("secretPassword", { required: true })}
                                                placeholder="Secret Password"
                                                className="secretPassword input input-bordered "
                                                required
                                            />
                                            {errors.secretPassword && (
                                                <span className="text-red-600" role="alert">Secret password is required for admin role</span>
                                            )}
                                        </div>
                                    )}

                                    {role === 'user' && (

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-bold">Password</span>
                                            </label>
                                            <input type="password" placeholder="password"  {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                            })} className="input input-bordered password" required />
                                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                        </div>



                                    )}            {role === 'user' && (

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
                                                className="input input-bordered confirmPassword"
                                                required
                                            />
                                            {errors.confirmPassword?.type === 'required' && <p className="text-red-600">Confirm Password is required</p>}
                                            {errors.confirmPassword?.type === 'validate' && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                                        </div>

                                    )}





                                    <div className="form-control mt-6">

                                        <input id="submit" value={"Sign Up"} type="submit" className="btn bg-yellow-600 hover:bg-yellow-700 text-white" />
                                    </div>
                                </form>
                                <div className=" mt-6 w-full">
                                    <Link to='/' ><button className=" w-full btn bg-slate-600 hover:bg-slate-700 text-white"> Back Home</button></Link>

                                </div>
                            </div>
                            <p className='text-center mb-4 pb-4 '><small className='font-bold'>Already have an account <Link className='font-bold text-blue-600' to="/login">SignIn</Link> </small></p>

                        </div></div>









                </div>
            </div>
        </>
    );
};

export default CreateAccount;