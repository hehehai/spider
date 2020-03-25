const Crawler = require("crawler");

const spider = new Crawler({
  maxConnections: 10, // 最大同时链接
  rateLimit: 20 // 请求间隔，
  // rotateUA: true,
  // userAgent: userAgents
});

// const status = {
//   unknown: "未知",
//   normal: "正常",
//   banded: "封禁",
//   error: "错误"
// };

// 请求
module.exports = function get(link) {
  return new Promise(resolve => {
    spider.queue([
      {
        uri: link,
        // The global callback won't be called
        callback: function(error, res, done) {
          if (error) {
            console.log(error, $("body").text());
            resolve("error");
          } else {
            var $ = res.$;
            if (!$) {
              console.log("err parse", res);
              resolve("error");
              done();
            } else {
              // $默认使用Cheerio
              // 这是为服务端设计的轻量级jQuery核心实现
              const bandStr = $("body")
                .text()
                .match(/isBanned: (true|false),/gim);
              if (bandStr && bandStr.length && bandStr[0]) {
                const isBanned =
                  bandStr[0].indexOf("true") !== -1 ? "banded" : "normal";
                resolve(isBanned);
              }
            }
            done();
          }
        }
      }
    ]);
  });
};
