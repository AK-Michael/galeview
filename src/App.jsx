import React, { useState, useEffect, useRef, Suspense, lazy } from "react";

import "./App.css";

import Header from "./components/features/Header";
import WeatherDisplay from "./components/features/WeatherDisplay";
import ForecastDisplay from "./components/features/ForecastDisplay";

import getWeatherClass from "./components/utils/getWeatherClass";
import useWeather from "./components/hooks/useWeather";
import useGeolocation from "./components/hooks/useGeolocation";

import Spinner from "./components/UI/Spinner";

const MapDisplay = lazy(() => import("./components/features/MapDisplay"));

const App = () => {
  const [unit, setUnit] = useState("metric");
  const hasAutoFetched = useRef(false);
  const prevUnitRef = useRef(unit);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const {
    weatherData,
    forecast,
    loading,
    error,
    setError,
    fetchWeatherHandler,
    fetchWeatherByCoords,
  } = useWeather(API_KEY, unit);

  useGeolocation(
    (pos) => {
      if (!hasAutoFetched.current) {
        hasAutoFetched.current = true;
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      }
    },
    (msg) => setError(msg)
  );

  useEffect(() => {
    if (prevUnitRef.current === unit) return;
    prevUnitRef.current = unit;
    if (weatherData?.name) {
      fetchWeatherHandler(weatherData.name);
    }
  }, [unit, weatherData, fetchWeatherHandler]);

  const weatherClass = weatherData
    ? getWeatherClass(weatherData.weather[0].main)
    : "weather-default";

  return (
    <div className={`app ${weatherClass}`}>
      <Header onFetchWeather={fetchWeatherHandler} />

      <main className="main">
        {loading && <Spinner />}
        {error && <p className="error">{error}</p>}

        {!loading && !error && weatherData && (
          <div className="contentGrid">
            <WeatherDisplay
              key={weatherData.name}
              weatherData={weatherData}
              unit={unit}
              setUnit={setUnit}
            />

            <div className="lowerSection">
              {forecast.length > 0 && (
                <ForecastDisplay forecast={forecast} unit={unit} key={unit} />
              )}

              <Suspense fallback={<Spinner fullscreen={false} />}>
                <MapDisplay
                  lat={weatherData.coord.lat}
                  lon={weatherData.coord.lon}
                  city={weatherData.name}
                />
              </Suspense>
            </div>
          </div>
        )}

        {!loading && !error && !weatherData && (
          <div className="emptyState">
            <h2>Where to?</h2>
            <p>Search a city above, or allow location access to see local conditions.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
