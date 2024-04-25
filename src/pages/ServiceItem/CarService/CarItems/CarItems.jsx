import { useEffect, useState } from "react";
import Car from "./Car";
import SectionTitle from "../../../Home/Components/SectionTitile";

const CarItems = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('carCategories.json')
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

            <div className="sm:grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4">
                {loading ? (
                    <p>Loading...</p>
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