const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const spider = require("./spider");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
upload(app);
spider(app);

// 测试
app.get("/hello", (req, res) => {
  res.send("Good");
});

app.listen(56688);
