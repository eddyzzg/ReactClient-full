import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../_context/AuthConnector';

type FormValues = {
    email: string;
    password: string;
};

interface InputProps {
    onSetTitle: (title: string, props: { name: string, version: string }) => void;
}

export default function LoginPage({ onSetTitle }: InputProps) {
    const subPageTitle = 'Strona logowania';
    const { handleSubmit, control, register, formState: { errors } } = useForm<FormValues>();

    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    onSetTitle(subPageTitle, { name: '', version: '' });

    const handleLogin = async (data: FormValues) => {
        try {
            await login(data.email, data.password)
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Błąd logowania');
        }
    };

    const handelGoToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ maxWidth: 500, mx: 'auto', mt: 12 }}>
            <Typography variant="h5" gutterBottom>Logowanie</Typography>

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email", {
                    required: "Email jest wymagany",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Nieprawidłowy format adresu email",
                    },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                label="Hasło"
                fullWidth
                margin="normal"
                type="password"
                {...register("password", { required: "Musisz podać hasło" })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
                Wyślij
            </Button>
            <Button type="submit" variant="contained" color="warning" onClick={() => handelGoToRegisterPage()} sx={{ mt: 2 }}>
                Rejestracja
            </Button>
        </Box>
    );
}
