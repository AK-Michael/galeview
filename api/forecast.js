export default async function handler(req, res) {
  const key = process.env.OPENWEATHER_API_KEY || process.env.VITE_API_KEY;

  if (!key) {
    return res.status(500).json({
      cod: 500,
      message: "Weather API key is not configured on the server.",
    });
  }

  const { q, lat, lon, units = "metric" } = req.query;

  let url;
  if (q) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(q)}&units=${units}&appid=${key}`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`;
  } else {
    return res.status(400).json({ cod: 400, message: "Missing location parameters." });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(502).json({ cod: 502, message: "Weather service unavailable." });
  }
}
