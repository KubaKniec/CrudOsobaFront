import React, {Component} from "react";
import ApiService from "../service/ApiService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
        this.loginPerson = this.loginPerson.bind(this);
    }
    loginPerson = (e) => {
        e.preventDefault();
        let loginData = {name: this.state.name, surname: this.state.surname, email: this.state.email, password: this.state.password};
        ApiService.loginPerson(loginData).then(alert("Zalogowano pomyslnie"))


    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2>Logowanie</h2>

                <form onSubmit={this.loginPerson}>
                    {/*<form>*/}
                    <label>
                        e mail:
                        <input
                            type="text" name="email" value={this.email} onChange={this.onChange} />
                    </label>
                    <br/>
                    <label>
                        Hasło:
                        <input type="password" name="password" value={this.password} onChange={this.onChange} />
                    </label>
                    <br/>
                    <button type="submit" onClick={this.loginPerson}>Zaloguj się</button>
                </form>
            </div>
        )
    }
}


export default Login