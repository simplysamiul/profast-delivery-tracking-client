import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../pages/Shared/Loader/Loader';

const AdminRoute = ({children}) => {
    const { user, userDataLoading } = useAuth();
    const {role, roleLoading} = useUserRole();
    const location = useLocation();

    if (userDataLoading || roleLoading) {
        return <Loader />
    };

    if(!user || role !== "admin"){
        return <Navigate state={{from:location.pathname}} to="/forbidden" />
    }
    return children;
};

export default AdminRoute;