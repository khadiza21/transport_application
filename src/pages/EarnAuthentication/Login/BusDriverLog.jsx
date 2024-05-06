import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";

const BusDriverLog = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();


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
                        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
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
                        <div className=" mt-4 w-full">
                            <Link to='/' ><button className=" w-full btn bg-slate-600 hover:bg-slate-700 text-white"> Go Home</button></Link>

                        </div>
                        <p className='text-center mb-4 pb-4 mt-4 '><small className='font-bold'>Create account..  <Link className='font-bold text-blue-600' to="/earnmoneyauth"> SignUp</Link> </small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusDriverLog;