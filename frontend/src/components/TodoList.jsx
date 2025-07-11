import TodoItem from './TodoItem';
import { List } from '@mui/material';

export default function TodoList({ todos, onDelete , onToggle }) {
  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo._id} 
        todo={todo} 
        onDelete={onDelete} 
           onToggle={onToggle} // ✅ Pass the toggle handler
           />
      ))}
    </List>
  );
}


