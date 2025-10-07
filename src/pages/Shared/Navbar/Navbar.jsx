import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
// import NavbarLogo from '../../../assets/'

const Navbar = () => {
    const { user, userLogOut, setUserDataLoading } = useAuth();
    const navItems = <>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/">Home</NavLink></li>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/sendParcel">Send Parcel</NavLink></li>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/coverage">Coverage</NavLink></li>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/about">About Us</NavLink></li>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/pricing">Pricing</NavLink></li>
        <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/beARider">Be a Rider</NavLink></li>
        {
            user && <>
                <li className='hover:bg-lightG hover:text-deepG font-semibold duration-300 mx-2'><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    // logout 
    const handleLogOut = () => {
        userLogOut()
            .then(() => {
                Swal.fire({
                    text: "User Logout Successfully ....!",
                    icon: "success"
                });
                setUserDataLoading(false);
            }).catch(err => {
                Swal.fire({
                    text: `${err.message}`,
                    icon: "error"
                });
                setUserDataLoading(false);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                {/* Navbar Logo */}
                <ProfastLogo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end flex items-center space-x-3">
                {user?.email ? <button onClick={handleLogOut} className='btn bg-lightG font-bold'>Log Out</button>
                    : <Link to="/login"><button className='btn text-gray-600'>Sign In</button></Link>}
            </div>
        </div>
    );
};

export default Navbar;