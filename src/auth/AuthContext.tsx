// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../_context/ServerConnector';
import { loginUser } from '../_context/AuthConnector';

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Sprawdź, czy jest token w localStorage i ustaw go globalnie
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            apiClient.defaults.headers.Authorization = `Bearer ${storedToken}`;
            // Jeśli masz endpoint, który zwraca dane użytkownika, możesz tu pobrać jego dane i ustawić user
            // na razie ustawiamy user na pusty string lub null
            setUser(user);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // const res = await apiClient.post<{ token: string }>('/login', { email, password });
        const token = await loginUser(email, password);

        setToken(token);
        setUser(email);

        localStorage.setItem('token', token);
        apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.Authorization;
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
