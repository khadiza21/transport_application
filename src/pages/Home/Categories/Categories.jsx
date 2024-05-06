import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Shared/Components/SectionTitile';
import Services from './Services';
import Loading from '../../Shared/Loading/Loading';

const Categories = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://transfar-f-server2-bibi-khadizas-projects.vercel.app/categories')
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-44  ">

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