'use client'
import React, { useState, ChangeEvent } from 'react';
interface Location {
  name: string;
  country: string;
  lat: number;
  localtime: string;
  lon: number;
  region: string;
}

interface WeatherData {
  location: Location;
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: URL;
    };
  };
}

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData>({ location: {} as Location, current: {} as any });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=393709fbf1e14b5890b122151232310&q=${city}&aqi=no`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div
      style={{
        position: 'static',
        height: '100vh',
        backgroundImage: "url('https://littlevisuals.co/images/left.jpg')",
        backgroundSize: "cover"
      }}
    >
      <div className="container flex items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Weather App</h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Location"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              onChange={handleChange}
            />
            <button onClick={fetchWeather} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full">
              Get Weather
            </button>
          </div>

          <div className="container mt-4">
            {Object.keys(weather.location).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Weather Information for {weather.location.name}, {weather.location.country}</h3><br />
                <p>Temperature: {weather.current.temp_c}°C</p>
                <p>Condition: {weather.current.condition.text}</p>
                <p>Local Time: {weather.location.localtime}</p>
                <p>Latitude: {weather.location.lat}, Longitude: {weather.location.lon}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
