const express = require('express');
const app = express();
app.use(express.json());

// Example route
app.get('/sales', (req, res) => {
  res.json({ message: 'Sales data retrieved successfully.' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`SalesSuite running on port ${PORT}`));