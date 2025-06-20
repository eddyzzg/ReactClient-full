import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthProvider } from './auth/AuthContext';

serviceWorkerRegistration.register();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
); 
