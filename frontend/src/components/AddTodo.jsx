import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion'; // Add this import

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.form>
  );
}