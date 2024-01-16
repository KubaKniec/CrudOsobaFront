import {Component} from "react";
import ApiService from "../service/ApiService";
import App from "../App";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            surname: '',
            email: '',
            password: ''
        }
        this.getData = this.getData.bind(this);
    }
    getData = (e) => {
        this.setState({
            id: localStorage.getItem('login-data-id'),
            name: localStorage.getItem('login-data-name'),
            surname: localStorage.getItem('login-data-surname'),
            email: localStorage.getItem('login-data-email'),
            password: localStorage.getItem('login-data-password')
            })

    };

    deletePerson = (e) => {
        e.preventDefault();
        ApiService.deletePersonById(this.state.id)
    }


    render() {
        return(
            <div>
                <h1>Home</h1>
                <div>
                    <h2>Person data:</h2>
                    <button onClick={this.getData}>Load Data</button>
                    <br />
                    <br />
                    <label>Id: {this.state.id}</label>
                    <br />
                    <label>Email: {this.state.email}</label>
                    <br />
                    <label>Name: {this.state.name}</label>
                    <br />
                    <label>Surname: {this.state.surname}</label>
                    <br />
                    <label>Password: {this.state.password}</label>
                </div>
                <br />
                <br />
                <br />
                <h1>DANGER ZONE</h1>
                <div>
                    <h2>Delete Account</h2>
                    <button onClick={this.deletePerson}>DELETE 4 EVER</button>
                </div>
            </div>
        )
    }
}


export default Home