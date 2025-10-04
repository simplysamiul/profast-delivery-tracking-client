import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../pages/Shared/Loader/Loader';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, userDataLoading} = useAuth();
    
    if(userDataLoading){
        return <Loader />
    };
    if(!user){
        return <Navigate to="/login" />
    };

    return children;
};

export default PrivateRoute;