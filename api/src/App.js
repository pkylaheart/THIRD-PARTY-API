import React, { useState } from "react"; 
// Import React and useState hook
// useState lets your app "remember" values (state)

function App() {

  // STATE VARIABLES (memory of the app)

  const [city, setCity] = useState(""); 
  // city = stores what user types
  // setCity = function to update it
  // "" = initial value (empty)

  const [weather, setWeather] = useState(null); 
  // weather = stores API response (weather data)
  // starts as null (no data yet)

  const [error, setError] = useState(""); 
  // error = stores error messages (if something goes wrong)

  const API_KEY = "e2c9eb509823b62d7f20fdf9ed11e978"; 
  // Your OpenWeather API key (used to access their data)

  // FUNCTION TO GET WEATHER DATA
  const getWeather = async () => {
    try {
      setError(""); 
      // Clear previous errors before making new request

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      // fetch() = sends request to API
      // await = wait until API responds
      // q=${city} = city entered by user
      // appid = your API key
      // units=metric = Celsius

      if (!response.ok) {
        // If API response is NOT successful (e.g. wrong city)
        throw new Error("City not found");
      }

      const data = await response.json();
      // Convert response into usable JSON data

      setWeather(data);
      // Save weather data into state → triggers UI update

    } catch (err) {
      // If ANY error happens (network, wrong city, etc.)

      setError(err.message);
      // Show error message on screen

      setWeather(null);
      // Clear previous weather data
    }
  };

  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        // Input value is linked to state (city)

        onChange={(e) => setCity(e.target.value)}
        // When user types:
        // e.target.value = current text
        // setCity updates the state
      />

      <button onClick={getWeather}>
        Get Weather
      </button>
      {/* When button is clicked → run getWeather() */}

      {error && <p>{error}</p>}
      {/* If error exists → display it */}

      {weather && (
        <div>
          {/* Only show this if weather data exists */}

          <h2>{weather.name}</h2>
          {/* City name */}

          <p>Temperature: {weather.main.temp} °C</p>
          {/* Temperature from API */}

          <p>Condition: {weather.weather[0].description}</p>
          {/* Weather description (e.g. cloudy, sunny) */}
        </div>
      )}
    </div>
  );
}

export default App;
// Export component so React can use it