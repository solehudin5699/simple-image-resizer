require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const resizer = require("./helper/resizer");
const uploadMiddleware = require("./helper/middleware");
const logger = require("./helper/logger");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//GET UI
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET/DOWNLOAD IMAGE
app.get("/public/:filename", resizer);

//UPLOAD IMAGE
app.post("/", uploadMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Success upload file",
    path: `public/${req.file?.filename}`,
  });
});

//RESIZE IMG FROM URL (query-> width,height,format,quality)
app.get("/image/resize/*", resizer);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
