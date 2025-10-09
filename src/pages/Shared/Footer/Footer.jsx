import React from 'react';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import { Link, NavLink } from 'react-router-dom';
import facebookLogo from '../../../assets/facebook-logo.png';
import linkedinLogo from '../../../assets/linkedin-icon.png';
import XLogo from '../../../assets/twitter-logo.png';
import youtubeLogo from '../../../assets/youtube-logo.png';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10 rounded-2xl mb-10">
            <aside>
                <Link to="/"><ProfastLogo /></Link>
                <p className="lg:w-8/12 mx-auto pb-6">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on    time, every time.
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <div className='my-6  hidden md:block border-1 p-4 rounded-2xl border-lightG'>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/">Home</NavLink>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/services">Services</NavLink>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/coverage">Coverage</NavLink>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/about">About Us</NavLink>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/pricing">Pricing</NavLink>
                    <NavLink className="mx-4 btn bg-neutral border-none text-white shadow-none" to="/beARider">Be a Rider</NavLink>
                </div>
            </aside>
            <nav>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <Link to="/"><img src={facebookLogo} alt="Facebook-Logo" /></Link>
                   <Link to="/"><img src={linkedinLogo} alt="Linkedin-Logo" /></Link>
                   <Link className='text-white' to="/"><img src={XLogo} alt="X-Logo" /></Link>
                   <Link to="/"><img src={youtubeLogo} alt="Youtube-Logo" /></Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;