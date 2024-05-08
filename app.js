const express = require("express");
const fs = require("fs");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

const FILE_PATH = "./public/jsons/urls.json";
const URL_DOMAIN = "https://shorty.herokuapp.com/";

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============== Routers ===============

app.get("/", (req, res) => {
  res.render("index", { layout: "main" });
});

app.post("/shorten", (req, res) => {
  const originalUrl = req.body.url;
  const urlsData = readUrlsFromJsonFile();

  const existingShortUrl = findExistingShortUrl(urlsData, originalUrl);
  if (existingShortUrl) {
    return res.status(200).json({ shortUrl: existingShortUrl });
  }

  const shortCode = generateShortCode();
  urlsData.urls[shortCode] = originalUrl;
  writeUrlsToJsonFile(urlsData);

  res.status(201).json({ shortUrl: URL_DOMAIN + shortCode });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});

// =============== Helpers ===============

function readUrlsFromJsonFile() {
  if (!fs.existsSync(FILE_PATH)) {
    return { urls: {} };
  }
  const urlsJson = fs.readFileSync(FILE_PATH);
  return JSON.parse(urlsJson);
}

function findExistingShortUrl(urlsData, originalUrl) {
  const existingEntry = Object.entries(urlsData.urls).find(
    (entry) => entry[1] === originalUrl
  );
  return existingEntry ? `https://your-domain.com/${existingEntry[0]}` : null;
}

function generateShortCode() {
  return Math.random().toString(36).substring(2, 7);
}

function writeUrlsToJsonFile(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}
