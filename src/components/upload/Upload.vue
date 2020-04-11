<template>
  <el-upload
    class="upload-control"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
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
      console.log(res);
    },
    handleUploadError(err) {
      this.uploading = false;
      console.log(err);
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
