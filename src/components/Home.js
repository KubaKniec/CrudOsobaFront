import {Component} from "react";
import ApiService from "../service/ApiService";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
        this.getData = this.getData.bind(this);
    }
    getData = (e) => {
        // let loginData = localStorage.getItem('login-data')
        this.setState({
            name: localStorage.getItem('login-data-name'),
            surname: localStorage.getItem('login-data-surname'),
            email: localStorage.getItem('login-data-email'),
            password: localStorage.getItem('login-data-password')
            })

    };


    render() {
        return(
            <div>
                <button onClick={this.getData}>Load Data</button>
                <h1>Home</h1>
                <div>
                    <h2>Person data:</h2>
                    <label>Email: {this.state.email}</label>
                    <br />
                    <label>Name: {this.state.name}</label>
                    <br />
                    <label>Surname: {this.state.surname}</label>
                    <br />
                    <label>Password: {this.state.password}</label>

                </div>
            </div>
        )
    }
}


export default Home