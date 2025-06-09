import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export function createApiClient(apiKey: string, channelId: string, maxResult: string): AxiosInstance {
    const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}`
        + `&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResult}`;

    const YTConnector: AxiosInstance = axios.create({
        baseURL,
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' }
    });

    YTConnector.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    YTConnector.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response?.status === 401) {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return YTConnector;
}

