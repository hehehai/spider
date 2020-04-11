const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const spider = require("./spider");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
upload(app);

// 测试
app.get("/hello", (req, res) => {
  res.send("Good");
});

app.post("/check", (req, res) => {
  const { links } = req.body;
  let checkedLinks = [];
  links.map(async link => {
    const result = await checkLink(link);
    checkedLinks.push({
      ...link,
      status: result
    });
    if (checkedLinks.length === links.length) {
      res.send({ code: "200", msg: "OK", data: checkedLinks });
    }
  });
});

async function checkLink({ link }) {
  let result = null;
  if (!/https:\/\/www\.toutiao\.com\/c\/user\/.+/gim.test(link)) {
    result = "unknown";
  } else {
    result = await spider(link);
  }
  return result;
}

app.listen(56688);
