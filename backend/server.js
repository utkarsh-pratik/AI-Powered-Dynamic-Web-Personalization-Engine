const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "analytics.json";
let analytics = [];
if (fs.existsSync(DATA_FILE)) {
  analytics = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

app.post("/api/analytics", (req, res) => {
  analytics.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(analytics, null, 2));
  res.json({ status: "ok" });
});

app.get("/api/analytics", (req, res) => {
  res.json(analytics);
});

app.listen(PORT, () => {
  console.log(`Analytics server running at http://localhost:${PORT}`);
});