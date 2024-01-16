import logo from './logo.svg';
import me from './me.png'
import ilusion from './ilusion.jpg'
import './App.css';
import Register from "./components/Register";
import {BrowserRouter, BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {render} from "@testing-library/react";


function App() {
    const logout = () => {
        localStorage.clear();
    }
    const isLoggedIn = () => {
        if (localStorage.getItem('login-data-name') !== undefined){
            return render(<button onClick={logout}>logout</button>)
        }
        return '';
    }

    return (
            <div className="App">
                <header className="App-header">
                    <h2>project: CRUD Osoba</h2>
                    <h4>By that spinning dude</h4>
                    <img src={me} className="App-logo" alt="me" />
                    {/*<Navbar/>*/}
                </header>
                <body>
                    <div>
                        <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Home/>}/>
                                    <Route path="/register" element={<Register/>}/>
                                    <Route path="/login" element={<Login/>}/>
                                </Routes>
                                    <h3>All pages</h3>
                                <Link to="/">
                                    <button>Home</button>
                                </Link>
                                    <Link to="/register">
                                        <button>Register</button>
                                    </Link>
                                    <br/>
                                    <Link to="/login">
                                        <button>Login</button>
                                    </Link>
                          <a><button onClick={logout}>logout</button></a>
                            </BrowserRouter>
                    </div>
                </body>
            </div>

);
}

export default App;
