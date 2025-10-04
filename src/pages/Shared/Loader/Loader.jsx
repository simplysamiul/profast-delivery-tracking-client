import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <HashLoader color='#03373D' />
        </div>
    );
};

export default Loader;