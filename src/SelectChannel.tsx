import React, { useState } from 'react';
import { Autocomplete, TextField, Button, Box } from '@mui/material';

interface Option {
    label: string;
    id: string;
}

type Props = {
  onSubmit: (channel: { label: string; id: string }) => void;
};

export default function SelectChannel({ onSubmit }: Props) {
 const strzyzewskiChannelId = 'UCI_J08LFR7uZrQ_h3Mtf4ZQ';
 const czukeskyChannelId = 'UCre35Pzn5DRY-zj2gQtp6bw';

  const options = [
    { label: 'Marcin Strzyżewski', id: 'UCI_J08LFR7uZrQ_h3Mtf4ZQ' },
    { label: 'Tomasz Czukiewski', id: 'UCre35Pzn5DRY-zj2gQtp6bw' },
  ];

  const [selected, setSelected] = useState<Option | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      onSubmit(selected);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, mx: 'auto', mt: 4 }}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        value={selected}
        onChange={(event, newValue) => setSelected(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Wybierz kanał" variant="outlined" required />
        )}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Wyślij
      </Button>
    </Box>
  );
}
