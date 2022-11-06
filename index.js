const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const apiKey = 'a2813bf7a97824733c620ca3696826b4';

// If there is a 'space' in the name, use URL encoding of 'space', which is %20.
// For example, "Los Angeles" -> "Los%20Angeles".
// For the state, use the state code.
// For example, "California" -> "ca".
// -------------------------------------------------
// Example API call:
// http://localhost:3001/api/weather?city=los%20angeles&state=ca
app.get('/api/weather', async (request, response) => {
  const city = (request.query.city).toLowerCase();
  const state = (request.query.state).toLowerCase();
  const returnedWeatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=${apiKey}`);
  
  const actualResponse = {};
  actualResponse['city'] = returnedWeatherData.data.name;
  actualResponse['state'] = state.toUpperCase();
  actualResponse['country'] = returnedWeatherData.data.sys.country;
  actualResponse['temperature'] = returnedWeatherData.data.main.temp;
  actualResponse['humidity'] = returnedWeatherData.data.main.humidity;
  actualResponse['condition'] = returnedWeatherData.data.weather[0].description;
  actualResponse['pressure'] = returnedWeatherData.data.main.pressure;

  response.json(actualResponse);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Microservice running on port ${PORT}`);
});
