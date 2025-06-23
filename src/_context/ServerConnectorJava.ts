import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL_JAVA = 'http://localhost:9090';

const ServerConnectorJava: AxiosInstance = axios.create({
    baseURL: BASE_URL_JAVA,
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
});

export default ServerConnectorJava;
