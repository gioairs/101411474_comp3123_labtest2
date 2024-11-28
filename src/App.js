import React, { useState, useEffect } from "react";
import { getWeatherByCity } from "./services/weatherService";
import "./App.css";

const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [numericDate, setNumericDate] = useState("");

    useEffect(() => {
        const currentDate = new Date();
        
        const formatted = currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        const numeric = currentDate.toLocaleDateString("en-US");

        setFormattedDate(formatted);
        setNumericDate(numeric);
    }, []); 

    const fetchWeather = async () => {
        setError("");
        try {
            const data = await getWeatherByCity(city);
            setWeather(data);
        } catch (err) {
            setError("Unable to fetch weather data. Please try again.");
        }
    };

    return (
        <div className="app">
            <h1 className="title">Weather Forecast</h1>
            <p className="date">{formattedDate}</p> {}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") fetchWeather();
                    }}
                />
                <button onClick={fetchWeather}>Search</button>
            </div>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-card">
                    <div className="left-section">
                        <h2>{weather.name}</h2>
                        <p className="temperature">{weather.main.temp}°C</p>
                        <p className="condition">{weather.weather[0].description}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                        />
                    </div>
                    <div className="right-section">
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind: {weather.wind.speed} m/s</p>
                        <p>Pressure: {weather.main.pressure} hPa</p>
                        <p>Max Temp: {weather.main.temp_max}°C</p>
                        <p>Min Temp: {weather.main.temp_min}°C</p>
                    </div>
                </div>
            )}
            <p className="numeric-date">{numericDate}</p> {}
        </div>
    );
};

export default App;
