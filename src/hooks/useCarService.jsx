import { useEffect, useState } from "react";
import Loading from "../pages/Shared/Loading/Loading";

const useCarService = () => {
    const [carItems, setCarItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('')
            .then(res => res.json())
            .then(data => {
                setCarItems(data);
                setLoading(false);
            })
    }, [])
    return [carItems, loading=Loading]
}

export default useCarService;

// const primeCars = data.filter(item => item.catagory === 'prime');
// setCarItems(primeCars);