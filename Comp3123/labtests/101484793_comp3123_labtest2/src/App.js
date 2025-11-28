import React, { useState } from 'react';
import { Wind, Droplets, Eye, Gauge, MapPin, Search, Sunrise, Sunset } from 'lucide-react';

// Sample weather data from the provided JSON
const sampleWeatherData = {
  "coord": { "lon": -79.42, "lat": 43.7 },
  "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }],
  "base": "stations",
  "main": {
    "temp": 279.11,
    "feels_like": 275.64,
    "temp_min": 278.15,
    "temp_max": 280.15,
    "pressure": 1021,
    "humidity": 65,
    "sea_level": 1021,
    "grnd_level": 1001
  },
  "visibility": 10000,
  "wind": { "speed": 2.1, "deg": 163 },
  "clouds": { "all": 5 },
  "dt": 1605226867,
  "sys": { "type": 1, "id": 718, "country": "CA", "sunrise": 1605182924, "sunset": 1605218115 },
  "timezone": -18000,
  "id": 6167865,
  "name": "Toronto",
  "cod": 200
};

// Additional sample cities for search functionality
const cityData = {
  "Toronto": sampleWeatherData,
  "Vancouver": {
    "coord": { "lon": -123.12, "lat": 49.25 },
    "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
    "base": "stations",
    "main": {
      "temp": 283.15,
      "feels_like": 280.5,
      "temp_min": 282.15,
      "temp_max": 284.15,
      "pressure": 1015,
      "humidity": 85,
      "sea_level": 1015,
      "grnd_level": 1000
    },
    "visibility": 8000,
    "wind": { "speed": 5.5, "deg": 270 },
    "clouds": { "all": 75 },
    "dt": 1605226867,
    "sys": { "type": 1, "id": 719, "country": "CA", "sunrise": 1605182924, "sunset": 1605218115 },
    "timezone": -18000,
    "id": 6173331,
    "name": "Vancouver",
    "cod": 200
  },
  "Montreal": {
    "coord": { "lon": -73.59, "lat": 45.51 },
    "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }],
    "base": "stations",
    "main": {
      "temp": 277.15,
      "feels_like": 273.5,
      "temp_min": 276.15,
      "temp_max": 278.15,
      "pressure": 1018,
      "humidity": 70,
      "sea_level": 1018,
      "grnd_level": 1005
    },
    "visibility": 9000,
    "wind": { "speed": 3.2, "deg": 90 },
    "clouds": { "all": 60 },
    "dt": 1605226867,
    "sys": { "type": 1, "id": 720, "country": "CA", "sunrise": 1605182924, "sunset": 1605218115 },
    "timezone": -18000,
    "id": 6077243,
    "name": "Montreal",
    "cod": 200
  },
  "Calgary": {
    "coord": { "lon": -114.09, "lat": 51.05 },
    "weather": [{ "id": 600, "main": "Snow", "description": "light snow", "icon": "13d" }],
    "base": "stations",
    "main": {
      "temp": 268.15,
      "feels_like": 263.5,
      "temp_min": 267.15,
      "temp_max": 269.15,
      "pressure": 1020,
      "humidity": 90,
      "sea_level": 1020,
      "grnd_level": 1008
    },
    "visibility": 5000,
    "wind": { "speed": 6.0, "deg": 315 },
    "clouds": { "all": 90 },
    "dt": 1605226867,
    "sys": { "type": 1, "id": 721, "country": "CA", "sunrise": 1605182924, "sunset": 1605218115 },
    "timezone": -18000,
    "id": 5913490,
    "name": "Calgary",
    "cod": 200
  }
};

const WeatherApp = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(sampleWeatherData);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    const city = searchInput.trim();
    if (!city) return;

    const foundCity = cityData[city];
    if (foundCity) {
      setWeatherData(foundCity);
      setError(null);
    } else {
      setError(`City "${city}" not found. Try: Toronto, Vancouver, Montreal, or Calgary`);
    }
    setSearchInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getBackgroundGradient = (main) => {
    const gradients = {
      Clear: 'from-blue-400 to-blue-600',
      Clouds: 'from-gray-400 to-gray-600',
      Rain: 'from-gray-600 to-blue-800',
      Drizzle: 'from-gray-500 to-blue-600',
      Thunderstorm: 'from-gray-700 to-purple-900',
      Snow: 'from-blue-200 to-blue-400',
      Mist: 'from-gray-400 to-gray-500'
    };
    return gradients[main] || 'from-blue-400 to-blue-600';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weatherData.weather[0].main)} flex items-center justify-center p-4`}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-white text-opacity-90">Real-time weather information</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Try: Toronto, Vancouver, Montreal, Calgary"
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-lg border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-200 flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-md border border-red-300 text-white p-4 rounded-lg text-center max-w-md mx-auto mb-6">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weatherData && (
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
            {/* Main Weather Info */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="text-white" size={24} />
                <h2 className="text-4xl font-bold text-white">
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
              </div>

              <div className="flex items-center justify-center mb-4">
                <img
                  src={getWeatherIcon(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                  className="w-32 h-32"
                />
              </div>

              <div className="text-7xl font-bold text-white mb-2">
                {kelvinToCelsius(weatherData.main.temp)}°C
              </div>

              <div className="text-2xl text-white capitalize mb-2">
                {weatherData.weather[0].description}
              </div>

              <div className="text-white text-opacity-80">
                Feels like {kelvinToCelsius(weatherData.main.feels_like)}°C
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="text-white" size={20} />
                  <span className="text-white text-opacity-80 text-sm">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {weatherData.wind.speed} m/s
                </div>
                <div className="text-sm text-white text-opacity-70">
                  {weatherData.wind.deg}°
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="text-white" size={20} />
                  <span className="text-white text-opacity-80 text-sm">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {weatherData.main.humidity}%
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="text-white" size={20} />
                  <span className="text-white text-opacity-80 text-sm">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {weatherData.main.pressure} hPa
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="text-white" size={20} />
                  <span className="text-white text-opacity-80 text-sm">Visibility</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-white text-opacity-80 text-sm mb-1">Min Temp</div>
                <div className="text-xl font-bold text-white">
                  {kelvinToCelsius(weatherData.main.temp_min)}°C
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="text-white text-opacity-80 text-sm mb-1">Max Temp</div>
                <div className="text-xl font-bold text-white">
                  {kelvinToCelsius(weatherData.main.temp_max)}°C
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Sunrise className="text-white" size={16} />
                  <div className="text-white text-opacity-80 text-sm">Sunrise</div>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatTime(weatherData.sys.sunrise)}
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Sunset className="text-white" size={16} />
                  <div className="text-white text-opacity-80 text-sm">Sunset</div>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatTime(weatherData.sys.sunset)}
                </div>
              </div>
            </div>

            {/* Cords */}
            <div className="mt-6 text-center text-white text-opacity-70 text-sm">
              <p>Coordinates: {weatherData.coord.lat}°N, {Math.abs(weatherData.coord.lon)}°W</p>
              <p className="mt-1">Cloud Coverage: {weatherData.clouds.all}%</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white text-opacity-70 text-sm">
          <p>COMP3123 - Full Stack Development I - Lab Test 2</p>
          <p className="mt-1">Weather data from provided JSON sample</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;