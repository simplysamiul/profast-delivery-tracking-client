import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProfastLogo from '../pages/Shared/ProfastLogo/ProfastLogo';
import Lottie from "lottie-react";
import authImg from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='font-urbanist max-w-11/12 lg:max-w-10/12 mx-auto'>
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Logo */}
                <div className="mt-4">
                    <ProfastLogo />
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
        </div>
    );
};

export default AuthLayout;