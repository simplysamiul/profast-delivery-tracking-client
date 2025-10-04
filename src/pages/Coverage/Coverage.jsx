import React, { useEffect, useState } from 'react';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {
    // load warehouse data location
    const [warehouses, setWareHouses] = useState([]);
    useEffect(()=> {
        fetch("warehouses.json")
        .then(res => res.json())
        .then(data => {
            setWareHouses(data)
        }).catch(err => console.log(err))
    },[]); 
    return (
        <div className='my-16 lg:my-22'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-deepG mb-10'>We are available in 64 districts</h1>

            {/* showing map */}
            <BangladeshMap warehouses={warehouses} />
        </div>
    );
};

export default Coverage;