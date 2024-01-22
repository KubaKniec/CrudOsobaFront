// import React, { Component } from "react";
// import ApiService from "../service/ApiService";
//
// class AdminPanel extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: '',
//             name: '',
//             surname: '',
//             email: '',
//             password: '',
//             gender: '',
//             cardType: '',
//             cardNumber: '',
//             isAdmin: ''
//         };
//     }
//
//
//     componentDidMount() {
//         const isAdmin = this.checkIsAdmin();
//         this.setState({ isAdmin });
//     }
//
//     checkIsAdmin = () => {
//         try {
//             const response = ApiService.checkIsAdmin(localStorage.getItem('login-data-id'));
//             return response.data === true;
//         } catch (error) {
//             console.error('Błąd podczas sprawdzania uprawnień admina', error);
//             return false;
//         }
//     };
//
//     onChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     };
//     render() {
//             return (<>
//                     <div>
//                         <h1>Admin Panel</h1>
//                         <h2>Dodaj użytkownika</h2>
//                         <label>
//                             Imię:
//                             <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
//                         </label>
//                         <br />
//                         <label>
//                             Nazwisko:
//                             <input type="text" name="surname" value={this.state.surname} onChange={this.onChange} />
//                         </label>
//                         <br />
//                         <label>
//                             Email:
//                             <input type="email" name="email" value={this.state.email} onChange={this.onChange} />
//                         </label>
//                         <br />
//                         <label>
//                             Hasło:
//                             <input
//                                 name="password"
//                                 value={this.state.password}
//                                 onChange={this.onChange}
//                             />
//                         </label>
//                         <br />
//                         <label>
//                             Płeć:
//                             <select name="gender" value={this.state.gender} onChange={this.onChange}>
//                                 <option value="MALE">MALE</option>
//                                 <option value="FEMALE">FEMALE</option>
//                                 <option value="OTHER">OTHER</option>
//                             </select>
//                         </label>
//                         <br />
//                         <label>
//                             Typ karty:
//                             <select name="cardType" value={this.state.cardType} onChange={this.onChange}>
//                                 <option value="VISA">VISA</option>
//                                 <option value="MASTERCARD">MASTERCARD</option>
//                                 <option value="OTHER">OTHER</option>
//                             </select>
//                         </label>
//                         <br />
//                         <label>
//                             Numer karty:
//                             <input
//                                 type="text"
//                                 name="cardNumber"
//                                 value={this.state.cardNumber}
//                                 onChange={this.onChange}
//                                 maxLength="16"
//                             />
//                         </label>
//                     </div>
//             </>
//             );
//
//     }
// }
//
// export default AdminPanel;
