import axios from 'axios'

const BACKEND_URL = 'http://localhost:8081';

class ApiService {
    createPerson(person) {
        return axios.post(BACKEND_URL + '/save', person);
    }

    loginPerson(email, password) {
        return axios.get(BACKEND_URL + '/login?email=' + email + '&password=' + password)
    }

    getPersonByEmail(email) {
        return axios.get(BACKEND_URL + '/getByEmail?' + email);
    }

    deletePersonById(id) {
        return axios.delete(BACKEND_URL + '/delete?id=' + id);
    }
}

export default new ApiService();