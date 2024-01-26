import React, {useState} from 'react';
import '../css/Navbar.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import {render} from "@testing-library/react";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const toggleNavbar = () => {
        setIsMobile(!isMobile);
    };

    const logout = () => {
        localStorage.clear();
    }
    const isLoggedIn = () => {
        if (localStorage.getItem('login-data-name') !== undefined) {
            return render(<button onClick={logout}>logout</button>)
        }
        return '';
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <nav className={`navbar ${isMobile ? 'responsive' : ''}`}>
                <div className="menu-icon" onClick={toggleNavbar}>&#9776;</div>
                <ul className="nav-links">
                    <li><a className="active">
                        <Link to="/">
                            <button>Home</button>
                        </Link>
                    </a></li>
                    <li><a><Link to="/register">
                        <button>Register</button>
                    </Link>
                    </a>
                    </li>
                    <li><a>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </a>
                    </li>
                    <li><a>
                        <button onClick={logout}>logout</button>
                    </a></li>
                </ul>
            </nav>
        </BrowserRouter>
    );
};

export default Navbar;