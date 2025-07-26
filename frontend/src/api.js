import axios from 'axios';

const api = axios.create({
 baseURL: 'https://ecc-backend-i44g.onrender.com/api'
});

export default api;
