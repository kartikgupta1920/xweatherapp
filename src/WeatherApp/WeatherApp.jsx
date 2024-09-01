import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '78ebfcca9a9e418486584029240109'; // Your actual API key

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true);
    setWeatherData(null);
    setError('');

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: city.trim(),
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data');
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input"
        />
        <button onClick={fetchWeatherData} className="button">
          Search
        </button>
      </div>
      {loading ? (
        <p className="loading">Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              <p>Temperature:</p>
              <h2>{weatherData.current.temp_c}°C</h2>
            </div>
            <div className="weather-card">
              <p>Humidity:</p>
              <h2>{weatherData.current.humidity}%</h2>
            </div>
            <div className="weather-card">
              <p>Condition:</p>
              <h2>{weatherData.current.condition.text}</h2>
            </div>
            <div className="weather-card">
              <p>Wind Speed:</p>
              <h2>{weatherData.current.wind_kph} kph</h2>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherApp;
