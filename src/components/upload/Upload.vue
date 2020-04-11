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
            this.$message.error("文件中表头无 账号");
          } else if (!first["链接"]) {
            this.$message.error("文件中表头无 账号");
          } else {
            this.$emit("uploaded", this.convertData(res.data));
            this.$message.success("文件上传成功");
          }
        } else {
          this.$message.error("空的文件，请重新上传");
        }
      } else {
        console.log(this.$message);
        this.$message.error("文件上传转换发生错误，请上传csv文件");
      }
    },
    handleUploadError(err) {
      this.uploading = false;
      console.log(err);
      this.$message.error("文件上传发生错误，请再次尝试");
    },
    convertData(data) {
      return data.map(i => ({
        id: nanoid(),
        name: i["账号"],
        link: i["链接"]
      }));
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
