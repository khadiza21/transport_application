import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useCarDriverData = () => {
    const { user } = useContext(AuthContext);
    const [cardriverData, setCarDriverData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!user) {
            setCarDriverData(null);
            setLoading(false);
            return;
        };
        const fetchData = () => {
            fetch(`https://transport-server2-1.onrender.com/cardriveraccount/${user._id}`)

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    setCarDriverData(data);
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
    return [cardriverData, loading];

};

export default useCarDriverData;