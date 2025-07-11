import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CgInternal } from "react-icons/cg";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const currentYear = new Date().getFullYear();
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const { email, password } = data;
        console.log(data);

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Sign In Successfully!",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
                    },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    Swal.fire({
                        title: "Invaid email or password.  Try Again!",
                        showClass: {
                            popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `,
                        },
                        hideClass: {
                            popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `,
                        },
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
            <div className="h-screen bg-base-100">
                <div className=" container px-4 mx-auto my-auto h-full flex flex-col items-center justify-center ">
                    <h1 className="font-bold uppercase my-10">
                        <span className="font-bold text-yellow-600">SIgn</span> In
                    </h1>

                    <div className="card-body shadow border rounded-lg w-full md:2/3 lg:w-1/3 max-h-max">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    {...register("email", { required: true })}
                                    className="input email input-bordered"
                                    required
                                />
                                {errors.email && (
                                    <span className="text-red-600 mt-1">Email is required</span>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold"> Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    {...register("password", { required: true })}
                                    className=" password input input-bordered"
                                    required
                                />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600 mt-1"> Password is required</p>
                                )}
                                {errors.password?.type === "validate" && (
                                    <p className="text-red-600 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <input
                                    id="loginButton"
                                    value={"Sign In"}
                                    type="submit"
                                    className="btn bg-yellow-600 hover:bg-yellow-700 text-white"
                                />
                            </div>
                        </form>

                        <p className="text-center max-h-max mt-4 text-sm">
                            <small className="font-bold">
                                New Here?
                                <Link
                                    className="text-yellow-600 hover:text-yellow-700 ml-1"
                                    to="/signup"
                                >
                                    Create Account
                                </Link>
                            </small>
                        </p>

                        <div className=" border mx-auto border-2 shadow px-2 border-dotted py-1">
                            <Link
                                to="/"
                                className="flex items-center gap-1 text-center text-sm hover:text-yellow-600 text-black underline w-auto max-w-max"
                            >
                                Go Home <CgInternal />
                            </Link>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-xs font-bold my-10">
                        &copy;{currentYear} bk group. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
