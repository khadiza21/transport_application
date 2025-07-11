import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Shared/Components/SectionTitile';
import Services from './Services';
import Loading from '../../Shared/Loading/Loading';

const Categories = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/categories')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
                
            })
    }, [])
    return (
        <section className='pt-40'>
            <SectionTitle
                subHeading={"From 08.00am to 10.00pm"}
                heading={"Categories"}
            >

            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 container px-4 mx-auto my-10  ">

                {loading ? (
                    <Loading></Loading>
                ) : (
                    services.map(item => (<Services
                        key={item._id}
                        item={item}
                    ></Services>)
                    ))}


            </div>
        </section>
    );
};

export default Categories;