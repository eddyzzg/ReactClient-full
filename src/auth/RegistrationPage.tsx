import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { registerUser } from '../_context/AuthConnector';
import { useNavigate } from 'react-router-dom';

type RegistrationFormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface InputProps {
    onSetTitle: (title: string, props: { name: string; version: string }) => void;
}

export default function RegistrationPage({ onSetTitle }: InputProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormValues>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    onSetTitle('Rejestracja', { name: '', version: '' });

    const onSubmit = async (data: RegistrationFormValues) => {
        if (data.password !== data.confirmPassword) {
            setError('Hasła nie są takie same');
            return;
        }
        setError(null);

        try {
            await registerUser(data.username, data.email, data.password);
            setSuccess(true);
            navigate('/');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Błąd rejestracji');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom>Rejestracja</Typography>

            <TextField
                label="Nazwa użytkownika"
                fullWidth
                margin="normal"
                {...register('username', { required: 'Nazwa użytkownika jest wymagana' })}
                error={!!errors.username}
                helperText={errors.username?.message}
            />

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register('email', {
                    required: 'Email jest wymagany',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Nieprawidłowy format email' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                label="Hasło"
                fullWidth
                type="password"
                margin="normal"
                {...register('password', { required: 'Hasło jest wymagane', minLength: { value: 6, message: 'Minimum 6 znaków' } })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <TextField
                label="Powtórz hasło"
                fullWidth
                type="password"
                margin="normal"
                {...register('confirmPassword', { required: 'Potwierdź hasło' })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />

            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            {success && <Typography color="success.main" sx={{ mt: 1 }}>Rejestracja zakończona sukcesem!</Typography>}

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Zarejestruj się
            </Button>
        </Box>
    );
}
