import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home/Home/Home';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import ForgetPassword from '../pages/Authentication/ForgetPassword/ForgetPassword';
import Coverage from '../pages/Coverage/Coverage';
import SendParcel from '../pages/SendParcel/SendParcel';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layout/DashboardLayout';
import MyParcels from '../pages/Dashboard/MyParcels/MyParcels';
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import TrackParcel from '../pages/Dashboard/TrackParcel/TrackParcel';


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
            },
            {
                path: "/sendParcel", 
                element: <PrivateRoute><SendParcel /></PrivateRoute>
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "myParcels",
                Component: MyParcels
            },
            {
                path: "payment/:id", 
                Component: Payment
            },
            {
                path: "paymentHistory",
                Component: PaymentHistory
            },
            {
                path: "trackParcel",
                Component: TrackParcel
            }
        ]
    }
]);

export default router;