import React, {Component} from "react";
import {Link} from "react-router-dom";
import ApiService from "../service/ApiService";

class EditPersonData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            gender: '',
            cardType: '',
            cardNumber: '',
            showPassword: false,
            message: '',
        };
    }

    componentDidMount() {
        // Pobierz dane użytkownika do edycji i ustaw w stanie komponentu
        this.fetchUserData();
    }

    fetchUserData = () => {
        const userId = localStorage.getItem('login-data-id');
        if (userId) {
            ApiService.getPersonById(userId)
                .then((response) => {
                    const userData = response.data;
                    this.setState({
                        id: userId,
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email,
                        password: userData.password,
                        gender: userData.gender,
                        cardType: userData.cardType,
                        cardNumber: userData.cardNumber
                    });
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania danych użytkownika:', error);
                });
        }
    };

    saveChanges = (e) => {
        const Id = localStorage.getItem('login-data-id');
        if (Id){
            e.preventDefault();
            const { id, name, surname, email, password, gender, cardType, cardNumber } = this.state;
            const userId = localStorage.getItem('login-data-id');

            if (userId) {
                const person = {
                    id,
                    name,
                    surname,
                    email,
                    password,
                    gender,
                    cardType,
                    cardNumber
                };

                // console.log(person)
                // console.log('Name:', this.state.name);
                // console.log('Surname:', this.state.surname);
                // console.log('Email:', this.state.email);
                // console.log('Password:', this.state.password);
                // console.log('Gender:', this.state.gender);
                // console.log('Card Type:', this.state.cardType);
                // console.log('Card Number:', this.state.cardNumber);

                ApiService.updatePersonById(this.state.id, person)
                    .then((res) => {
                        this.setState({ message: 'Zaktualizowano dane użytkownika pomyślnie.' });
                    })
                    .catch((error) => {
                        console.error('Błąd podczas aktualizacji danych użytkownika:', error);
                        this.setState({ message: 'Błąd podczas aktualizacji danych użytkownika.' });
                    });
            }
        } else {
            alert("Zaloguj się aby edytować dane")
        }
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    toggleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    checkPasswordStrength = () => {
        const password = this.state.password;
        if (password === undefined || password === null) {
            return 'Wprowadź hasło';
        }

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
        const passwordStrength = this.checkPasswordStrength();
        return (
            <>
                <div>
                    <h2>Edytuj Profil</h2>
                    <h5>Wypełnij tylko pola, które chcesz edytować</h5>


                    <form onSubmit={this.saveChanges}>
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
                        <div style={{ marginTop: '5px', fontSize: '0.8em', color: this.checkPasswordStrength() === 'Silne hasło' ? 'green' : 'red' }}>
                            {passwordStrength}
                        </div>
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
                        <br />
                        <button type="submit">Zapisz zmiany</button>
                    </form>
                    {this.state.message && <p style={{ color: 'green' }}>{this.state.message}</p>}
                </div>
            </>
        );
    }
}
export default EditPersonData