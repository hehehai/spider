const fs = require("fs");

// 创建文件保存文件夹
exports.createFolder = folder => {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
