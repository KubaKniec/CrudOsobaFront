import axios from 'axios'

const BACKEND_URL = 'http://localhost:8081';

class ApiService {
    createPerson(person) {
        return axios.post(BACKEND_URL + '/save', person);
    }

    loginPerson(loginData) {
        return axios.put(BACKEND_URL + '/login', loginData)
    }
}

export default new ApiService();