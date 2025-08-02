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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-5 pb-10">
                    
                    <h3 className="py-3 text-green-600 text-3xl sm:text-4xl text-center font-bold">
                        Add Review
                    </h3>

                    <div className="flex justify-center">
                        <img
                            className="h-32 w-32 sm:h-48 sm:w-48 rounded-full ring ring-black ring-offset-base-100 ring-offset-2 object-cover"
                            src={userData?.photo}
                            alt="admin"
                        />
                    </div>

                  
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-center">
                            Name: {userData?.name}
                        </h1>
                        <Link
                            to="/dashboard"
                            className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300"
                            style={{
                                boxShadow:
                                    "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                        >
                            <IoArrowBackCircle className="w-10 h-10" />
                        </Link>
                    </div>

                   
                    <div className="mt-8 w-full max-w-xl mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                          
                            <div className="flex justify-center mb-3">
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                className="hidden"
                                                value={ratingValue}
                                                onClick={() => handleRatingChange(ratingValue)}
                                            />
                                            <FaStar
                                                className="star"
                                                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                                                size={25}
                                                style={{ marginRight: "5px" }}
                                            />
                                        </label>
                                    );
                                })}
                            </div>

                           
                            <input
                                value={userData?.name}
                                className="py-2 px-4 border border-gray-300 rounded w-full"
                                {...register("name")}
                            />

                       
                            <textarea
                                name="review"
                                placeholder="Write your review"
                                className="py-3 px-4 border border-gray-300 rounded w-full"
                                {...register("review")}
                            />

                         
                            <input
                                className="btn btn-success py-2 px-4 font-bold text-white"
                                type="submit"
                                value="Add New Review"
                            />
                        </form>

                       
                        <Link to="/allreview">
                            <button className="w-full mt-6 btn bg-slate-600 hover:bg-slate-700 text-white">
                                See Reviews
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddReviews;
