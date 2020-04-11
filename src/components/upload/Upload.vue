<template>
  <el-upload
    class="upload-control"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      <p>将 csv 文件拖到此处，或<em>点击上传</em></p>
      <p>请按格式上传，账号链接不同格式查询结果不同！</p>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: "Upload"
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
</style>
