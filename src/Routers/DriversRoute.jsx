import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../pages/Shared/Loading/Loading';

const DriversRoute = ({ children }) => {
    const { user, loading } = useAuth();
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