const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Complete overhaul of company website',
      progress: 45
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'New cross-platform mobile application',
      progress: 80
    },
    {
      id: 3,
      title: 'Marketing Campaign',
      description: 'Q2 product launch campaign',
      progress: 30
    }
  ]);
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'User logged in successfully' });
});
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'User logged in successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
