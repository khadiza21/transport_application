import { useEffect, useState } from "react";
import Car from "./Car";
import SectionTitle from "../../../Shared/Components/SectionTitile";
import Loading from "../../../Shared/Loading/Loading";

const CarItems = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://transport-server2-1.onrender.com/cartypes')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setLoading(false);
            })
    }, [])
    return (
        <div className="container mx-auto px-4 my-44 ">
            <SectionTitle
                heading="Car Categories"
                subHeading="Car rides are available for everyone"
            > </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 mt-16  md:grid-cols-2 gap-20 sm:gap-10">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    cars.map(item => (<Car 
                        key={item._id}
                        item={item}
                    ></Car>)
                    ))}
            </div></div>
    );
}


export default CarItems;