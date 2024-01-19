import React, {Component} from "react";
import ApiService from "../service/ApiService";
import App from "../App";
import {Link, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import EditPersonData from "./EditPersonData";

class Home extends Component {
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
            isAdmin: ''
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }
    getData = (e) => {
        this.setState({
            id: localStorage.getItem('login-data-id'),
            name: localStorage.getItem('login-data-name'),
            surname: localStorage.getItem('login-data-surname'),
            email: localStorage.getItem('login-data-email'),
            password: localStorage.getItem('login-data-password'),
            gender: localStorage.getItem('login-data-gender'),
            cardType: localStorage.getItem('login-data-cardType'),
            cardNumber: localStorage.getItem('login-data-cardNumber'),
            isAdmin: localStorage.getItem('login-data-isAdmin')
            })

    };

    deletePerson = (e) => {
        e.preventDefault();
        ApiService.deletePersonById(this.state.id)
            .then(() => {
                localStorage.clear();
                this.getData();
                alert("Twoje dane zostały usunięte")
            }).catch((error) => {
            console.error('Błąd podczas usuwania użytkownika')
            alert('Błąd podczas usuwania użytkownika')
        })
    }

    checkIsAdmin = (e) => {
        e.preventDefault();
        ApiService.checkIsAdmin(this.state.id)
            .then(() => {
                return(
                    <div>
                        <h1>Admin Panel</h1>
                        <h2>Dodaj użytkownika</h2>
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
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </label>
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
                    </div>
                )
            })
    }


    render() {
        return(
            <div>
                <h1>Home</h1>
                <div>
                    <h2>Person data:</h2>
                    <button onClick={this.getData}>Reload Data</button>
                    <br />
                    <br />
                    <label>Id: {this.state.id}</label>
                    <br />
                    <label>Email: {this.state.email}</label>
                    <br />
                    <label>Imię: {this.state.name}</label>
                    <br />
                    <label>Nazwisko: {this.state.surname}</label>
                    <br />
                    <label>Hasło: {this.state.password}</label>
                    <br />
                    <label>Płeć: {this.state.gender}</label>
                    <br />
                    <label>Typ karty: {this.state.cardType}</label>
                    <br />
                    <label>Numer karty: {this.state.cardNumber}</label>
                    <br />
                    <label>Admin: {this.state.isAdmin}</label>
                </div>
                <br />
                <br />
                <h1>Edit Data: </h1>
                <Routes>
                    <Route path="/editData" element={<EditPersonData/>}/>
                </Routes>
                <Link to="/editData">
                    <button>Edit</button>
                </Link>


                <br />
                <br />
                <h1>DANGER ZONE</h1>
                <div>
                    <h2>Delete Account</h2>
                    <button onClick={this.deletePerson}>DELETE 4 EVER</button>
                </div>
                <div>
                    {this.checkIsAdmin}
                </div>
            </div>
        )
    }
}


export default Home