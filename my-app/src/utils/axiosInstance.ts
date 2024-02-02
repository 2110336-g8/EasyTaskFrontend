import axios, { AxiosInstance } from 'axios';

const token = 'your_token_here';

const instance: AxiosInstance = axios.create({
    baseURL: `http://${process.env.NEXT_PUBLIC_BACK_HOSTNAME || "localhost:5001"}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export default instance;

