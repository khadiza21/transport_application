import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaFacebook } from 'react-icons/fa';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import useCarDriverData from '../../hooks/useCarDriverData';
import cardriverImg from '../../assets/user.png'

const CarDriverProfile = () => {
    const [cardriverData, loading] = useCarDriverData();
    const [loadingg, setLoadingg] = useState(true);
    const [profile, setProfile] = useState({});
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (cardriverData) {
            const storedProfile = JSON.parse(localStorage.getItem("profile"));
            if (storedProfile) {
                setProfile(storedProfile);
                setLoadingg(false);
            } else {
                setLoadingg(false);
            }
        }
    }, [cardriverData]);

    useEffect(() => {
        if (cardriverData && cardriverData._id) {
            const url = `https://transport-server2-1.onrender.com/cardriveraccount/${cardriverData._id}`;
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
    }, [cardriverData]);

    const onSubmit = (e) => {
        const { location, upazila, facebook, dob, address, phone, about, photo } = e;
        fetch(`https://transport-server2-1.onrender.com/cardriveraccount/${cardriverData?._id}`, {
            method: "PUT",
            body: JSON.stringify({ location, upazila, facebook, dob, address, phone, about, photo }),
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(() => {
                return fetch(`https://transport-server2-1.onrender.com/cardriveraccount/${cardriverData?._id}`);
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
        <div className="px-4 sm:px-6 lg:px-8">
            <section className="max-w-screen-lg mx-auto my-5 pb-5">
                <h3 className="py-3 text-success text-3xl sm:text-4xl pb-5 text-center font-bold">
                    Your Profile
                </h3>

                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-10">
                    <div className="flex justify-center mb-6 lg:mb-0">
                        <img
                            className="h-40 w-40 sm:h-48 sm:w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2 object-cover"
                            src={profile?.photo || cardriverImg}
                            alt="cardriver"
                        />
                    </div>

                    <div className="text-center lg:text-left space-y-2">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Name: {cardriverData?.name} ({cardriverData?.role})
                        </h1>
                        <h2 className="text-lg font-semibold">Email: {cardriverData?.email}</h2>
                        <h2 className="font-semibold">Gender: {profile?.gender}</h2>
                        <h2 className="font-semibold">Phone: {profile?.phone}</h2>
                        <h3 className="font-semibold">Birth Date: {profile?.dob}</h3>
                        <h3 className="font-semibold">Location: {profile?.location}</h3>
                        <h3 className="font-semibold">Upazila: {profile?.upazila}</h3>
                        <h3 className="font-semibold">Address: {profile?.address}</h3>
                        <p className="font-semibold">About: {profile?.about}</p>

                        <div className="flex justify-center lg:justify-start mt-4 gap-3">
                            <a
                                href={profile?.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-12 h-12 text-blue-500 hover:text-blue-600 transition duration-300 rounded-full shadow"
                            >
                                <FaFacebook className="w-8 h-8" />
                            </a>
                            <Link
                                to="/cardriverdashboard"
                                className="flex items-center justify-center w-12 h-12 text-slate-500 hover:text-slate-600 transition duration-300 rounded-full shadow"
                            >
                                <IoArrowBackCircle className="w-8 h-8" />
                            </Link>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full max-w-2xl mx-auto mt-10 space-y-4"
                >
                    <input
                        name="email"
                        value={cardriverData?.email}
                        className="py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("email")}
                        readOnly
                    />
                    <input
                        value={cardriverData?.name}
                        className="py-2 px-4 border border-gray-300 rounded text-gray-400"
                        {...register("name")}
                        readOnly
                    />
                    <select
                        name="location"
                        className="py-2 px-4 border border-gray-300 rounded"
                        {...register("location")}
                        defaultValue={cardriverData?.location}
                    >
                        <option value="Dhaka">Dhaka</option>
                    </select>
                    <select
                        name="upazila"
                        className="py-2 px-4 border border-gray-300 rounded"
                        {...register("upazila")}
                        defaultValue={cardriverData?.upazila}
                    >
                        <option value="Dhanmondi">Dhanmondi</option>
                        <option value="Gulshan">Gulshan</option>
                        <option value="Savar">Savar</option>
                    </select>
                    <input
                        required
                        name="phone"
                        className="py-2 px-4 border border-gray-300 rounded"
                        placeholder="Phone Number"
                        {...register("phone")}
                        defaultValue={cardriverData?.phone}
                    />
                    <input
                        required
                        name="facebook"
                        className="py-2 px-4 border border-gray-300 rounded"
                        placeholder="Facebook Link"
                        {...register("facebook")}
                        defaultValue={cardriverData?.facebook}
                    />
                    <input
                        required
                        type="date"
                        name="dob"
                        className="py-2 px-4 border border-gray-300 rounded"
                        {...register("dob")}
                        defaultValue={cardriverData?.dob}
                    />
                    <input
                        required
                        name="photo"
                        placeholder="Photo URL"
                        className="py-2 px-4 border border-gray-300 rounded"
                        {...register("photo")}
                        defaultValue={cardriverData?.photo}
                    />
                    <textarea
                        name="address"
                        placeholder="Address"
                        className="py-3 px-4 border border-gray-300 rounded"
                        {...register("address")}
                        defaultValue={cardriverData?.address}
                    />
                    <textarea
                        name="about"
                        placeholder="About"
                        className="py-3 px-4 border border-gray-300 rounded"
                        {...register("about")}
                        defaultValue={cardriverData?.about}
                    />
                    <input
                        className="btn btn-success py-2 px-4 font-bold"
                        type="submit"
                        value="Update Your Profile"
                    />
                </form>
            </section>
        </div>

    );
};

export default CarDriverProfile;