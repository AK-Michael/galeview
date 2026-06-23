import { useState, useCallback } from "react";

const filterForecast = (forecastData) =>
  forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

const useWeather = (API_KEY, unit) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherHandler = useCallback(
    async (city) => {
      setLoading(true);
      setError(null);
      setForecast([]);

      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
          ),
        ]);

        if (!currentRes.ok || !forecastRes.ok)
          throw new Error("Location not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        setWeatherData(currentData);
        setForecast(filterForecast(forecastData));
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, unit]
  );

  const fetchWeatherByCoords = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);
      setForecast([]);

      try {
        const [currentRes, forecastRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
          ),
        ]);

        if (!currentRes.ok || !forecastRes.ok)
          throw new Error("Failed to fetch weather for your location");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        setWeatherData(currentData);
        setForecast(filterForecast(forecastData));
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, unit]
  );

  return {
    weatherData,
    forecast,
    loading,
    error,
    setError,
    fetchWeatherHandler,
    fetchWeatherByCoords,
  };
};

export default useWeather;
