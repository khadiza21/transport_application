import { useEffect, useState } from 'react';
import useUsersAuth from '../../hooks/useUsersAuth';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaFacebook } from 'react-icons/fa';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import userImg from '../../assets/user.png'
import NavDashBoard from '../Shared/Navbar/NavDashBoard';


const AdminProfile = () => {
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
        <>
            <NavDashBoard></NavDashBoard>
            <div className="px-4 sm:px-6 lg:px-8">
                <section className="container mx-auto my-5 pb-5">
                    <h3 className="py-3 text-success text-4xl text-center font-bold">
                        Your Profile
                    </h3>

                    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-10">
                 
                        <div className="flex justify-center mb-4 md:mb-0">
                            <img
                                className="h-40 w-40 md:h-48 md:w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2"
                                src={userData?.photo === undefined ? userImg : profile?.photo}
                                alt="admin"
                            />
                        </div>

                      
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold">
                                Name: {userData?.name} ({userData?.role})
                            </h1>
                            <h2 className="text-xl font-bold">Email: {userData?.email}</h2>
                            <p className="font-bold">Gender: {profile?.gender}</p>
                            <p className="font-bold">Phone: {profile?.phone}</p>
                            <p className="font-bold">BirthDate: {profile?.dob}</p>
                            <p className="font-bold">Location: {profile?.location}</p>
                            <p className="font-bold">Upazila: {profile?.upazila}</p>
                            <p className="font-bold">Address: {profile?.address}</p>
                            <p className="font-bold">About: {profile?.about}</p>

                          
                            <div className="flex justify-center md:justify-start mt-4 space-x-4">
                                <a
                                    href={userData?.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center text-blue-500 rounded-full hover:text-blue-600 transition duration-300 shadow-md"
                                >
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                                <Link
                                    to="/dashboard"
                                    className="w-12 h-12 flex items-center justify-center text-slate-500 rounded-full hover:text-slate-600 transition duration-300 shadow-md"
                                >
                                    <IoArrowBackCircle className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>

                
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-2xl mx-auto mt-8 space-y-4"
                    >
                        <input
                            name="email"
                            value={userData?.email}
                            className="w-full py-2 px-4 border border-gray-300 rounded text-gray-400"
                            {...register("email")}
                        />
                        <input
                            value={userData?.name}
                            className="w-full py-2 px-4 border border-gray-300 rounded text-gray-400"
                            {...register("name")}
                        />
                        <select
                            name="location"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("location")}
                            defaultValue={userData?.location}
                        >
                            <option value="Dhaka">Dhaka</option>
                        </select>
                        <select
                            name="upazila"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("upazila")}
                            defaultValue={userData?.upazila}
                        >
                            <option value="Dhanmondi">Dhanmondi</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Savar">Savar</option>
                        </select>
                        <input
                            required
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("phone")}
                            defaultValue={userData?.phone}
                        />
                        <input
                            required
                            name="facebook"
                            placeholder="Social URL Link"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("facebook")}
                            defaultValue={userData?.facebook}
                        />
                        <input
                            required
                            type="date"
                            name="dob"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("dob")}
                            defaultValue={userData?.dob}
                        />
                        <input
                            required
                            name="photo"
                            placeholder="Photo Link"
                            className="w-full py-2 px-4 border border-gray-300 rounded"
                            {...register("photo")}
                            defaultValue={userData?.photo}
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            className="w-full py-3 px-4 border border-gray-300 rounded"
                            {...register("address")}
                            defaultValue={userData?.address}
                        />
                        <textarea
                            name="about"
                            placeholder="About"
                            className="w-full py-4 px-4 border border-gray-300 rounded"
                            {...register("about")}
                            defaultValue={userData?.about}
                        />
                        <input
                            type="submit"
                            value="Update Your Profile"
                            className="btn btn-success w-full py-2 font-bold"
                        />
                    </form>
                </section>
            </div>


        </>
    );
};

export default AdminProfile;