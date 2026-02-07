const express = require('express');
const cors = require('cors');
const { mockBugs, mockCommits, mockDocs, mockCalendar } = require('./data/mockData');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/github/search', (req, res) => {
  const { q, type } = req.query;
  const query = (q || '').toLowerCase();

  if (type === 'issues') {
    const filtered = mockBugs.filter((bug) =>
      bug.title.toLowerCase().includes(query)
    );
    return res.json(filtered);
  }

  if (type === 'commits') {
    return res.json(mockCommits);
  }

  return res.json([]);
});

app.get('/api/notion/search', (req, res) => {
  const { q } = req.query;
  const query = (q || '').toLowerCase();
  const filtered = mockDocs.filter((doc) =>
    doc.title.toLowerCase().includes(query)
  );
  res.json(filtered);
});

app.post('/api/calendar/availability', (req, res) => {
  res.json(mockCalendar);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
