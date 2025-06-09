import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Subject, getSubjects } from '../_context/API';

type FormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

interface InputProps {
    onSetTitle: (title: string, props: { name: string, version: string }) => void;
}

export default function RegistrationPage({ onSetTitle }: InputProps) {
    const subPageTitle = 'Formularz rejestracyjny';
    const { handleSubmit, control, register, formState: { errors } } = useForm<FormValues>();

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        onSetTitle(subPageTitle, { name: '', version: '' });
        getSubjects().then(setSubjects).catch(console.error);
    }, []);

    const onSubmit = (data: FormValues) => {
        console.log('Wysłano:', data);
        alert('Formularz został wysłany!');
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Formularz kontaktowy</Typography>

            <TextField
                label="Imię i nazwisko"
                fullWidth
                margin="normal"
                {...register("name", { required: "Imię jest wymagane" })}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

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

            <Controller
                name="subject"
                control={control}
                defaultValue=""
                rules={{ required: "Wybierz temat" }}
                render={({ field }) => (
                    <TextField
                        select
                        label="Temat"
                        fullWidth
                        margin="normal"
                        {...field}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                    >
                        {subjects.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <TextField
                label="Wiadomość"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register("message", { required: "Wiadomość nie może być pusta" })}
                error={!!errors.message}
                helperText={errors.message?.message}
            />

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Wyślij
            </Button>
        </Box>
    );
}
