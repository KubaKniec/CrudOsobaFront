import React, { useState } from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const toggleNavbar = () => {
        setIsMobile(!isMobile);
    };

    return (
        <nav className={`navbar ${isMobile ? 'responsive' : ''}`}>
            <div className="menu-icon" onClick={toggleNavbar}>&#9776;</div>
            <ul className="nav-links">
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;