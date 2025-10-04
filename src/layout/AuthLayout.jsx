import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProfastLogo from '../pages/Shared/ProfastLogo/ProfastLogo';
import Lottie from "lottie-react";
import authImg from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Logo */}
            <div className="mt-4">
                <Link to="/">
                    <ProfastLogo />
                </Link>
            </div>
            {/* Left Section */}
            <Outlet />

            {/* Right Section (Image) */}
            <div className="hidden lg:flex flex-1 bg-lime-50 items-center justify-center">
                <img
                    src={authImg}
                    alt="Auth Img"
                    className="w-3/4 max-w-lg"
                />
            </div>
        </div>
    );
};

export default AuthLayout;