import React from "react";

import classes from "./WeatherDisplay.module.css";

const formatTime = (unix, timezone) =>
  new Date((unix + timezone) * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

const WeatherDisplay = ({ weatherData, unit, setUnit }) => {
  if (!weatherData) return null;

  const { weather, main, wind, sys, name, timezone } = weatherData;
  const condition = weather[0];
  const iconURL = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;
  const unitLabel = unit === "metric" ? "C" : "F";
  const windUnit = unit === "metric" ? "m/s" : "mph";
  const today = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      label: "Feels like",
      value: `${Math.round(main.feels_like)}°${unitLabel}`,
    },
    { label: "Humidity", value: `${main.humidity}%` },
    { label: "Wind", value: `${wind.speed} ${windUnit}` },
    { label: "Sunrise", value: formatTime(sys.sunrise, timezone) },
    { label: "Sunset", value: formatTime(sys.sunset, timezone) },
  ];

  return (
    <section className={classes.display} aria-label="Current weather">
      <div className={classes.topRow}>
        <div className={classes.location}>
          <h1 className={classes.city}>{name}</h1>
          <p className={classes.meta}>
            {sys.country && <span>{sys.country}</span>}
            <span>{today}</span>
          </p>
        </div>

        <div className={classes.unitToggle} role="group" aria-label="Temperature unit">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={unit === "metric" ? classes.active : ""}
            aria-pressed={unit === "metric"}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={unit === "imperial" ? classes.active : ""}
            aria-pressed={unit === "imperial"}
          >
            °F
          </button>
        </div>
      </div>

      <div className={classes.hero}>
        <div className={classes.tempBlock}>
          <p className={classes.temp}>
            {Math.round(main.temp)}
            <span className={classes.degree}>°{unitLabel}</span>
          </p>
          <p className={classes.condition}>{condition.description}</p>
        </div>

        <img
          src={iconURL}
          alt=""
          className={classes.icon}
          width={140}
          height={140}
        />
      </div>

      <ul className={classes.stats}>
        {stats.map((stat) => (
          <li key={stat.label} className={classes.stat}>
            <span className={classes.statLabel}>{stat.label}</span>
            <span className={classes.statValue}>{stat.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeatherDisplay;
