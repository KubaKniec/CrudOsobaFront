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

    getPersonById(id) {
        return axios.get(BACKEND_URL + '/getById?id=' + id);
    }

    deletePersonById(id) {
        return axios.delete(BACKEND_URL + '/delete?id=' + id);
    }

    updatePersonById(id, person) {
        return axios.put(BACKEND_URL + '/update/' + id, person);
    }

    checkIsAdmin(id) {
        return axios.get(BACKEND_URL + '/isAdmin?id=' + id)
    }

    grandAdminById(id) {
        return axios.put(BACKEND_URL + '/grantAdmin/' + id)
    }

    revokeAdminById(id) {
        return axios.put(BACKEND_URL + '/revokeAdmin/' + id)

    }

    loadDataFromCSV(id, pathToCSV) {
        return axios.post(BACKEND_URL + '/loadData?id=' + id + '&pathToCSV=' + pathToCSV)
    }

    exportDataToCSV(id, pathToCSV) {
        return axios.get(BACKEND_URL + '/exportData?id=' + id + '&pathToCSV=' + pathToCSV)
    }

    findMaxPasswordLength() {
        return axios.get(BACKEND_URL + '/findMaxPasswordLength');
    }

    countByGender() {
        return axios.get(BACKEND_URL + '/countByGender');
    }

    findAverageNameLength() {
        return axios.get(BACKEND_URL + '/findAverageNameLength');
    }

    findAdminsWithCardType() {
        return axios.get(BACKEND_URL + '/findAdminsWithCardType');
    }

    countByCardType() {
        return axios.get(BACKEND_URL + '/countByCardType');
    }

    findAveragePasswordLength() {
        return axios.get(BACKEND_URL + '/findAveragePasswordLength');
    }


}

export default new ApiService();