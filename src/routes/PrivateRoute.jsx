import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../pages/Shared/Loader/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, userDataLoading} = useAuth();
    const location = useLocation();
    
    if(userDataLoading){
        return <Loader />
    };
    if(!user){
        return <Navigate state={location.pathname} to="/login" />
    };

    return children;
};

export default PrivateRoute;