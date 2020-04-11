const multer = require("multer");
const path = require("path");
const csvToJson = require("csv-file-to-json");
const { createFolder } = require("./utils");

const uploadFolder = "./_upload/";

createFolder(uploadFolder);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
  },
  filename: function(req, file, cb) {
    console.log(file);
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({ storage: storage });

module.exports = function(app) {
  app.post("/upload", upload.single("file"), function(req, res) {
    var file = req.file;

    console.log("文件类型：%s", file.mimetype);
    console.log("原始文件名：%s", file.originalname);
    console.log("文件大小：%s", file.size);
    console.log("文件保存路径：%s", file.path);

    // 转换为json数据，忽略表头
    const dataInJSON = csvToJson({ filePath: file.path, hasHeader: true });

    res.send({ code: "200", msg: "OK", data: dataInJSON });
  });
};
