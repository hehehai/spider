const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const spider = require("./spider");
const bodyParser = require("body-parser");

const app = express();
let win = null;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// 测试
app.get("/hello", (req, res) => {
  res.send("Good");
});

module.exports = function start(w) {
  win = w;
  upload(app);
  spider(app, win);
  app.listen(56688);
};
