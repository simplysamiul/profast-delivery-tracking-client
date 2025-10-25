
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loader from '../pages/Shared/Loader/Loader';

const RiderRoute = ({ children }) => {
    const { user, userDataLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (userDataLoading || roleLoading) {
        return <Loader />
    };

    if (!user || role !== "rider") {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />
    }
    return children;
};

export default RiderRoute;