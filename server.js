// Require express and path 
const express = require('express');
const path = require('path');

// Require the file that will handle /api routing
const api = require('./routes/index')

// Set the port and instantiate express app
const PORT = process.env.port || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api)
// comment

// Serve index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Serve notes.html when user visits /notes
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Set port listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);