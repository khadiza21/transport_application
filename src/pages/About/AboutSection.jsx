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
            <h1 className=" font-bold text-2xl lg:text-4xl my-8">There's an CityMover Ride for everyone</h1>
            < div className="grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4 ">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    aboutcart.map(item => (
                        < div key={item._id}>
                            <div className="card overflow-hidden bg-base-100 shadow border border-gray-1 p-5 h-[500px]">
                             <img className="rounded-lg border border-red border-3 w-[95%] h-[250px] mx-auto" src={item.img} alt="aboutimg" />
                                <div className="card-body px-0">
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