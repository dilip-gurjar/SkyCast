
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.send("Weather API is running ");
});


app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching weather data",
    });
  }
});


app.get("/forecast", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching forecast data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});