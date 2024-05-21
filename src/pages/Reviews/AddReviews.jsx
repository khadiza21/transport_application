import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import useUsersAuth from '../../hooks/useUsersAuth';
import Loading from '../Shared/Loading/Loading';
import { IoArrowBackCircle } from 'react-icons/io5';
import NavDashBoard from '../Shared/Navbar/NavDashBoard';

const AddReviews = () => {
    const [userData, loading] = useUsersAuth();
    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);

    const onSubmit = async (data) => {
        try {
            const newReview = {
                name: userData?.name,
                img: userData?.photo,
                review: data?.review,
                star: rating
            };

            const response = await fetch("https://transport-server2-1.onrender.com/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                reset();

                toast.success("Successfully added review!");
            } else {
                alert("Failed to add review");
            }
        } catch (error) {
            console.error("Error adding review:", error);
            alert("An error occurred while adding review");
        }
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    if (loading) return <Loading />;

    return (
        <div>
            <NavDashBoard></NavDashBoard>
            <div>
               
                    <div class="container mx-auto my-5 pb-5">
                        <h3 class="py-3 text-success text-4xl pb-5 text-center font-bold">
                            Add Review
                        </h3>
                        <div class="flex justify-center">
                            <div class="flex justify-center">
                                <img
                                    className="h-48 w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2"
                                    src={userData?.photo}
                                    alt="admin"
                                />
                            </div>
                        </div>
                        <div class="mt-4 flex justify-center">
                            <div>
                                <h1 className="text-2xl font-bold">Name  : {userData?.name} </h1>
                                <div className="flex items-center justify-start">
                                    <Link
                                        to='/dashboard'
                                        className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300"
                                        style={{ boxShadow: "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                                    >
                                        <IoArrowBackCircle className="w-10 h-10 my-8" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col w-full mx-auto mt-8">

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                class="flex flex-col  mt-8"
                            >

                                <span style={{ display: 'flex' }} className='mb-5'>
                                    {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <label key={index} style={{ cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    style={{ display: 'none' }}
                                                    value={ratingValue}
                                                    onClick={() => handleRatingChange(ratingValue)}
                                                />
                                                <FaStar
                                                    className="star"
                                                    color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                    size={25}
                                                    style={{ marginRight: '5px' }}
                                                />
                                            </label>
                                        );
                                    })}
                                </span>
                                <input
                                    value={userData?.name}
                                    class="mb-3 py-2 px-4 border border-gray-300 rounded "
                                    {...register("name")}
                                />
                                <textarea
                                    name="review"
                                    placeholder="review"
                                    className="mb-3 py-3 px-4 border border-gray-300 rounded"
                                    {...register("review")} />
                                <input
                                    class="btn btn-success mb-3 py-2 px-4 font-bold"
                                    type="submit"
                                    value="Add New Review"
                                />

                            </form>


                            <Link to='/allreview' ><button className="mx-auto w-full btn bg-slate-600 hover:bg-slate-700 text-white mt-6">See Reviews</button></Link>
                        </div>

                    </div>

               
            </div>
        </div>
    );
};

export default AddReviews;
