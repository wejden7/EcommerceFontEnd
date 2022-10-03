import axios from 'axios';
import {baseUrl} from '../data/dummy'
const instance = axios.create({

    baseURL: baseUrl
});

//instance.defaults.headers.common['Authorization'] = localStorage.getItem("token")||"";



export default instance;