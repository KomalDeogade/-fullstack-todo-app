import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
// import ToggleTheme from './components/ToggleTheme';
import { motion } from 'framer-motion';
import { Container, Typography, Card, CardContent } from '@mui/material';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error("GET error:", err));
  }, []);

  const addTodo = async (title) => {
    const res = await axios.post('http://localhost:5000/api/todos', { title });
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Container maxWidth="sm" className="pt-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-xl shadow-2xl bg-white dark:bg-gray-900">
            <CardContent>
              <Typography variant="h4" align="center" className="font-bold text-purple-700 dark:text-white mb-2">
                ✨ ToDo List
              </Typography>
              <Typography align="center" className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                Stay organized & stylish
              </Typography>

              <AddTodo onAdd={addTodo} />
              <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
              <div className="flex justify-center mt-4">
                {/* <ToggleTheme /> */}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}

export default App;
