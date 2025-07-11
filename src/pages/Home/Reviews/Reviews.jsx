import React, { useEffect, useRef, useState } from 'react';
import SectionTitle from '../../Shared/Components/SectionTitile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import Loading from '../../Shared/Loading/Loading';



const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/review')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);

            })

    }, [])
    return (
        <section className='py-44'>
            <SectionTitle
                heading="Happy Users Reviews"
                subHeading={`Total Review ${reviews.length}`}

            > </SectionTitle>

            <div className='container px-4 mx-auto'>
                <Swiper
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    modules={[Navigation]}
                    className="mySwiper px-4 sm:px-8 md:px-16 lg:px-24"
                >
                    {loading ? (
                        <Loading />
                    ) : (
                        reviews.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="p-6 flex flex-col items-center text-center">
                                    <Rating style={{ maxWidth: 180 }} value={item.star} readOnly />
                                    <img
                                        src={item.img}
                                        alt="Reviewer"
                                        className="rounded-full w-16 h-16 mt-4 object-cover border-2 border-orange-400"
                                    />
                                    <p className="py-4 text-gray-600 text-sm">{item.review}</p>
                                    <h3 className="text-xl font-semibold text-orange-500">{item.name}</h3>
                                </div>
                            </SwiperSlide>
                        ))
                    )}

                    <div
                        ref={prevRef}
                        className="custom-prev z-10 absolute left-0 top-1/2 -translate-y-1/2 bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white rounded-full w-5 h-5 md:w-10 md:h-10 flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 text-xs md:text-lg">
                        ❮
                    </div>
                    <div
                        ref={nextRef}
                        className="custom-next z-10 absolute right-0 top-1/2 -translate-y-1/2 bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white rounded-full w-5 h-5 md:w-10 md:h-10 flex items-center justify-center cursor-pointer shadow-md transition-all duration-300  text-xs md:text-lg">
                        ❯
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default Reviews;



