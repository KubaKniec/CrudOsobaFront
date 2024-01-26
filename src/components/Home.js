import React, {Component} from "react";
import ApiService from "../service/ApiService";
import {Link, Route, Routes} from "react-router-dom";
import EditPersonData from "./EditPersonData";
import "../css/Home.css"

// import AdminPanel from "./AdminPanel";

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
            isAdmin: '',
            adminData: {
                name: '',
                surname: '',
                email: '',
                password: '',
                gender: '',
                cardType: '',
                cardNumber: '',
                isPersonAdmin: ''
            },
            adminDataToUpdate: {
                adminDataId: '',
                name: '',
                surname: '',
                email: '',
                password: '',
                gender: '',
                cardType: '',
                cardNumber: '',
                isPersonAdmin: ''
            },
            deleteUserId: '',
            grantAdmin: '',
            revokeAdmin: '',
            csvImportPath: '',
            csvExportPath: '',
            findMaxPasswordLength: '',
            countByGender: '',
            findAverageNameLength: '',
            findAdminsWithCardType: '',
            countByCardType: '',
            findAveragePasswordLength: ''
        }
        this.getData = this.getData.bind(this);
    }

    getData = async () => {
        this.setState({
            id: localStorage.getItem('login-data-id'),
            name: localStorage.getItem('login-data-name'),
            surname: localStorage.getItem('login-data-surname'),
            email: localStorage.getItem('login-data-email'),
            password: localStorage.getItem('login-data-password'),
            gender: localStorage.getItem('login-data-gender'),
            cardType: localStorage.getItem('login-data-cardType'),
            cardNumber: localStorage.getItem('login-data-cardNumber'),
        });


        const isAdmin = await this.checkIsAdmin();

        if (isAdmin === true) {
            this.setState({
                isAdmin: true,
            });
        } else {
            this.setState({
                isAdmin: false,
            });
        }

    };

    async componentDidMount() {
        await this.getData(localStorage.getItem('login-data-id'));
    }

    checkIsAdmin = async (e) => {
        try {
            const response = await ApiService.checkIsAdmin(this.state.id);
            return response.data === true;
        } catch (error) {
            console.error('Błąd podczas sprawdzania uprawnień admina', error);
            return false;
        }
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

    onAdminDataChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            adminData: {
                ...prevState.adminData,
                [name]: value
            }
        }));
    };
    onAdminDataToUpdateChange = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            adminDataToUpdate: {
                ...prevState.adminDataToUpdate,
                [name]: value
            }
        }));
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    saveAdminData = () => {
        ApiService.createPerson(this.state.adminData)
            .then(alert("Dodano pomyślnie"))
            .catch((error) => {
                console.error('Błąd podczas dodawania', error);
                alert("Błąd podczas dodawania")
            })

    }

    deleteUserById = () => {
        ApiService.deletePersonById(this.state.deleteUserId)
            .then(alert("Usunięto pomyślnie"))
            .catch((error) => {
                console.error('Błąd podczas usuwania', error);
                alert("Błąd podczas usuwania")
            })
    }

    grandAdminById = () => {
        ApiService.grandAdminById(this.state.grantAdmin)
            .then(alert("Przyznano pomyślnie"))
            .catch((error) => {
                console.error('Błąd podczas przyznawania', error);
                alert("Błąd podczas przyznawania")
            })
    }

    revokeAdminById = () => {
        ApiService.revokeAdminById(this.state.revokeAdmin)
            .then(alert("Odebrano pomyślnie"))
            .catch((error) => {
                console.error('Błąd podczas odbierania', error);
                alert("Błąd podczas odbierania")
            })
    }

    updateAdminDataById = () => {
        ApiService.updatePersonById(this.state.adminDataToUpdate.adminDataId,
            this.state.adminDataToUpdate)

    }

    loadDataFromCSV = () => {
        ApiService.loadDataFromCSV(this.state.id, this.state.csvImportPath);
    }

    exportDataToCSV = () => {
        ApiService.exportDataToCSV(this.state.id, this.state.csvExportPath);
    }

    loadFunData = async () => {
        try {
            const maxPasswordLengthResponse = await ApiService.findMaxPasswordLength();
            const countByGenderResponse = await ApiService.countByGender();
            const averageNameLengthResponse = await ApiService.findAverageNameLength();
            const adminsWithCardTypeResponse = await ApiService.findAdminsWithCardType();
            const countByCardTypeResponse = await ApiService.countByCardType();
            const averagePasswordLengthResponse = await ApiService.findAveragePasswordLength();

            this.setState({
                findMaxPasswordLength: maxPasswordLengthResponse.data,
                countByGender: countByGenderResponse.data,
                findAverageNameLength: averageNameLengthResponse.data,
                findAdminsWithCardType: adminsWithCardTypeResponse.data,
                countByCardType: countByCardTypeResponse.data,
                findAveragePasswordLength: averagePasswordLengthResponse.data,
            });
        } catch (error) {
            console.error('Error loading fun facts:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };

    renderAdminPanel = () => { //TODO zrobic tak zeby w tej funkcji byl obiekt ktory potem jest wysylany do .save() na backend

        if (this.state.isAdmin === true)
            return (
                <div className={"anotherDiv"}>
                    <h1>Admin Panel</h1>
                    <div className={"divInAdmin"}>
                        <h2>Dodaj użytkownika</h2>
                        <form onSubmit={this.saveAdminData}>
                            <label>
                                Imię:
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.adminData.name}
                                    onChange={this.onAdminDataChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Nazwisko:
                                <input
                                    type="text"
                                    name="surname"
                                    value={this.state.adminData.surname}
                                    onChange={this.onAdminDataChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.adminData.email}
                                    onChange={this.onAdminDataChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Hasło:
                                <input
                                    name="password"
                                    value={this.state.adminData.password}
                                    onChange={this.onAdminDataChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Płeć:
                                <select
                                    name="gender"
                                    value={this.state.adminData.gender}
                                    onChange={this.onAdminDataChange}
                                >
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </label>
                            <br/>
                            <label>
                                Typ karty:
                                <select
                                    name="cardType"
                                    value={this.state.adminData.cardType}
                                    onChange={this.onAdminDataChange}
                                >
                                    <option value="VISA">VISA</option>
                                    <option value="MASTERCARD">MASTERCARD</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </label>
                            <br/>
                            <label>
                                Numer karty:
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={this.state.adminData.cardNumber}
                                    onChange={this.onAdminDataChange}
                                    maxLength="16"
                                />
                            </label>
                            <br/>
                            <button type="submit">Dodaj</button>
                        </form>
                    </div>
                    <div className={"divInAdmin"}>
                        <h2>Edycja statusu ADMINA</h2>
                        <form onSubmit={this.grandAdminById}>
                            <label>
                                Id:
                                <input
                                    name="grantAdmin"
                                    value={this.state.grantAdmin}
                                    onChange={this.onChange}/>
                            </label>
                            <br/>
                            <button type="submit">Przyznaj</button>
                        </form>
                        <form onSubmit={this.revokeAdminById}>
                            <label>
                                Id:
                                <input
                                    name="revokeAdmin"
                                    value={this.state.revokeAdmin}
                                    onChange={this.onChange}/>
                            </label>
                            <br/>
                            <button type="submit">Odbierz</button>
                        </form>
                    </div>
                    <div className={"divInAdmin"}>

                        <h2>Edytuj użytkownika</h2>
                        <form onSubmit={this.updateAdminDataById}>
                            <label>
                                ID:
                                <input
                                    required={true}
                                    type="text"
                                    name="adminDataId"
                                    value={this.state.adminDataToUpdate.adminDataId}
                                    onChange={this.onAdminDataToUpdateChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Imię:
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.adminDataToUpdate.name}
                                    onChange={this.onAdminDataToUpdateChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Nazwisko:
                                <input
                                    type="text"
                                    name="surname"
                                    value={this.state.adminDataToUpdate.surname}
                                    onChange={this.onAdminDataToUpdateChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.adminDataToUpdate.email}
                                    onChange={this.onAdminDataToUpdateChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Hasło:
                                <input
                                    name="password"
                                    value={this.state.adminDataToUpdate.password}
                                    onChange={this.onAdminDataToUpdateChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Płeć:
                                <select
                                    name="gender"
                                    value={this.state.adminDataToUpdate.gender}
                                    onChange={this.onAdminDataToUpdateChange}
                                >
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </label>
                            <br/>
                            <label>
                                Typ karty:
                                <select
                                    name="cardType"
                                    value={this.state.adminDataToUpdate.cardType}
                                    onChange={this.onAdminDataToUpdateChange}
                                >
                                    <option value="VISA">VISA</option>
                                    <option value="MASTERCARD">MASTERCARD</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </label>
                            <br/>
                            <label>
                                Numer karty:
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={this.state.adminDataToUpdate.cardNumber}
                                    onChange={this.onAdminDataToUpdateChange}
                                    maxLength="16"
                                />
                            </label>
                            <br/>
                            <button type="submit">Aktualizuj</button>
                        </form>
                    </div>
                    <div className={"divInAdmin"}>
                        <h2>Usuń użytkownika</h2>
                        <form onSubmit={this.deleteUserById}>
                            <label>
                                Id:
                                <input
                                    name="deleteUserId"
                                    value={this.state.deleteUserId}
                                    onChange={this.onChange}/>
                            </label>
                            <br/>
                            <button type="submit">Usuń</button>
                        </form>
                    </div>
                    <div className={"divInAdmin"}>
                        <h2>Załaduj dane z CSV</h2>
                        <form onSubmit={this.loadDataFromCSV}>
                            <label>
                                Podaj ścieżkę do instniejącego pliku CSV (BEZ NAZWY DYSKU)<br/>
                                Zapisz plik na dysku 'C' !<br/>
                                poprawna ścieżka: /example/test.csv<br/>
                                niepoprawna ścieżka: C:/example/test.scv<br/>
                                <input
                                    type="text"
                                    name="csvImportPath"
                                    value={this.state.csvImportPath}
                                    onChange={this.onChange}/>
                            </label>
                            <br/>
                            <button type="submit">Załaduj dane</button>
                        </form>
                        <h2>Wykesportuj dane do CVS</h2>
                        <form onSubmit={this.exportDataToCSV}>
                            <label>
                                Ścieżka do miejsca zapisu pliku:<br/>
                                Dysk dowolny<br/>
                                poprawna ścieżka: C:/example/test.csv<br/>
                                niepoprawna ścieżka: /example/test.scv<br/>
                                <input
                                    type="text"
                                    name="csvExportPath"
                                    value={this.state.csvExportPath}
                                    onChange={this.onChange}/>
                            </label>
                            <br/>
                            <button type="submit">Wyeksportuj dane</button>
                        </form>
                    </div>
                </div>
            );
    };

    render() {
        return (
            <div>
                <h1>Home</h1>
                <button className={"ReloadData"} onClick={this.getData}>Reload Data</button>
                <div className={"anotherDiv"}>
                    <h2>Person data:</h2>
                    <label>Id: {this.state.id}</label>
                    <br/>
                    <label>Email: {this.state.email}</label>
                    <br/>
                    <label>Imię: {this.state.name}</label>
                    <br/>
                    <label>Nazwisko: {this.state.surname}</label>
                    <br/>
                    <label>Hasło: {this.state.password}</label>
                    <br/>
                    <label>Płeć: {this.state.gender}</label>
                    <br/>
                    <label>Typ karty: {this.state.cardType}</label>
                    <br/>
                    <label>Numer karty: {this.state.cardNumber}</label>


                </div>
                <br/>
                <br/>
                <div className={"anotherDiv"}>
                    <h1>Edit Data: </h1>
                    <Routes>
                        <Route path="/editData" element={<EditPersonData/>}/>
                    </Routes>
                    <Link to="/editData">
                        <button>Edit</button>
                    </Link>
                </div>


                <br/>
                <br/>
                <div className={"anotherDiv"}>
                    <h1>DANGER ZONE</h1>
                    <div>
                        <h2>Delete Account</h2>
                        <button className={"Delete"} onClick={this.deletePerson}>DELETE 4 EVER</button>
                    </div>
                </div>
                <div className={"anotherDiv"}>
                    <div>
                        <h2>Fun Facts</h2>
                        <p>Max Password Length: {this.state.findMaxPasswordLength}</p>
                        <p>Gender Counts: {JSON.stringify(this.state.countByGender)}</p>
                        <p>Average Name Length: {this.state.findAverageNameLength}</p>
                        <p><strong>Admin Card Type Counts:</strong></p>
                        <ul>
                            {Array.isArray(this.state.findAdminsWithCardType) &&
                            this.state.findAdminsWithCardType.reduce((cardTypeCounts, adminWithType) => {
                                const cardType = adminWithType[1];
                                cardTypeCounts[cardType] = (cardTypeCounts[cardType] || 0) + 1;
                                return cardTypeCounts;
                            }, {})
                                ? Object.entries(this.state.findAdminsWithCardType.reduce((cardTypeCounts, adminWithType) => {
                                    const cardType = adminWithType[1];
                                    cardTypeCounts[cardType] = (cardTypeCounts[cardType] || 0) + 1;
                                    return cardTypeCounts;
                                }, {})).map(([cardType, count]) => (
                                    <label key={cardType}>{`${cardType}: ${count}`}</label>
                                ))
                                : null
                            }
                        </ul>
                        <p>Card Type Counts: {JSON.stringify(this.state.countByCardType)}</p>
                        <p>Average Password Length: {this.state.findAveragePasswordLength}</p>
                        <button onClick={this.loadFunData}>Load fun Data</button>
                    </div>
                </div>
                <div>
                    {this.renderAdminPanel()}
                </div>

            </div>
        )
    }
}


export default Home