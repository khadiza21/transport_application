import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import busdriverdata from "../../../hooks/busdriverdata";

const BusDriversDashBoard = () => {
    const [driverData, loading] = busdriverdata(); 

    return (
        <div>
            <h1>bus driver</h1>
            <Link to='/'><button className="btn btn-success"> GO Home</button></Link>
            <div>
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <div>
                        {driverData && (
                            <div>
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