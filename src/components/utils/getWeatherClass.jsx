const getWeatherClass = (main) => {
  switch (main.toLowerCase()) {
    case "clear":
      return "weather-clear";
    case "clouds":
      return "weather-clouds";
    case "rain":
    case "drizzle":
      return "weather-rain";
    case "thunderstorm":
      return "weather-thunderstorm";
    case "snow":
      return "weather-snow";
    case "mist":
    case "fog":
    case "haze":
      return "weather-fog";
    default:
      return "weather-default";
  }
};

export default getWeatherClass;
