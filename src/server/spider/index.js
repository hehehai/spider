const ttGet = require("./tt");
const wbGet = require("./wb");
const xhsGet = require("./xhs");
const { ipcMain } = require("electron");

ipcMain.on("demo-message", (event, data) => {
  console.log(data);
  // arg为接受到的消息
  event.reply("demo-reply", "pong"); // 返回一个'pong'
});

function progress(val, win) {
  win.webContents.send("progress-check", val);
}

function check(app, win) {
  app.post("/check", (req, res) => {
    let { links, platform } = req.body;
    links = JSON.parse(links);

    let checkedLinks = [];
    links.map(async i => {
      const result = await checkLink(i.link, platform);
      checkedLinks.push({
        ...i,
        status: result
      });
      // console.log(checkedLinks.length, links.length);
      progress(checkedLinks.length / links.length, win);
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
