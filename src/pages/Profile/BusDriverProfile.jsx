import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaFacebook } from 'react-icons/fa';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import busdriverdata from '../../hooks/busdriverdata';

const BusDriverProfile = () => {


    const [driverData, loading] = busdriverdata();
    //const [cardriverData] = useCarDriverData();
    const [loadingg, setLoadingg] = useState(true);
    const [profile, setProfile] = useState({});
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (driverData) {
            const storedProfile = JSON.parse(localStorage.getItem("profile"));
            if (storedProfile) {
                setProfile(storedProfile);
                setLoadingg(false);
            } else {
                setLoadingg(false);
            }
        }
    }, [driverData]);

    useEffect(() => {
        if (driverData && driverData._id) {
            const url = `https://transport-server2-1.onrender.com/busdriveraccount/${driverData._id}`;
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
    }, [driverData]);

    const onSubmit = (e) => {
        const { location, upazila, facebook, dob, address, phone, about, photo } = e;
        fetch(`https://transport-server2-1.onrender.com/busdriveraccount/${driverData?._id}`, {
            method: "PUT",
            body: JSON.stringify({ location, upazila, facebook, dob, address, phone, about, photo }),
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(() => {
                return fetch(`https://transport-server2-1.onrender.com/busdriveraccount/${driverData?._id}`);
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
        <div className="px-4">
            <section>
                <div className="max-w-6xl mx-auto my-5 pb-5">
                    <h3 className="py-3 text-success text-2xl sm:text-3xl md:text-4xl text-center font-bold">
                        Your Profile
                    </h3>

                
                    <div className="flex justify-center mt-4">
                        <img
                            className="h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2 object-cover"
                            src={profile?.photo}
                            alt="admin"
                        />
                    </div>

               
                    <div className="mt-6 flex justify-center">
                        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 text-center md:text-left">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                Name: {driverData?.name} ({driverData?.role})
                            </h1>
                            <h2 className="text-lg font-bold">Email: {driverData?.email}</h2>
                            <h2 className="font-bold">Gender: {profile?.gender}</h2>
                            <h2 className="font-bold">Phone: {profile?.phone}</h2>
                            <h3 className="font-bold">BirthDate: {profile?.dob}</h3>
                            <h3 className="font-bold">Location: {profile?.location}</h3>
                            <h3 className="font-bold">Upazila: {profile?.upazila}</h3>
                            <h3 className="font-bold">Address: {profile?.address}</h3>
                            <p className="font-bold">About: {profile?.about}</p>

                         
                            <div className="flex items-center justify-center md:justify-start mt-4 flex-wrap gap-3">
                                <a
                                    href={profile?.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full text-blue-500 hover:text-blue-600 transition-colors duration-300 shadow"
                                >
                                    <FaFacebook className="w-8 h-8" />
                                </a>
                                <Link
                                    to="/busdriverdashboard"
                                    className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-600 transition-colors duration-300 shadow"
                                >
                                    <IoArrowBackCircle className="w-8 h-8" />
                                </Link>
                            </div>
                        </div>
                    </div>

                  
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto mt-10"
                    >
                        <input
                            name="email"
                            value={driverData?.email}
                            className="mb-3 py-2 px-4 border border-gray-300 rounded bg-gray-100"
                            {...register("email")}
                        />
                        <input
                            value={driverData?.name}
                            className="mb-3 py-2 px-4 border border-gray-300 rounded bg-gray-100"
                            {...register("name")}
                        />
                        <select
                            name="location"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("location")}
                        >
                            <option value="Dhaka">Dhaka</option>
                        </select>
                        <select
                            name="upazila"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
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
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("phone")}
                        />
                        <input
                            required
                            name="facebook"
                            placeholder="Social URL Link"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("facebook")}
                        />
                        <input
                            required
                            type="date"
                            name="dob"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("dob")}
                        />
                        <input
                            required
                            name="photo"
                            placeholder="Photo Link"
                            className="mb-3 py-2 px-4 border border-gray-300 rounded"
                            {...register("photo")}
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            className="mb-3 py-3 px-4 border border-gray-300 rounded"
                            {...register("address")}
                        />
                        <textarea
                            name="about"
                            placeholder="About"
                            className="mb-3 py-6 px-4 border border-gray-300 rounded"
                            {...register("about")}
                        />
                        <input
                            type="submit"
                            value="Update Your Profile"
                            className="btn btn-success mb-3 py-2 px-4 font-bold"
                        />
                    </form>
                </div>
            </section>
        </div>

    );
};

export default BusDriverProfile;

