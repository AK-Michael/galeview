# Galeview

A weather app built with React and Vite. Search any city, use your current location, and get current conditions, a three-day forecast, and a map for where you're looking.

## What it does

- City search and browser geolocation
- Current weather with °C / °F toggle
- Three-day forecast (noon snapshots from the OpenWeatherMap 5-day feed)
- Interactive map centered on the result (Leaflet + OpenStreetMap)
- Background changes with conditions
- Installable PWA with cached weather icons

## Stack

- React 19, Vite 6
- OpenWeatherMap API
- Leaflet / react-leaflet
- vite-plugin-pwa

## Run locally

```bash
npm install
```

Add a `.env` file in the project root:

```
VITE_API_KEY=your_openweathermap_api_key
```

Free keys are available at [openweathermap.org/api](https://openweathermap.org/api).

```bash
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |
| `npm run icons` | Regenerate PWA icons from `public/icon.svg` |

## License

Personal portfolio project.
