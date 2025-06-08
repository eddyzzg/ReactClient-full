import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({ value, onChange }: FilterSelectProps): React.ReactNode {
  const options = ['5', '10', '15', '20', '30', '50'];

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <div className="filter-container">
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel id="filter-select-label">
          Ilość materiałów na stronie
        </InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={value}
          label="Ilość materiałów na stronie"
          onChange={handleChange}
        >
          {options.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
