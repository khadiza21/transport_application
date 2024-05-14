
import { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import SectionTitle from '../Shared/Components/SectionTitile';
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import useUsersAuth from '../../hooks/useUsersAuth';



const AllReviews = () => {
    const [userData] = useUsersAuth();
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
            <section className='py-10'>
                <SectionTitle
                    heading=" All Reviews"
                    subHeading={`Total Review ${reviews.length}`}

                > </SectionTitle>


                {loading ? (
                    <Loading></Loading>
                ) : (


                    <div className='px-44 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2'>
                        {currentReviews.map((item, index) => (
                            <div key={index} className=' mb-4 flex flex-col items-center  shadow-xl p-10'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={item.star}
                                    readOnly
                                />
                                <img src={item.img} alt="Reviewer" className="rounded-full w-12 h-12 mt-4 " />
                                <p className='py-8'>{item.review}</p>
                                <h3 className='text-2xl text-orange-400'>{item.name}</h3>
                            </div>
                        ))}
                    </div>)}

                <div className="flex justify-center mt-8">
                    {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-4 py-2 rounded focus:outline-none ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                </div>

                <div class="mt-4 flex justify-center">
                    <div>
                        <div className="flex items-center justify-start">
                            { userData?.role === 'admin' ? <Link
                                to='/admindashboard'
                                className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300"
                                style={{ boxShadow: "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                            >
                                <IoArrowBackCircle className="w-10 h-10 my-8" />
                                
                            </Link>:  
                            
                            
                            <Link
                            to='/userdashboard'
                            className="flex items-center justify-center w-12 h-12 text-slate-500 rounded-full hover:text-slate-600 transition-colors duration-300"
                            style={{ boxShadow: "0 4px 6px -1px rgba(1, 1, 1, 1), 2px 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                        >
                            <IoArrowBackCircle className="w-10 h-10 my-8" />
                            
                        </Link>
                            }
                            
                        </div>
                    </div>
                </div>


            </section>
        </div>
    );
};

export default AllReviews;