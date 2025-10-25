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
import BeARider from '../pages/BeARider/BeARider';
import PendingRiders from '../pages/Dashboard/PendingRiders/PendingRiders';
import VerifiedRiders from '../pages/Dashboard/VerifiedRiders/VerifiedRiders';
import AllRidersList from '../pages/Dashboard/AllRidersList/AllRidersList';
import MakeAdmin from '../pages/Dashboard/MakeAdmin/MakeAdmin';
import ForbiddenAccess from '../pages/ForbiddenAccess/ForbiddenAccess';
import AdminRoute from './AdminRoute';
import AssignRiders from '../pages/Dashboard/AssignRiders/AssignRiders';
import PendingDeliveries from '../pages/Dashboard/PendingDeliveries/PendingDeliveries';
import RiderRoute from './RiderRoute';
import CompletedDeliveries from '../pages/Dashboard/CompletedDeliveries/CompletedDeliveries';
import MyEarnings from '../pages/Dashboard/MyEarnings/MyEarnings';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import AboutUs from '../pages/AboutUs/AboutUs';


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
                path: "/forbidden",
                Component: ForbiddenAccess
            },
            {
                path: "/about",
                Component: AboutUs
            },
            {
                path: "/coverage",
                Component: Coverage,
            },
            {
                path: "/sendParcel",
                element: <PrivateRoute><SendParcel /></PrivateRoute>
            },
            {
                path: "beARider",
                element: <PrivateRoute><BeARider /></PrivateRoute>
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
                index: true,
                Component: DashboardHome
            },
            {
                path: "myParcels",
                Component: MyParcels
            },
            {
                path: "payment/:id",
                Component: Payment
            },
            {
                path: "trackParcel/:trackingId",
                Component: TrackParcel
            },
            {
                path: "trackParcel",
                Component: TrackParcel
            },

            // rider routes

            {
                path: "pendingDeliveries",
                element: <RiderRoute><PendingDeliveries /></RiderRoute>
            },
            {
                path: "completedDeliveries",
                element: <RiderRoute><CompletedDeliveries /></RiderRoute>
            },
            {
                path: "myEarnings",
                element: <RiderRoute><MyEarnings /></RiderRoute>
            },

            // admin routes

            {
                path: "paymentHistory",
                Component: PaymentHistory
            },
            {
                path: "pendingRiders",
                element: <AdminRoute><PendingRiders /></AdminRoute>
            },
            {
                path: "verifiedRiders",
                element: <AdminRoute><VerifiedRiders /></AdminRoute>
            },
            {
                path: "allRiders",
                element: <AdminRoute><AllRidersList /></AdminRoute>
            },
            {
                path: "assignRiders",
                element: <AdminRoute><AssignRiders /></AdminRoute>
            },
            {
                path: "makeAdmin",
                element: <AdminRoute><MakeAdmin /></AdminRoute>
            },

        ]
    }
]);

export default router;