import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole';
import Loader from '../pages/Shared/Loader/Loader';

const UserRoute = ({children}) => {
    const { user, userDataLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (userDataLoading || roleLoading) {
        return <Loader />
    };

    if (!user || role !== "user") {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />
    }
    return children;
};

export default UserRoute;