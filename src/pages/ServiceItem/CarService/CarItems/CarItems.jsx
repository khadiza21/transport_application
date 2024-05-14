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
        <div className="px-44 my-44 ">
            <SectionTitle
                heading="Car Categories"
                subHeading="Car rides are available for everyone"
           

            > </SectionTitle>

            <div className="grid sm:grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4">
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