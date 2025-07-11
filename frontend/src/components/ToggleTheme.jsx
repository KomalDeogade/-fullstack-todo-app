import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem
        className={`mb-3 rounded-lg shadow hover:shadow-md bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
        secondaryAction={
          <IconButton onClick={() => onDelete(todo._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      >
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
          sx={{ color: 'purple' }}
        />
        <ListItemText primary={todo.title} />
      </ListItem>
    </motion.div>
  );
}
