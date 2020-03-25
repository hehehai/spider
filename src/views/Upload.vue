<template>
  <div>
    <el-upload
      class="upload"
      drag
      action="http://localhost:3001/upload"
      :on-success="handleFileUploadSuccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Upload",
  methods: {
    handleFileUploadSuccess(res) {
      if (res && res.code === "200") {
        this.$message.success(res.msg);
        this.$emit("upload", res.data || []);
      }
    }
  }
};
</script>

<style lang="css">
.upload {
  width: 100%;
}

.upload .el-upload {
  width: 100%;
}

.upload .el-upload-dragger {
  width: 100%;
}
</style>
