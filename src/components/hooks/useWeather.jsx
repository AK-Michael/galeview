import { useState, useCallback } from "react";

const filterForecast = (forecastData) =>
  forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

const parseError = async (res, fallback) => {
  try {
    const data = await res.json();
    if (data?.message) return data.message;
  } catch {
    // response body was not JSON
  }

  if (res.status === 401) return "Weather API key is invalid or missing.";
  if (res.status === 404) return "Location not found.";
  return fallback;
};

const buildRequest = (endpoint, API_KEY, unit, location) => {
  const params = new URLSearchParams({ units: unit, ...location });

  if (import.meta.env.PROD) {
    return `/api/${endpoint}?${params}`;
  }

  params.set("appid", API_KEY);
  return `https://api.openweathermap.org/data/2.5/${endpoint}?${params}`;
};

const useWeather = (API_KEY, unit) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherHandler = useCallback(
    async (city) => {
      if (!import.meta.env.PROD && !API_KEY) {
        setError("Add VITE_API_KEY to your .env file for local development.");
        return;
      }

      setLoading(true);
      setError(null);
      setForecast([]);

      try {
        const location = { q: city };
        const [currentRes, forecastRes] = await Promise.all([
          fetch(buildRequest("weather", API_KEY, unit, location)),
          fetch(buildRequest("forecast", API_KEY, unit, location)),
        ]);

        if (!currentRes.ok) {
          throw new Error(
            await parseError(currentRes, "Location not found.")
          );
        }

        if (!forecastRes.ok) {
          throw new Error(
            await parseError(forecastRes, "Forecast unavailable for this location.")
          );
        }

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
      if (!import.meta.env.PROD && !API_KEY) {
        setError("Add VITE_API_KEY to your .env file for local development.");
        return;
      }

      setLoading(true);
      setError(null);
      setForecast([]);

      try {
        const location = { lat: String(lat), lon: String(lon) };
        const [currentRes, forecastRes] = await Promise.all([
          fetch(buildRequest("weather", API_KEY, unit, location)),
          fetch(buildRequest("forecast", API_KEY, unit, location)),
        ]);

        if (!currentRes.ok) {
          throw new Error(
            await parseError(currentRes, "Failed to fetch weather for your location.")
          );
        }

        if (!forecastRes.ok) {
          throw new Error(
            await parseError(forecastRes, "Forecast unavailable for your location.")
          );
        }

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
