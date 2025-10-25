import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useTrackingLogger = () => {
    const axiousSecure = useAxiosSecure();

    const logTracking = async ({trackingId, status, details, updateBy}) => {
        const payload = {trackingId, status, details, updateBy};
        await axiousSecure.post("/tracking", payload)
    }
    return {logTracking};
};

export default useTrackingLogger;