import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';
import { AuthContext } from '../providers/AuthProvider';


const DriversRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/earnmoneyauth" state={{ from: location }} replace></Navigate>
};

export default DriversRoute;