<template>
  <el-upload
    class="upload-control"
    drag
    action="http://localhost:56688/upload"
    :before-upload="handleBeforeUpload"
    :on-success="handleUploadSuccess"
    :on-error="handleUploadError"
  >
    <i :class="uploading ? 'el-icon-loading' : 'el-icon-upload'"></i>
    <div class="el-upload__text">
      <p>将 csv 文件拖到此处，或<em>点击上传</em></p>
      <p>请按格式上传，账号链接不同格式查询结果不同！</p>
    </div>
  </el-upload>
</template>

<script>
import nanoid from "nanoid";
import { cutOffQuery } from "@/constant";

export default {
  name: "Upload",
  data() {
    return {
      uploading: false
    };
  },
  methods: {
    handleBeforeUpload(res) {
      this.uploading = true;
      return res.name.split(".").pop() === "csv";
    },
    handleUploadSuccess(res) {
      this.uploading = false;
      if (res.code && res.code === "200") {
        if (res.data.length) {
          const first = res.data[0];
          if (!first["账号"]) {
            this.$notify.error({
              title: "错误",
              type: "error",
              message: "文件中表头无 账号, 请尝试将csv转换为utf-8",
              position: "bottom-left"
            });
          } else if (!first["链接"]) {
            this.$notify.error({
              title: "错误",
              type: "error",
              message: "文件中表头无 链接, 请尝试将csv转换为utf-8",
              position: "bottom-left"
            });
          } else {
            this.$emit("uploaded", this.convertData(res.data));
            this.$notify.error({
              title: "成功",
              type: "success",
              message: "请检测数据，点击 爬取",
              position: "bottom-left"
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            type: "error",
            message: "空的文件，请重新上传",
            position: "bottom-left"
          });
        }
      } else {
        this.$notify.error({
          title: "错误",
          type: "error",
          message: "文件上传转换发生错误，请上传csv文件",
          position: "bottom-left"
        });
      }
    },
    handleUploadError(err) {
      this.uploading = false;
      console.log(err);
      this.$notify.error({
        title: "错误",
        type: "error",
        message: "文件上传发生错误，请再次尝试",
        position: "bottom-left"
      });
    },
    convertData(data) {
      const d = data.map(i => ({
        id: nanoid(),
        name: i["账号"],
        link: cutOffQuery(i["链接"])
      }));
      return d.filter(i => i.name && i.link);
    }
  }
};
</script>

<style lang="css">
.text-center {
  text-align: center;
}

.upload-control .el-upload {
  width: 100%;
}

.upload-control .el-upload-dragger {
  border-radius: 0;
  width: 100%;
  height: auto;
}

.el-upload-dragger .el-icon-loading {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
</style>
