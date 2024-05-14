import { useEffect, useState } from "react";
import Loading from "../Shared/Loading/Loading";
import "./About.css";


const AboutSection = () => {
    const [aboutcart, setAboutcart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/aboutcart')
            .then(res => res.json())
            .then(data => {
                setAboutcart(data);
                setLoading(false);
                console.log('about data', data)
            })
    }, [])
    return (
        <div className="pb-24">
            <h1 className="titlesecnew font-bold text-4xl my-8">There's an CityMover Ride for everyone</h1>
            < div className="grid sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4 ">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    aboutcart.map(item => (
                        < div key={item._id}>
                            <div className="card   bg-base-100 shadow-xl">
                                <figure><img src={item.img} alt="aboutimg" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.serviceType}</h2>
                                    <p className="text-dark">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                    ))
                }
            </div >
        </div >
    );
};

export default AboutSection;