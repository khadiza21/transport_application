import  { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';
import { AuthContext } from '../providers/AuthProvider';


const DriversRoute = ({ children }) => {
    const { busdriver, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if (busdriver) {
        return children;
    }
    return <Navigate to="/earnmoneyauth" state={{from: location}} replace></Navigate>
};

export default DriversRoute;