import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Re-check authentication status on mount
  useEffect(() => {
    console.log("Is authenticated:", isAuthenticated); // Debug log to check status
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const fetchWeather = async (location) => {
    try {
      setError(""); // Clear previous error
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
    <Router>
      <div className="app">
        <h1>Weather Forecast</h1>
        {isAuthenticated && <SearchBar onSearch={fetchWeather} />}
        
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  {error && <ErrorMessage message={error} />}
                  {weather && <WeatherCard weather={weather} />}
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/signup"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
