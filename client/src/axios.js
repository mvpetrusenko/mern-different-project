import axios from 'axios'

const instance = axios.create({
baseUrl: 'http://localhost:5000'
});

export default instance;