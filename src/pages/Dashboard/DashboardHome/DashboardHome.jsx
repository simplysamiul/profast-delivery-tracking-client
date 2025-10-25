import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loader from '../../Shared/Loader/Loader';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import AdminDashboard from './AdminDashboard';
import ForbiddenAccess from '../../ForbiddenAccess/ForbiddenAccess';

const DashboardHome = () => {
    const {role, authLoading } = useUserRole();

    if(authLoading){
        return <Loader />
    }
    if(role ===  "user"){
        return <UserDashboard />
    }
    else if(role === "rider"){
        return <RiderDashboard />
    }
    else if(role === "admin"){
        return <AdminDashboard />
    }else{
        return <ForbiddenAccess />
    }
};

export default DashboardHome;