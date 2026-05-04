import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log("API KEY:", API_KEY);
  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      // Handle rate limit
      if (response.status === 429) {
        throw new Error("Too many requests. Try again later.");
      }

      // Handle invalid city
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌦️ Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />

      <br /><br />

      <button onClick={getWeather} style={{ padding: "10px 20px" }}>
        Get Weather
      </button>

      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>🌡 Temperature: {weather.main.temp} °C</p>
            <p>🌥 Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
