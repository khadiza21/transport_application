import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";

import { CgInternal } from "react-icons/cg";

const BusDriverLog = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { email, password } = data;

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
                    },
                });
                navigate("/");
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
                        },
                        customClass: {
                            confirmButton: 'swal-button-yellow'
                        }
                    });
                }
            });

        reset();

    };
    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 uppercase"><span className="font-bold text-yellow-600">Sign</span> In</h2>
                    </div>
                    <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
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

                        <p className="text-center mt-4 text-sm">
                            <small className="font-bold">
                                Don't have any account?
                                <Link
                                    className="text-yellow-600 hover:text-yellow-700 ml-1"
                                    to="/earnmoneyauth"
                                >
                                    Sign Up
                                </Link>
                            </small>
                        </p>

                        <div className="mt-4  max-w-max border mx-auto border-2 shadow px-2 border-dotted py-1">
                            <Link
                                to="/"
                                className="flex items-center gap-1 text-center text-sm hover:text-yellow-600 text-black underline w-auto max-w-max"
                            >
                                Go Home <CgInternal />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusDriverLog;