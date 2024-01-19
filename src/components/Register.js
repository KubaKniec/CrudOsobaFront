import React, { Component } from 'react';
import ApiService from '../service/ApiService';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './Login';

class Register extends Component {
    state = {
        name: '',
        surname: '',
        email: '',
        password: '',
        showPassword: false,
        message: '',
        gender: '',
        cardType: '',
        cardNumber: '',
        isAdmin: ''
    };

    savePerson = (e) => {
        e.preventDefault();
        //walidacja wszystkich pól, czy nie są przypadkiem puste
        if (
            !this.state.name ||
            !this.state.surname ||
            !this.state.email ||
            !this.state.password ||
            !this.state.gender ||
            !this.state.cardType ||
            !this.state.cardNumber
        ) {
            alert('Wszystkie pola muszą być wypełnione.');
            return;
        }

        // Walidacja pola email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            alert('Email niepoprawny');
            return;
        }

        // Walidacja siły hasła
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
        if (!passwordRegex.test(this.state.password)) {
            alert(
                'Hasło powinno mieć co najmniej 1 dużą literę, 1 małą literę, więcej niż 6 znaków oraz znak specjalny.'
            );
            return;
        }

        // Jeśli walidacja przebiegła pomyślnie, kontynuuj zapisywanie użytkownika
        const person = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            cardType: this.state.cardType,
            cardNumber: this.state.cardNumber,
            isAdmin: false
        };

        ApiService.createPerson(person)
            .then((res) => {
                this.setState({ message: 'Użytkownik został dodany pomyślnie.' });
                alert("Zarejestrowano pomyślnie")
            })
            .catch((error) => {
                console.error('Błąd podczas rejestracji:', error);
                this.setState({ message: 'Błąd podczas rejestracji użytkownika.' });
                alert("Błąd podczas rejestracji użytkownika. Sprawdź wszystkie dane")
            });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

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

    checkCardNumber = () => {
        const cardNumber = this.state.cardNumber;

        if (cardNumber.length === 0) {
            return 'Wprowadź numer karty';
        } else if (cardNumber.length !== 16) {
            return 'Numer karty musi zawierać dokładnie 16 cyfr.';
        } else if (!/^\d+$/.test(cardNumber)) {
            return 'Numer karty musi składać się z cyfr.';
        } else {
            return 'Poprawny numer karty';
        }
    };

    render() {
        return (
            <>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
                <div>
                    <h2>Rejestracja</h2>
                    <form onSubmit={this.savePerson}>
                        <label>
                            Imię:
                            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                        </label>
                        <br />
                        <label>
                            Nazwisko:
                            <input type="text" name="surname" value={this.state.surname} onChange={this.onChange} />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange} />
                        </label>
                        <br />
                        <label>
                            Hasło:
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
                        <div
                            style={{
                                marginTop: '5px',
                                fontSize: '0.8em',
                                color: this.checkPasswordStrength() === 'Silne hasło' ? 'green' : 'red',
                            }}
                        >
                            {this.checkPasswordStrength()}
                        </div>
                        <br />
                        <label>
                            Płeć:
                            <select name="gender" value={this.state.gender} onChange={this.onChange}>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Typ karty:
                            <select name="cardType" value={this.state.cardType} onChange={this.onChange}>
                                <option value="VISA">VISA</option>
                                <option value="MASTERCARD">MASTERCARD</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Numer karty:
                            <input
                                type="text"
                                name="cardNumber"
                                value={this.state.cardNumber}
                                onChange={this.onChange}
                                maxLength="16"
                            />
                        </label>
                        {this.checkCardNumber() !== 'Poprawny numer karty' && (
                            <div style={{ color: 'red' }}>{this.checkCardNumber()}</div>
                        )}
                        <br />
                        <button type="submit">Zarejestruj się</button>
                    </form>
                    <h6>Masz już konto?</h6>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </>
        );
    }
}

export default Register;
