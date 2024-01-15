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
        ApiService.loginPerson(this.state.email, this.state.password)
            .then( person => {
                    this.setState({
                        name: person.name,
                        surname: person.surname

                    })
            }
        );
        localStorage.setItem('login-data-email', this.state.email)
        localStorage.setItem('login-data-password', this.state.password)
        localStorage.setItem('login-data-name', this.state.name)
        localStorage.setItem('login-data-surname', this.state.surname)

    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

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
                        <input type="password" name="password" value={this.password} onChange={this.onChange}/>
                    </label>
                    <br/>
                    <button type="submit" onClick={this.loginPerson}>Zaloguj się</button>
                </form>
            </div>
        )
    }
}


export default Login