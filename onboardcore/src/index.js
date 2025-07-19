const express = require('express');
const app = express();
app.use(express.json());

// Example route
app.get('/onboard', (req, res) => {
  res.json({ message: 'Onboarding process initiated.' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`OnboardCore running on port ${PORT}`));