
import { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import SectionTitle from '../Shared/Components/SectionTitile';
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import NavDashBoard from '../Shared/Navbar/NavDashBoard';




const AllReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const reviewsPerPage = 4;
    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/review')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);

            })

    }, [])


    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <NavDashBoard />

            <section className="py-10 px-4 sm:px-8 md:px-16">
                <SectionTitle
                    heading="All Reviews"
                    subHeading={`Total Review ${reviews.length}`}
                />

                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {currentReviews.map((item, index) => (
                            <div
                                key={index}
                                className="mb-4 flex flex-col items-center shadow-xl p-6 rounded-xl bg-white"
                            >
                                <Rating style={{ maxWidth: 180 }} value={item.star} readOnly />
                                <img
                                    src={item.img}
                                    alt="Reviewer"
                                    className="rounded-full w-12 h-12 mt-4"
                                />
                                <p className="py-6 text-center text-gray-700">{item.review}</p>
                                <h3 className="text-xl sm:text-2xl text-orange-400 font-semibold">
                                    {item.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}

              
                <div className="flex justify-center mt-8 flex-wrap gap-2">
                    {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded focus:outline-none transition-colors duration-200 ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                                }`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        to="/dashboard"
                        className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300 shadow-lg"
                    >
                        <IoArrowBackCircle className="w-10 h-10" />
                    </Link>
                </div>
            </section>
        </div>

    );
};

export default AllReviews;