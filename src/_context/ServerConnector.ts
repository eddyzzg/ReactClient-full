import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:4000';

const ServerConnector: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
});

// globalny interceptor dla request
ServerConnector.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// globalna obsługa błędów
ServerConnector.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default ServerConnector;
