import React from "react";
import classes from "./ForecastDisplay.module.css";

const formatDay = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString([], { weekday: "short" });
};

const ForecastDisplay = ({ forecast, unit }) => {
  const unitLabel = unit === "metric" ? "C" : "F";

  return (
    <section className={classes.forecast} aria-label="3-day forecast">
      <h2 className={classes.heading}>Next 3 days</h2>

      <ul className={classes.list}>
        {forecast.map((day) => {
          const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          return (
            <li key={day.dt_txt} className={classes.card}>
              <span className={classes.day}>{formatDay(day.dt_txt)}</span>
              <img
                src={icon}
                alt=""
                className={classes.icon}
                width={48}
                height={48}
              />
              <span className={classes.temp}>
                {Math.round(day.main.temp)}°{unitLabel}
              </span>
              <span className={classes.desc}>{day.weather[0].description}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ForecastDisplay;
