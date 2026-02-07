const express = require('express');
const app = express();
const PORT = 5000;

// Basic middleware
app.use(require('cors')());
app.use(express.json());

// Test root route
app.get('/', (req, res) => {
  res.json({ message: 'Test server is running' });
});

// Test announcements route
app.get('/api/announcements', (req, res) => {
  console.log('Announcements route hit!');
  res.json({ success: true, count: 0, data: [] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
