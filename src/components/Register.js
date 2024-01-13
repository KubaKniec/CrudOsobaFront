import React, { Component } from 'react'
import ApiService from "../service/ApiService";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
        this.savePerson = this.savePerson.bind(this);
    }


    savePerson = (e) => {
        e.preventDefault();
        const navigate = useNavigate();
        let person = { name: this.state.name, surname: this.state.surname, email: this.state.email, password: this.state.password };
        ApiService.createPerson(person)
            .then(res => {
                this.setState({ message: 'User added successfully.' });
                navigate("/login");
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(<>
            <div>
                    <Routes>
                        <Route path="/login" component={<Login/>} />
                    </Routes>
            </div>
            <div>
                <h2>Rejestracja</h2>

                <form onSubmit={this.savePerson}>
                {/*<form>*/}
                    <label>
                        Imię:
                        <input
                            type="text" name="name" value={this.name} onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        Nazwisko:
                        <input type="text" name="surname" value={this.surname} onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type="email" name="email" value={this.email} onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        Hasło:
                        <input type="password" name="password" value={this.password} onChange={this.onChange} />
                    </label>
                    <br/>
                    <button type="submit" onClick={this.savePerson}>Zarejestruj się</button>
                </form>
                <h6>Masz juz konto ?</h6>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            </>
        );
    }
}

export default Register