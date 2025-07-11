const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// 🔌 MongoDB connection
mongoose.connect(
  'mongodb+srv://todoUser:todoPass123@todo-cluster.whuxguj.mongodb.net/?retryWrites=true&w=majority&appName=todo-cluster',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🧠 Mongoose Schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// 📡 API Routes

// GET all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      completed: false,
    });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Backend POST error:", err.message);
    res.status(500).json({ error: "Failed to save todo" });
  }
});

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ✅ Toggle todo complete/incomplete
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    const updated = await todo.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Toggle error:", err.message);
    res.status(500).json({ error: "Failed to update todo" });
  }
});


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
