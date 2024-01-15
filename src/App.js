import logo from './logo.svg';
import me from './me.png'
import ilusion from './ilusion.jpg'
import './App.css';
import Register from "./components/Register";
import {BrowserRouter, BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    // const [loggedInUserId, setLoggedInUserId] = useState(null);
    //
    // useEffect(() => {
    //     // Pobierz z serwera informacje o zalogowanym użytkowniku
    //     axios.get('/loggedInUser')
    //         .then(response => setLoggedInUserId(response.data))
    //         .catch(error => console.error(error));
    // }, []);
    //
    // const login = (userId) => {
    //     // Wyślij żądanie logowania do serwera
    //     axios.get(`/login?id=${userId}`)
    //         .then(response => setLoggedInUserId(userId))
    //         .catch(error => console.error(error));
    // };
    //
    // const logout = () => {
    //     // Wyślij żądanie wylogowania do serwera
    //     axios.get('logout')
    //         .then(response => setLoggedInUserId(null))
    //         .catch(error => console.error(error));
    // };


    return (
            <div className="App">
                <header className="App-header">
                    <h2>project: CRUD Osoba</h2>
                    <h4>By that spinning dude</h4>
                    <img src={me} className="App-logo" alt="me" />
                    <Navbar/>
                </header>
                <body>

            {/*//     <div>*/}
            {/*//         {loggedInUserId ? (*/}
            {/*//             <div>*/}
            {/*//                 <p>Logged in as User ID: {loggedInUserId}</p>*/}
            {/*//                 <button onClick={logout}>Logout</button>*/}
            {/*//             </div>*/}
            {/*//         ) : (*/}
            {/*//             <div>*/}
            {/*//                 <p>Not logged in</p>*/}
            {/*//                 <BrowserRouter>*/}
            {/*//                     <Routes>*/}
            {/*//                         <Route path="/" element={<Home/>}/>*/}
            {/*//                         <Route path="/register" element={<Register/>}/>*/}
            {/*//                         <Route path="/login" element={<Login/>}/>*/}
            {/*//                     </Routes>*/}
            {/*//                     <Link to="/">*/}
            {/*//                         <button>Home</button>*/}
            {/*//                     </Link>*/}
            {/*//                     <Link to="/register">*/}
            {/*//                         <button>Register</button>*/}
            {/*//                     </Link>*/}
            {/*//                     <br/>*/}
            {/*//                     <Link to="/login">*/}
            {/*//                         <button>Login</button>*/}
            {/*//                     </Link>*/}
            {/*//                 </BrowserRouter>*/}
            {/*//             </div>*/}
            {/*//         )}*/}

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
                            </BrowserRouter>
                    {/*</div>*/}
                    </div>
                </body>
            </div>

);
}

export default App;
