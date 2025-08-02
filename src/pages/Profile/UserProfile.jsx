import { useEffect, useState } from 'react';
import useUsersAuth from '../../hooks/useUsersAuth';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaFacebook } from 'react-icons/fa';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import NavDashBoard from '../Shared/Navbar/NavDashBoard';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';


const UserProfile = () => {
    const [userData, loading] = useUsersAuth();
    const [loadingg, setLoadingg] = useState(true);
    const [profile, setProfile] = useState({});
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userData) {
            const storedProfile = JSON.parse(localStorage.getItem("profile"));
            if (storedProfile) {
                setProfile(storedProfile);
                setLoadingg(false);
            } else {
                setLoadingg(false);
            }
        }
    }, [userData]);

    useEffect(() => {
        if (userData && userData._id) {
            const url = `https://transport-server2-1.onrender.com/users/${userData._id}`;
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch profile data');
                    }
                    return res.json();
                })
                .then((data) => {
                    setProfile(data);
                    localStorage.setItem("profile", JSON.stringify(data));
                    setLoadingg(false);
                })
                .catch((error) => console.error('Error fetching profile data:', error));
        }
    }, [userData]);

    const onSubmit = (e) => {
        const { location, upazila, facebook, dob, address, phone, about, photo } = e;
        fetch(`https://transport-server2-1.onrender.com/users/${userData?._id}`, {
            method: "PUT",
            body: JSON.stringify({ location, upazila, facebook, dob, address, phone, about, photo }),
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(() => {
                return fetch(`https://transport-server2-1.onrender.com/users/${userData?._id}`);
            })
            .then(res => res.json())
            .then((updatedData) => {
                setProfile(updatedData);
                localStorage.setItem("profile", JSON.stringify(updatedData));
                toast.success("Successfully Updated Profile !");
                reset();
            })
            .catch((error) => console.error('Error updating profile:', error));
    };

    if (loading || loadingg) return <Loading />;

    console.log(profile);

    return (
        <div>
            <NavDashBoard />

            <section className="py-5 px-4">
                <div className="container mx-auto max-w-screen-lg">
                    <h3 className="py-3 text-success text-2xl md:text-4xl text-center font-bold mb-6">
                        Your Profile
                    </h3>

    
                    <div className="flex justify-center mb-6">
                        <img
                            className="h-36 w-36 md:h-48 md:w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2"
                            src={profile?.photo}
                            alt="admin"
                        />
                    </div>

        
                    <div className="flex justify-center">
                        <div className="text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2">
                                <h1 className="text-xl md:text-2xl font-bold">
                                    Name: {userData?.name} ({userData?.role})
                                </h1>
                                <span>
                                    {userData?.verifiedStatus === 'verified' ? (
                                        <FaCheckCircle className="text-blue-600 text-xl" />
                                    ) : (
                                        <IoIosCheckmarkCircleOutline className="text-blue-600 text-xl" />
                                    )}
                                </span>
                            </div>

                            <h2 className="text-base md:text-xl font-semibold">Email: {userData?.email}</h2>
                            <h2 className="font-semibold uppercase">Gender: {profile?.gender}</h2>
                            <h2 className="font-semibold">Phone: {profile?.phone}</h2>
                            <h3 className="font-semibold">BirthDate: {profile?.dob}</h3>
                            <h3 className="font-semibold">Location: {profile?.location}</h3>
                            <h3 className="font-semibold">Upazila: {profile?.upazila}</h3>
                            <h3 className="font-semibold">Address: {profile?.address}</h3>
                            <p className="font-semibold">About: {profile?.about}</p>

                            <div className="flex justify-center md:justify-start gap-3 mt-4">
                                <a
                                    href={userData?.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full hover:text-blue-600 transition"
                                    style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                                >
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center justify-center w-10 h-10 text-slate-500 rounded-full hover:text-slate-600 transition"
                                    style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                                >
                                    <IoArrowBackCircle className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>

               
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-full max-w-screen-md mx-auto mt-10 px-2 md:px-0 space-y-4"
                    >
                        <input
                            name="email"
                            value={userData?.email}
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("email")}
                        />
                        <input
                            value={userData?.name}
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("name")}
                        />

                        <select
                            name="location"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("location")}
                        >
                            <option value="Dhaka">Dhaka</option>
                        </select>

                        <select
                            name="upazila"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("upazila")}
                        >
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Savar">Savar</option>
                        </select>

                        <input
                            required
                            name="phone"
                            placeholder="Phone Number"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("phone")}
                        />
                        <input
                            required
                            name="facebook"
                            placeholder="Social URL Link"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("facebook")}
                        />
                        <input
                            required
                            type="date"
                            name="dob"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("dob")}
                        />
                        <input
                            required
                            name="photo"
                            placeholder="Photo URL"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("photo")}
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            className="py-2 px-4 border border-gray-300 rounded w-full"
                            {...register("address")}
                        />
                        <textarea
                            name="about"
                            placeholder="About"
                            className="py-3 px-4 border border-gray-300 rounded w-full"
                            {...register("about")}
                        />
                        <input
                            type="submit"
                            value="Update Your Profile"
                            className="btn btn-success py-2 px-4 font-bold"
                        />
                    </form>
                </div>
            </section>
        </div>

    );
};

export default UserProfile;