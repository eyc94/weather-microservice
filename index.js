const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const apiKey = 'a2813bf7a97824733c620ca3696826b4';

// If there is a 'space' in the name, use URL encoding of 'space', which is %20.
// For example, "Los Angeles" -> "Los%20Angeles".
// For the state, use the state code.
// For example, "California" -> "ca".
// -------------------------------------------------
// Example API call:
// http://localhost:3001/api/weather?city=los%20angeles&state=ca
app.get('/api/weather', (request, response) => {
  const city = (request.query.city).toLowerCase();
  const state = (request.query.state).toLowerCase();
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${apiKey}`)
    .then(res => response.json(res.data));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
