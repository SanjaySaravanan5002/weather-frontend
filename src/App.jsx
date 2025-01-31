import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (location) => {
    try {
      setError(""); // Clear any previous error
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=83abef37e54a735deb45778cf8f059c8&units=metric`
      );
      if (!response.ok) throw new Error("Location not found!");
  
      const data = await response.json();
      setWeather({
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
