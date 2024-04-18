import React, { useEffect, useState } from 'react';
import SectionTitle from '../Components/SectionTitile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('review.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data)

            })

    }, []) 
    return (
        <section className='py-44'>
            <SectionTitle
                heading="Happy Users Reviews"
                subHeading={`Total Review ${reviews.length}`}

            > </SectionTitle>

            <div className='px-44'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper ">

                    {
                        reviews.map(item => <SwiperSlide

                            key={item.id} >
                            <div className=' mb-4 mx-24 flex flex-col items-center '>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={item.star}
                                    readOnly
                                />
                                <img src={item.img} alt="Reviewer" className="rounded-full w-12 h-12 mt-4 " />
                                <p className='py-8'>{item.review}</p>
                                <h3 className='text-2xl text-orange-400'>{item.name}</h3>

                            </div>

                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </section>
    );
};

export default Reviews;

// grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-44 


