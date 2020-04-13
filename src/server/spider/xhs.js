const Crawler = require("crawler");

const spider = new Crawler({
  maxConnections: 10, // 最大同时链接
  rateLimit: 20 // 请求间隔，
  // rotateUA: true,
  // userAgent: userAgents
});

const headers = {
  Cookie:
    "xhsTracker=url=user-profile&xhsshare=CopyLink; xhsTrackerId=e2093deb-cc4f-410f-c1d2-525461d85d07; xhs_eaglet_domain_user_id=a7f41ba6-0c18-42f5-8859-a06f9c53c134; timestamp1=2900343109; hasaki=JTVCJTIyTW96aWxsYSUyRjUuMCUyMChNYWNpbnRvc2glM0IlMjBJbnRlbCUyME1hYyUyME9TJTIwWCUyMDEwXzE1XzQpJTIwQXBwbGVXZWJLaXQlMkY1MzcuMzYlMjAoS0hUTUwlMkMlMjBsaWtlJTIwR2Vja28pJTIwQ2hyb21lJTJGODAuMC4zOTg3LjE0OSUyMFNhZmFyaSUyRjUzNy4zNiUyMiUyQyUyMnpoLUNOJTIyJTJDMjQlMkMtNDgwJTJDdHJ1ZSUyQ3RydWUlMkN0cnVlJTJDJTIydW5kZWZpbmVkJTIyJTJDJTIyZnVuY3Rpb24lMjIlMkNudWxsJTJDJTIyTWFjSW50ZWwlMjIlMkMxNiUyQzglMkMlMjIxJTIyJTJDJTIyQ2hyb21lJTIwUERGJTIwUGx1Z2luJTNBJTNBUG9ydGFibGUlMjBEb2N1bWVudCUyMEZvcm1hdCUzQSUzQWFwcGxpY2F0aW9uJTJGeC1nb29nbGUtY2hyb21lLXBkZn5wZGYlM0JDaHJvbWUlMjBQREYlMjBWaWV3ZXIlM0ElM0ElM0ElM0FhcHBsaWNhdGlvbiUyRnBkZn5wZGYlM0JOYXRpdmUlMjBDbGllbnQlM0ElM0ElM0ElM0FhcHBsaWNhdGlvbiUyRngtbmFjbH4lMkNhcHBsaWNhdGlvbiUyRngtcG5hY2x+JTJDYXBwbGljYXRpb24lMkZ4LXBwYXBpLXZ5c29yfiUyQ2FwcGxpY2F0aW9uJTJGeC1wcGFwaS12eXNvci1hdWRpb34lMjIlMkMzMTc5MTkxNTI1JTVE; timestamp2=bd8ee3d55437e227659bf9c1b71e083e; xhs_spses.5dde=*; extra_exp_ids=gif_exp1; xhs_spid.5dde=496d65bf992f5ecf.1586231636.2.1586339407.1586231651.cfa5f200-5039-4082-b9a5-71ce5c4bacea",
  Referer: this.url,
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
  Accept: "image/webp,image/apng,image/*,*/*;q=0.8"
};

function getAuthorInfo(authorEl, $) {
  let name = authorEl.find(".user-name .name-detail").text();
  let infos = [];
  authorEl.find(".card-info .info-number").each((_, i) => {
    infos.push(
      $(i)
        .eq(0)
        .text()
    );
  });
  return {
    name, // 用户名
    sub: infos[0], // 关注
    fans: infos[1], //粉丝
    likeAndMark: infos[2] // 喜欢及收藏
  };
}

// 请求
module.exports = function get(link) {
  return new Promise((resolve, reject) => {
    spider.queue([
      {
        uri: link,
        headers,
        // The global callback won't be called
        callback: function(error, res, done) {
          if (error) {
            console.log(error);
            reject(false);
          } else {
            const $ = res.$;
            const authorEl = $(".user-container");
            if (authorEl) {
              const authoInfo = getAuthorInfo(authorEl, $);
              resolve(authoInfo);
            } else {
              console.log("小红书爬取，为找到作者");
              reject(false);
            }
          }
          done();
        }
      }
    ]);
  });
};
