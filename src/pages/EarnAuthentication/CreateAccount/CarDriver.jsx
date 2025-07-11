import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { CgInternal } from "react-icons/cg";

const CarDriver = () => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(createUser, "create user");
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log("logged user ", loggedUser.uid);
                const uid = loggedUser.uid;
                updateUserProfile(
                    data.name,
                    data.role,
                    data.gender,
                    data.phone,
                    data.email,
                    uid
                )
                    .then(() => {
                        const cardriverinfo = {
                            _id: uid,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            gender: data.gender,
                            phone: data.phone,
                        };
                        axiosPublic
                            .post("/cardriveraccount", cardriverinfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log("user added to the database");
                                    reset();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User created successfully.",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate("/");
                                } else {
                                    setErrorMessage(
                                        "An error occurred while adding user to the database."
                                    );
                                }
                            })
                            .catch((error) => {
                                console.error("Error adding user to the database:", error);
                                setErrorMessage(
                                    "An error occurred while adding user to the database. Please try again later."
                                );
                            });
                    })
                    .catch((error) => {
                        console.error("Error updating user profile:", error);
                        setErrorMessage(
                            "An error occurred while updating user profile. Please try again later."
                        );
                    });
            })

            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("This email address is already in use.");
                } else {
                    setErrorMessage("An error occurred. Please try again later.");
                }
            });
    };
    return (
        <>
            <Helmet>
                <title>City Mover | Sign Up | Car Driver</title>
            </Helmet>

            <div className="card-body  p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Car Entry for </span>
                        </label>

                        <select
                            type="text"
                            {...register("role", { required: true, maxLength: 20 })}
                            id="dropdown"
                            className="select select-bordered w-fulle"
                            required
                        >
                            <option value="primecardriver">Prime</option>
                            <option value="maxcardriver">Max </option>
                            <option value="pluscardriver">Plus</option>
                        </select>

                        {errors.role?.type === "required" && (
                            <span
                                className="text-red-600 text-sm mt-1"
                                role="alert"
                            >
                                This is required
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold"> Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: true,
                                    maxLength: 20,
                                    pattern: /^[A-Za-z\s]+$/i,
                                })}
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                            {errors.name?.type === "required" && (
                                <span className="text-red-600 text-sm mt-1" role="alert">
                                    Name is required
                                </span>
                            )}
                            {errors.name?.type === "pattern" && (
                                <p className="text-red-600 text-sm mt-1">
                                    Name can only contain letters and spaces
                                </p>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                {...register("email", { required: true })}
                                className="input input-bordered"
                                required
                            />
                            {errors.email && (
                                <span className="text-red-600 text-sm mt-1">
                                    Email is required
                                </span>
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
                            <div className="input input-bordered">
                                <span className="mt-2">(+880) </span>
                                <input
                                    type="tel"
                                    country={"bd"}
                                    {...register("phone", {
                                        required: true,
                                        maxLength: 10,
                                        minLength: 10,
                                    })}
                                    placeholder=" "
                                    className="mt-2"
                                    required
                                />
                            </div>
                            {errors.phone?.type === "required" && (
                                <span className="text-red-600 text-sm  mt-1" role="alert">
                                    Phone number is required
                                </span>
                            )}
                            {(errors.phone?.type === "maxLength" ||
                                errors.phone?.type === "minLength") && (
                                    <span className="text-red-600 text-sm  mt-1" role="alert">
                                        Phone number must be 10 digits
                                    </span>
                                )}
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Gender </span>
                            </label>
                            <div className="input input-bordered">
                                <select
                                    type="text"
                                    {...register("gender", { required: true, maxLength: 20 })}
                                    placeholder="gender"
                                    required
                                    className="border-0 mt-2 border-none outline-none"
                                >
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            {errors.gender?.type === "required" && (
                                <span className="text-red-600 text-sm mt-1" role="alert">
                                    Gender is required
                                </span>
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
                                placeholder="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                className="input input-bordered"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm  mt-1">
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
                                placeholder="confirm password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                                className="input input-bordered"
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-sm  mt-1 text-sm mt-1">
                                    {errors.confirmPassword.message ||
                                        "Confirm Password is required"}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <input
                            value="Sign Up"
                            type="submit"
                            className="btn bg-yellow-600 hover:bg-yellow-700 text-white"
                        />
                    </div>
                </form>

                <p className="text-center mt-4 text-sm">
                    <small className="font-bold">
                        Already have an account?
                        <Link
                            className="text-yellow-600 hover:text-yellow-700 ml-1"
                            to="/signupdriver"
                        >
                            Sign In
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
        </>
    );
};

export default CarDriver;
