import { Link } from "react-router-dom";


const Car = ({ item }) => {
    const { carType, description, buttonText, img } = item;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src={img} alt="max-car" /></figure>
                <div className="card-body">
                    <h2 className="card-title uppercase font-bold text-white">CAR {carType}</h2>
                    <p className="text-white">{description}</p>
                    <div className="card-actions justify-end">
                          <Link className="font-semibold uppercase border-orange-400" to={buttonText}><button className="btn btn-outline border-0 bg-slate-200  border-b-4 mt-4 "  id="carprimeDetails" >View Details</button> </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Car;