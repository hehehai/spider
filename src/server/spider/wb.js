const Crawler = require("crawler");

const spider = new Crawler({
  maxConnections: 10, // 最大同时链接
  rateLimit: 20 // 请求间隔，
  // rotateUA: true,
  // userAgent: userAgents
});

const empty = {
  name: '', // 用户名
  verified: '', // 验证
  verified_type: '',
  verified_type_ext: '',
  close_blue_v: '',
  fans: '' // 粉丝
};

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
};

const spiderLink = "https://m.weibo.cn/profile/info?uid=";

function getAuthInfo(user) {
  return {
    name: user.screen_name, // 用户名
    verified: user.verified, // 验证
    verified_type: user.verified_type,
    verified_type_ext: user.verified_type_ext,
    close_blue_v: user.close_blue_v,
    fans: user.followers_count // 粉丝
  };
}

// 请求
module.exports = async function get(link) {
  const oid = await getOid(link);
  return new Promise((resolve) => {
    if (!oid) {
      resolve(empty)
    }
    spider.queue([
      {
        uri: `${spiderLink}${oid}`,
        headers,
        // The global callback won't be called
        callback: function(error, res, done) {
          if (error) {
            console.log(error);
            resolve(empty);
          } else {
            const resData = JSON.parse(res.body);
            if (resData.data.user.id) {
              resolve(getAuthInfo(resData.data.user));
            } else {
              console.log("微博用户信息未找到");
              resolve(empty);
            }
          }
          done();
        }
      }
    ]);
  });
};

const oidHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
  Cookie:
    "SINAGLOBAL=7064607025912.872.1575984739122; _s_tentry=-; Apache=5258557859710.022.1586231605235; ULV=1586231605255:13:1:1:5258557859710.022.1586231605235:1585205901549; YF-V5-G0=f5a079faba115a1547149ae0d48383dc; UOR=,,www.baidu.com; SCF=Ai8_WqUmdVKu0Lfcu3M_x6N-s_B-dymSsdmmb_z27RKw7uSrAiCyYF3xxCE5dKZGVzREQswETlZTzd4FStEzYBc.; SUHB=0TPV5qiSkhDTSQ; ALF=1586937319; SSOLoginState=1586332523; wb_view_log_5253842024=1920*12002; webim_unReadCount=%7B%22time%22%3A1586410309464%2C%22dm_pub_total%22%3A16%2C%22chat_group_client%22%3A0%2C%22chat_group_notice%22%3A0%2C%22allcountNum%22%3A2%2C%22msgbox%22%3A2%7D; SUB=_2AkMp0mhMf8NxqwJRmP4UxWLja4h-yQrEieKfjpmXJRMxHRl-yT_nqmUhtRB6AlJGpB9u16VmSsEGbPVJPHOMgRDyUype; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9W51wzcUf5eYOmujbkQQ4Okb; YF-Page-G0=20a0c65c6e2ee949c1f78305a122073b|1586424247|1586424103"
};

function getOid(link) {
  const oidRex = /\['oid'\]='\d+'/;
  return new Promise((resolve, reject) => {
    spider.queue({
      uri: link,
      headers: oidHeaders,
      callback: (error, res, done) => {
        if (error) {
          console.log(error);
        } else {
          const body = res.body;
          if (body) {
            const oidData = body.match(oidRex)[0];
            if (oidData.length) {
              resolve(oidData.match(/\d+/)[0]);
            } else {
              console.log("oid 未找到");
              reject(false);
            }
          } else {
            console.log("获取内容失败");
            reject(false);
          }
        }
        done();
      }
    });
  });
}
