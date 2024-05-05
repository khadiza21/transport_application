import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../../providers/AuthProvider";

const BusDriversDashBoard = () => {
    const { user } = useContext(AuthContext);
    console.log('my user now', user._id);


    const [driverData, setDriverData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = () => {
            fetch(`http://localhost:5000/busdriveraccount/${user._id}`)
         
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    setDriverData(data);
                    console.log('new',data)
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        };

        fetchData();



    }, [user]);

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