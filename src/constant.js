export const platformType = {
  tt: "今日头条",
  wb: "微博",
  xhs: "小红书"
};

export const isTTLink = (link = "") => {
  return /https:\/\/www\.toutiao\.com\/c\/user\/.+/i.test(link.trim());
};

export const isWBLink = (link = "") => {
  return /weibo\.com/i.test(link.trim());
};

export const isXHSLink = (link = "") => {
  return /xiaohongshu\.com/i.test(link.trim());
};

export const cutOffQuery = (link = "") => {
  if (link.indexOf("?") !== -1) {
    return link.split("?").shift();
  }
  return link;
};
