import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="my-4">
        <TextField
          fullWidth
          label="What do you need to do?"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 1 }}
        />
        <Button variant="contained" color="secondary" type="submit">
          Add
        </Button>
      </Stack>
    </form>
  );
}
