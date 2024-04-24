import { Link } from "react-router-dom";


const Car = ({ item }) => {
    const { carType, description, buttonText, img } = item;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src={img} alt="max-car" /></figure>
                <div className="card-body">
                    <h2 className="card-title uppercase">CAR {carType}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-success">   <Link to={buttonText}>Book Now</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Car;