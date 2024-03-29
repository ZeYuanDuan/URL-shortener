const express = require("express");
const fs = require("fs");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/shorten", (req, res) => {
  const originalUrl = req.body.url;
  const urlsData = readUrlsFromJsonFile();

  // Check if the URL is already shortened
  const existingShortUrl = findExistingShortUrl(urlsData, originalUrl);
  if (existingShortUrl) {
    return res.status(200).json({ shortUrl: existingShortUrl });
  }

  // URL is new, generate a short code and store it
  const shortCode = generateShortCode();
  urlsData.urls[shortCode] = originalUrl;
  writeUrlsToJsonFile(urlsData);

  res.status(201).json({ shortUrl: `https://your-domain.com/${shortCode}` });
});

const FILE_PATH = "./public/urls.json";

function readUrlsFromJsonFile() {
  if (!fs.existsSync(FILE_PATH)) {
    return { urls: {} };
  }
  const urlsJson = fs.readFileSync(FILE_PATH);
  return JSON.parse(urlsJson);
}

function writeUrlsToJsonFile(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

function findExistingShortUrl(urlsData, originalUrl) {
  const existingEntry = Object.entries(urlsData.urls).find(
    (entry) => entry[1] === originalUrl
  );
  return existingEntry ? `https://your-domain.com/${existingEntry[0]}` : null;
}

function generateShortCode() {
  // Generates a 6-character random alphanumeric string
  return Math.random().toString(36).substring(2, 7);
}

app.get("/", (req, res) => {
  res.render("index", { layout: "main" });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
