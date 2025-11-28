require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/api/plants", (req, res) => {
  const url = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}`;

  https.get(url, (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (err) {
        res.status(500).json({ error: "Failed to parse API data" });
      }
    });

  }).on("error", (err) => {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch plant data" });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
