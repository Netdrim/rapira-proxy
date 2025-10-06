import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const rapiraResponse = await fetch("https://api.rapira.net/open/market/rates", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*"
      }
    });
    const data = await rapiraResponse.text();
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка загрузки Rapira API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
