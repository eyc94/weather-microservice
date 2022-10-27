const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const apiKey = 'somekey';

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
  console.log(`Server running on port ${PORT}`);
});