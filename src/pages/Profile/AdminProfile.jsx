import { useEffect, useState } from 'react';
import useUsersAuth from '../../hooks/useUsersAuth';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaFacebook } from 'react-icons/fa';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';


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
            const url = `http://localhost:5000/users/${userData._id}`;
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
        fetch(`http://localhost:5000/users/${userData?._id}`, {
            method: "PUT",
            body: JSON.stringify({ location, upazila, facebook, dob, address, phone, about, photo }),
            headers: { "content-type": "application/json" }
        })
            .then(res => res.json())
            .then(() => {
                return fetch(`http://localhost:5000/users/${userData?._id}`);
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
            <div>

                <section>
                    <div class="container mx-auto my-5 pb-5">

                        <h3 class="py-3 text-success text-4xl pb-5 text-center font-bold">
                            Your Profile
                        </h3>
                        <>

                            <div class="flex justify-center">
                                <div class="flex justify-center">
                                    <img
                                        className="h-48 w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2"
                                        src={profile?.photo}
                                        alt="admin"
                                    />
                                </div>
                            </div>


                            <div class="mt-4 flex justify-center">
                                <div>
                                    <h1 className="text-2xl font-bold">Name  : {userData?.name} ({userData?.role})</h1>
                                    <h2 className="text-xl font-bold">Email  : {userData?.email}</h2>
                                    <h2 className=" font-bold">Gender :{profile?.gender}</h2>
                                    <h2 className="font-bold">Phone  : {profile?.phone}</h2>
                                    <h3 className=" font-bold"> BirthDate : {profile?.dob}</h3>
                                    <h3 className="font-bold"> Location : {profile?.location}</h3>
                                    <h3 className="font-bold"> Upazila : {profile?.upazila}</h3>
                                    <h3 className=" font-bold">Address  : {profile?.address}</h3>
                                    <p className=" font-bold">About : {profile?.about}</p>


                                    <div className="flex items-center justify-start">
                                        <a
                                            href={userData?.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 text-blue-500 rounded-full hover:text-blue-600 transition-colors duration-300 mr-2"
                                            style={{ boxShadow: "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                                        >
                                            <FaFacebook className="w-10 h-10 my-8" />
                                        </a>
                                        <Link
                                            to='/admindashboard'
                                            className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300"
                                            style={{ boxShadow: "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                                        >
                                            <IoArrowBackCircle className="w-10 h-10 my-8" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </>


                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            class="flex flex-col w-3/4 mx-auto mt-8"
                        >
                            <input
                                name="email"
                                value={userData?.email}
                                class="mb-3 py-2 px-4 border border-gray-300 rounded"
                                {...register("email")}
                            />
                            <input
                                value={userData?.name}
                                class="mb-3 py-2 px-4 border border-gray-300 rounded "
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
                                class="mb-3 py-2 px-4 border border-gray-300 rounded"
                                placeholder="Phone Number"
                                {...register("phone")}
                            />
                            <input
                                required
                                name="facebook"
                                class="mb-3 py-2 px-4 border border-gray-300 rounded"
                                placeholder="Social URL Link"
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
                                // type="file"
                                name="photo"
                                // accept="image/*"
                                placeholder='Photo Link'
                                className="mb-3 py-2 px-4 border border-gray-300 rounded"
                                {...register("photo")}
                            />
                            <textarea
                                name="address"
                                placeholder="Address"
                                className="mb-3 py-3 px-4 border border-gray-300 rounded"
                                {...register("address")} />

                            <textarea
                                name="about"
                                placeholder="About"
                                className="mb-3 py-6 px-4 border border-gray-300 rounded"
                                {...register("about")}
                            />
                            <input
                                class="btn btn-success mb-3 py-2 px-4 font-bold"
                                type="submit"
                                value="Update Your Profile"
                            />
                        </form>
                    </div>
                </section>
            </div>

        </>
    );
};

export default AdminProfile;