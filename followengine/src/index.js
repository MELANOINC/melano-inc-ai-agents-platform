const express = require('express');
const app = express();
app.use(express.json());

// Example route
app.get('/follow-ups', (req, res) => {
  res.json({ message: 'Follow-ups automated and managed.' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`FollowEngine running on port ${PORT}`));