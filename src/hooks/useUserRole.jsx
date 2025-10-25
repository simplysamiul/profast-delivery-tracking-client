import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import {useQuery} from '@tanstack/react-query'

const useUserRole = () => {
    const {user, userDataLoading:authLoading} = useAuth();
    const axiousSecure = useAxiosSecure();
    const {data:role="user", refetch, isLoading:roleLoading} = useQuery({
        queryKey:["user-role", user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiousSecure.get(`/user/${user?.email}/role`);
            return res.data.role;
        }
    })
    return {role, refetch, roleLoading:authLoading||roleLoading};
};

export default useUserRole;