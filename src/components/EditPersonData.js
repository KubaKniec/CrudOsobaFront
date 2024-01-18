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
            const { id, name, surname, email, password } = this.state;
            const userId = localStorage.getItem('login-data-id');

            if (userId) {
                const person = {
                    id,
                    name,
                    surname,
                    email,
                    password,
                };

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