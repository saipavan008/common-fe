import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const headers = () => {
    const headersData = {
        "content-type": "application/json",
        "Accept": "application/json",
    };
    return headersData;
};

const request = async (method, path, body, query) => {
    let url = `${baseURL}${path}`;
    let options = {method, url, headers: await headers()};

    if(body){
        options.data = body;
    }
    if (query){
        options = Object.assign(options, {params: query})
    }
    return axios(options);
};

export default class API {
    register(data) {
        return request('POST', "/register", data)
    }

    login(data) {
        return request('POST', '/login', data)
    }

    forgotPassword(data) {
        return request('Post', '/reset-password', data)
    }

    getAllUsers() {
        return request('GET' , '/all-users')
    }

    getAllProducts(){
        return request("GET", "/all-products")
    }

    updateProducts(data){
        return request("POST", "/all-products", data)
    }

    createPackage(data) {
        return request('POST', '/create-package', data)
    }

    getAllPackages(query) {
        return request('GET', `/all-packages`, {}, query)
    }

    deletePackage(data) {
        return request('DELETE', '/package-delete', data)
    }

    updatePackage(data){
        return request('PUT', '/update-package', data)
    }

    getCartItems(){
        return request('GET', '/get-cart-items')
    }

    checkout(data){
        return request('POST', '/checkout', data)
    }

    addCashBook(data) {
        return request('POST', '/add-cashbook', data)
    }

    getAllCashbooks() {
        return request('GET', '/all-cashbooks', {})
    }

    getCashbookSingleDetails(id){
        return request('GET', `/cashbook-details/${id}`)
    }

    updateCashbook(data) {
        return request('POST', '/update-cashbook', data)
    }

    deleteCashbook(data) {
        return request('DELETE', '/delete-cashbook', data)
    }

    updateTransactions(data, id) {
        return request('POST', `/cashbook-details/${id}`, data)
    }

    editAndUpdateTransactions(data, id, itemId) {
        return request('PATCH', `/cashbook-details/${id}?itemId=${itemId}`, data)
    }

    deleteTransactions(id, itemId) {
            return request('DELETE', `/cashbook-details/${id}?itemId=${itemId}`)
        }

};