import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import busdriverdata from "../../../hooks/busdriverdata";

const BusDriversDashBoard = () => {
    const [driverData, loading] = busdriverdata(); 

    return (
        <div>
            <h1 className="font-bold  text-dark text-5xl m-10 p-10 text-center">bus driver Dashboard</h1>
            <Link  className='flex justify-center items-center mt-2' to='/'><button className="btn btn-success"> GO Home</button></Link>
            <div className="">
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div className="">
                        {driverData && (
                            <div className='text-center font-bold'>
                                <p>Name: {driverData.name}</p>
                                <p>Email: {driverData.email}</p>

                            </div>
                        )

                        }

                        {console.log(driverData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusDriversDashBoard;