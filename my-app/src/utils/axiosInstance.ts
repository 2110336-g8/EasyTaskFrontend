import axios, { AxiosInstance } from 'axios';
import { clientStorage } from '@/utils/storageService';

export const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACK_HOSTNAME || 'https://api.easytask.vt.in.th'}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        const authType = 'Bearer';
        const token = clientStorage.get().token;
        const auth = `${authType} ${token}`;

        // console.log(`Intercepted token`, token);
        // Set Authorization header here

        if (token) {
            config.headers['Authorization'] = auth;
        }

        // console.log(`Intercepted auth header`, config.headers['Authorization']);

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export const instanceBinary: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACK_HOSTNAME}`,
    headers: {},
});

instanceBinary.interceptors.request.use(
    config => {
        const authType = 'Bearer';
        const token = clientStorage.get().token;
        const auth = `${authType} ${token}`;

        // console.log(`Intercepted token`, token);
        // Set Authorization header here

        if (token) {
            config.headers['Authorization'] = auth;
        }

        // console.log(`Intercepted auth header`, config.headers['Authorization']);

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
