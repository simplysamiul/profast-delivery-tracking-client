import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home/Home/Home';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import ForgetPassword from '../pages/Authentication/ForgetPassword/ForgetPassword';
import Coverage from '../pages/Coverage/Coverage';


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/coverage",
                Component: Coverage,
            }
        ]
    },
    {
        path: "/", 
        Component: AuthLayout,
        children: [
            {
                path: "/login", 
                Component: Login
            },
            {
                path: "/register", 
                Component: Register
            },
            {
                path: "/forgetPassword",
                Component: ForgetPassword
            }
        ]
    }
]);

export default router;