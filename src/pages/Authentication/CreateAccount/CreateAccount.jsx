import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { CgInternal } from "react-icons/cg";

const CreateAccount = () => {
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
    const [passErrorMessage, setPassErrorMessage] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const onSubmit = (data) => {
        console.log("Form data:", data);
        if (data.role === "admin" && data.secretPassword !== "@192002040Bk"){
            setPassErrorMessage("Incorrect secret password for admin role.");
            return;
        } 

        setErrorMessage("");
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
                        const userInfo = {
                            _id: uid,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            gender: data.gender,
                            phone: data.phone,
                        };
                        axiosPublic
                            .post("/users", userInfo)
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

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>City Mover | Sign Up</title>
            </Helmet>

            <div className=" bg-base-100">
                <div className="container px-4 mx-auto my-auto flex flex-col items-center justify-center">
                    <h1 className="font-bold uppercase my-10">
                        <span className="font-bold text-yellow-600">SIgn</span> Up
                    </h1>
                    <div className="card-body shadow border rounded-lg w-full  lg:w-1/2 max-h-max">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Join as </span>
                                </label>
                                <div className="input input-bordered">
                                    <select
                                        type="text"
                                        {...register("role", { required: true, maxLength: 20 })}
                                        placeholder=""
                                        id="dropdown ="
                                        className=" role w-full border-0 mt-2 border-none outline-none"
                                        required
                                        onChange={handleRoleChange}
                                    >
                                        <option className="bg-slate-200" value="user">
                                            User
                                        </option>
                                        <option className="bg-slate-200" value="admin">
                                            Admin
                                        </option>
                                    </select>
                                </div>

                                {errors.role?.type === "required" && (
                                    <span className="text-red-600 mt-1 text-xs" role="alert">
                                        This is required
                                    </span>
                                )}
                            </div>

                            <div className="flex  flex-col md:flex-row gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-bold "> Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z\s]+$/i,
                                        })}
                                        placeholder="name"
                                        className=" name input input-bordered"
                                        required
                                    />
                                    {errors.name?.type === "required" && (
                                        <span className="text-red-600 mt-1 text-xs" role="alert">
                                            Name is required
                                        </span>
                                    )}
                                    {errors.name?.type === "pattern" && (
                                        <p className="text-red-600 mt-1 text-xs">
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
                                        className=" email input input-bordered"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 mt-1 text-xs">
                                            Email is required
                                        </p>
                                    )}
                                    {errorMessage && (
                                        <p className="text-red-600 mt-1 text-xs">{errorMessage}</p>
                                    )}

                                </div>
                            </div>

                            <div className="flex  flex-col md:flex-row gap-4">
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
                                            className=" phone mt-2"
                                            required
                                        />
                                    </div>
                                    {errors.phone?.type === "required" && (
                                        <span className="text-red-600 mt-1 text-xs" role="alert">
                                            Phone number is required
                                        </span>
                                    )}
                                    {(errors.phone?.type === "maxLength" ||
                                        errors.phone?.type === "minLength") && (
                                            <span className="text-red-600 mt-1 text-xs" role="alert">
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
                                            className="gender border-0 mt-2 border-none outline-none"
                                        >
                                            <option value="female">Female</option>
                                            <option value="male">Male</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.gender?.type === "required" && (
                                        <span className="text-red-600 mt-1 text-xs" role="alert">
                                            Gender is required
                                        </span>
                                    )}
                                </div>
                            </div>

                            {role === "admin" && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">
                                            Secret Password
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("secretPassword", { required: true })}
                                        placeholder="Secret Password"
                                        className="secretPassword input input-bordered "
                                        required
                                    />
                                    
                                   
                                    {errors.secretPassword && (
                                        <p className="text-red-600 mt-1 text-xs" role="alert">
                                            Secret password is required for admin role
                                        </p>
                                    )}
                                    {passErrorMessage && (
                                        <p className="text-red-600 mt-1 text-xs">{passErrorMessage}</p>
                                    )}
                                </div>
                            )}
                            <div className="flex  flex-col md:flex-row gap-4">
                                {role === "user" && (
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
                                                pattern:
                                                    /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            })}
                                            className="input input-bordered password"
                                            required
                                        />
                                        {errors.password?.type === "required" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                Password is required
                                            </p>
                                        )}
                                        {errors.password?.type === "minLength" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                Password must be 6 characters
                                            </p>
                                        )}
                                        {errors.password?.type === "maxLength" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                Password must be less than 20 characters
                                            </p>
                                        )}
                                        {errors.password?.type === "pattern" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                Password must have one Uppercase one lower case, one
                                                number and one special character.
                                            </p>
                                        )}
                                    </div>
                                )}
                                {role === "user" && (
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-bold">
                                                Confirm Password
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="confirm password"
                                            {...register("confirmPassword", {
                                                required: true,
                                                validate: (value) =>
                                                    value === watch("password") ||
                                                    "Passwords do not match",
                                            })}
                                            className="input input-bordered confirmPassword"
                                            required
                                        />
                                        {errors.confirmPassword?.type === "required" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                Confirm Password is required
                                            </p>
                                        )}
                                        {errors.confirmPassword?.type === "validate" && (
                                            <p className="text-red-600 mt-1 text-xs">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    id="submit"
                                    value={"Sign Up"}
                                    type="submit"
                                    className="btn bg-yellow-600 hover:bg-yellow-700 text-white"
                                />
                            </div>
                        </form>
                        <p className="text-center max-h-max mt-4 text-sm">
                            <small className="font-bold">
                                Already have an account?
                                <Link
                                    className="text-yellow-600 hover:text-yellow-700 ml-1"
                                    to="/login"
                                >
                                    SignIn
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

export default CreateAccount;
