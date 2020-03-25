<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:3001/upload"
      :on-success="handleFileUploadSuccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
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
