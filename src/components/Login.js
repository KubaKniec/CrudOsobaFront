import React, {Component} from "react";
import ApiService from "../service/ApiService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            gender: '',
            cardType: '',
            cardNumber: ''
        }
        this.loginPerson = this.loginPerson.bind(this);
    }

    loginPerson = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            alert('Email niepoprawny');
            return;
        }

        ApiService.loginPerson(this.state.email, this.state.password)
            .then(response => {
                if (response.data && response.data.id && response.data.name && response.data.surname){
                    const person = response.data;
                    localStorage.setItem('login-data-id', person.id);
                    localStorage.setItem('login-data-email', this.state.email);
                    localStorage.setItem('login-data-password', this.state.password);
                    localStorage.setItem('login-data-name', person.name);
                    localStorage.setItem('login-data-surname', person.surname);
                    localStorage.setItem('login-data-gender', person.gender);
                    localStorage.setItem('login-data-cardType', person.cardType);
                    localStorage.setItem('login-data-cardNumber', person.cardNumber);
                    alert("Zalogowano pomyślnie")
                } else {
                    alert("Zły email lub hasło")
                }

            }).catch((error) => {
                console.error('Błąd podczas logowania', error);
                alert("Błąd podczas logowania, sprawdź wprowadzone dane")
                })

    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    toggleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    render() {
        return (
            <div>
                <h2>Logowanie</h2>

                <form onSubmit={this.loginPerson}>
                    {/*<form>*/}
                    <label>
                        e mail:
                        <input
                            type="text" name="email" value={this.email} onChange={this.onChange}/>
                    </label>
                    <br/>
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
                    <br/>
                    <button type="submit" onClick={this.loginPerson}>Zaloguj się</button>
                </form>
            </div>
        )
    }
}


export default Login