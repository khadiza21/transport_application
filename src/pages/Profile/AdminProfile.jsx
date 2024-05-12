import { useEffect, useState } from 'react';
import useUsersAuth from '../../hooks/useUsersAuth';
import Loading from '../Shared/Loading/Loading';
import { useForm } from 'react-hook-form';

const AdminProfile = () => {
    const [userData, loading] = useUsersAuth();
    console.log(userData);

    const [profile, setProfile] = useState({});
    const [reload, setIsReload] = useState(true);

    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        const email = userData?.email;
        const url = `http://localhost:5000/users/${email}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, [reload]);

    console.log('profile', profile);


    const onSubmit = (e) => {
        console.log(e);


        const { location, upazila, facebook, dob, address, phone, about, photo } = e;


        fetch(`http://localhost:5000/users/${userData?.email}`, {
            method: "PUT",
            body: JSON.stringify({

                location,
                upazila,
                facebook,
                dob,
                address,
                phone,
                about,
                photo
            }),
            headers: {
                "content-type": "application/json",

            },
        })
            .then((res) => res.json())
            .then((data) => {
                // setIsReload(location, upazila, facebook, dob, address, phone, about, photo);
                setIsReload(prevState => !prevState);
                toast("Updated Profile!");
                console.log("success", data);
                reset();
            })
            .catch((error) => {
                console.error('Error updating profile:', error);

            });

    };


    return (
        <>
            <div>



                <section>
                    <div class="container mx-auto my-5 pb-5">

                        <h3 class="py-3 text-success text-4xl pb-5 text-center font-bold">
                            Your Profile
                        </h3>


                        {loading ? <Loading></Loading> :
                            <>

                                <div class="flex justify-center">
                                    <div class="flex justify-center">
                                        <img
                                            className="h-48 w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2"
                                            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <div class="mt-4 flex justify-center">
                                    <div>
                                        <h1 className="text-2xl font-bold">Name  : {userData?.name} ({userData?.role})</h1>
                                        <h2 className="text-xl font-bold">Email  : {userData?.email}</h2>
                                        <h2 className="text-xl font-bold">Gender :{userData?.gender}</h2>
                                        <h2 className="text-xl font-bold">Phone  : {userData?.phone}</h2>

                                    </div>
                                </div>
                            </>

                        }


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
                                type="file"
                                name="photo"
                                accept="image/*"
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