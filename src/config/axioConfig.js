import axios from 'axios';
const instance = axios.create({

    baseURL: 'https://shope7.herokuapp.com'
});

//instance.defaults.headers.common['Authorization'] = localStorage.getItem("token")||"";



export default instance;