import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.location}</h2>
      <p><strong>Temperature:</strong> {weather.temperature}°C</p>
      <p><strong>Condition:</strong> {weather.condition}</p>
      <p><strong>Humidity:</strong> {weather.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weather.wind} km/h</p>
    </div>
  );
};

export default WeatherCard;
