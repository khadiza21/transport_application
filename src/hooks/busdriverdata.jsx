import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const busdriverdata = () => {
    const { user } = useContext(AuthContext);
 


    const [driverData, setDriverData] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        if (!user) {
            setDriverData(null);
            setLoading(false);
            return;
        };

        const fetchData = () => {
            fetch(`https://transfor-f-server-jbh3rh2qc-bibi-khadizas-projects.vercel.app/${user._id}`)

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    setDriverData(data);
                    console.log('new', data)
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        };

        fetchData();
    }, [user]);
    return [driverData, loading];
};

export default busdriverdata;