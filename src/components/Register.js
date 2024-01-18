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
            password: '',
            showPassword: false,
        }
        this.savePerson = this.savePerson.bind(this);
    }


    savePerson = (e) => {
        e.preventDefault();

        // Walidacja pola email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            alert('Email niepoprawny');
            return;
        }

        // Walidacja siły hasła
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
        if (!passwordRegex.test(this.state.password)) {
            // this.setState({
            //     message:
            //         'Hasło powinno mieć co najmniej 1 dużą literę, 1 małą literę, więcej niż 6 znaków oraz znak specjalny.',
            // });
            alert('Hasło powinno mieć co najmniej 1 dużą literę, 1 małą literę, więcej niż 6 znaków oraz znak specjalny.');
            return;
        }

        // Jeśli walidacja przebiegła pomyślnie, kontynuuj zapisywanie użytkownika
        const person = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
        };

        ApiService.createPerson(person)
            .then((res) => {
                this.setState({ message: 'Użytkownik został dodany pomyślnie.' });
            })
            .catch((error) => {
                console.error('Błąd podczas rejestracji:', error);
                this.setState({ message: 'Błąd podczas rejestracji użytkownika.' });
            });
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    toggleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    checkPasswordStrength = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
        const isStrong = passwordRegex.test(this.state.password);

        if (this.state.password.length === 0) {
            return 'Wprowadź hasło';
        } else if (!isStrong) {
            return 'Hasło powinno mieć co najmniej 1 dużą literę, 1 małą literę, więcej niż 6 znaków oraz znak specjalny.';
        } else {
            return 'Silne hasło';
        }
    };

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
                        {/*<input type="password" name="password" value={this.password} onChange={this.onChange} />*/}
                        <input
                            type={this.state.showPassword ? 'text' : 'password'}
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        <button type="button" onClick={this.toggleShowPassword}>
                            {this.state.showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                        </button>
                    </label>
                    <div style={{ marginTop: '5px', fontSize: '0.8em', color: this.checkPasswordStrength() === 'Silne hasło' ? 'green' : 'red' }}>
                        {this.checkPasswordStrength()}
                    </div>
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