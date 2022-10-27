# weather-microservice

## Run locally
- Install depedencies: `npm install`
- Run microservice: `npm start`

## Request
- Request weather data via the `/api/weather` endpoint using URL query params.
  - User enters `city` and `state`.
- Template: `http://localhost:3001/api/weather?city={city}&state={state}`
- Example: `http://localhost:3001/api/weather?city=los%20angeles&state=ca`

*Note*:
1. City and state are *not* case-sensitive.
2. If there is a space in the name, URL encode it to `%20` (like the example above).
3. States should be represented as their two letter abreviations (i.e. state code).

## Response
- You will get back JSON data as a response.
- Example response:

```json
{
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "temperature": 297.11,
  "humidity": 44,
  "condition": "clear sky",
  "pressure": 1017
}
```
