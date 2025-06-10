// authService.ts
import apiClient from './ServerConnector';

export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    message: string;
}

export const loginUser = async (email: string, password: string): Promise<string> => {
    const res = await apiClient.post<LoginResponse>('/login', { email, password });
    return res.data.token;
};

export const registerUser = async (name: string, email: string, password: string): Promise<string> => {
    const res = await apiClient.post<RegisterResponse>('/register', { name, email, password });
    return res.data.message;
};
