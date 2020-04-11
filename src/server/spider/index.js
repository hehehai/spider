const ttGet = require("./tt");
const wbGet = require("./wb");
const xhsGet = require("./xhs");

function check(app) {
  app.post("/check", (req, res) => {
    let { links, platform } = req.body;
    console.log(req.body);
    links = JSON.parse(links);

    let checkedLinks = [];
    links.map(async i => {
      const result = await checkLink(i.link, platform);
      checkedLinks.push({
        ...i,
        status: result
      });
      if (checkedLinks.length === links.length) {
        res.send({ code: "200", msg: "OK", data: checkedLinks });
      }
    });
  });
}

async function checkLink(link, platform) {
  switch (platform) {
    case "tt":
      return await ttGet(link);
    case "wb":
      return await wbGet(link);
    case "xhs":
      return await xhsGet(link);
  }
}

module.exports = check;
