import React, { useEffect, useState } from 'react';
import Review from '../../Review/Review';
import SectionTitle from '../Components/SectionTitile';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('review.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
                console.log(data.length);
            })

    }, [])
    return (
        <section className='py-44'>
            <SectionTitle
                heading="Happy Users Reviews"
                subHeading={`Total Review ${reviews.length}`}

            > </SectionTitle>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-44 '>
                {

                    reviews.map(item => <Review
                        key={item.id}
                        item={item}

                    ></Review>)
                }
            </div>

        </section>
    );
};

export default Reviews;




