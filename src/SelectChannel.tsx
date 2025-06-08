import React, { useState } from 'react';
import { Autocomplete, TextField, Button, Box } from '@mui/material';

interface Option {
  label: string;
  id: string;
}

type FormResult = {
  onSubmit: (channel: { label: string; id: string }, name: string) => void;
};

export default function SelectChannel({ onSubmit }: FormResult) {
  const options = [
    { label: 'Marcin Strzyżewski', id: 'UCI_J08LFR7uZrQ_h3Mtf4ZQ' },
    { label: 'Tomasz Czukiewski', id: 'UCre35Pzn5DRY-zj2gQtp6bw' },
  ];
  const defaultUserName = 'Bartek';

  const [channel, setSelected] = useState<Option | null>(null);
  const [name, setName] = useState(defaultUserName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (channel && name) {
      onSubmit(channel, name);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, mx: 'auto', mt: 4 }}>
      <TextField
        label="Twoje imię"
        variant="outlined"
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={channel}
        onChange={(event, newValue) => setSelected(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Wybierz kanał" variant="outlined" required />
        )}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
          Pokaż
        </Button>
    </Box>
  );
}
