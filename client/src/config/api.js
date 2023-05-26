import axios from 'axios';

const api = axios.create({
    baseURL: "https://blood-donation-server.vercel.app/"
})

export default api;