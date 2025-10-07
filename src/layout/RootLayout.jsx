import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className = 'font-urbanist max-w-11/12 lg:max-w-10/12 mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;