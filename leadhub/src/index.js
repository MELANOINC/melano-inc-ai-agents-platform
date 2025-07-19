const express = require('express');
const app = express();
app.use(express.json());

app.get('/leads', (req, res) => {
  res.json({ message: 'Leads capturados y segmentados.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`LeadHub corriendo en puerto ${PORT}`));