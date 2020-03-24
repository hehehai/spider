<template>
  <div>
    <h1>今日头条账号状态验证</h1>
    <div class="upload-file">
      <Upload></Upload>
    </div>
    <div class="data">
      <Check></Check>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Upload: () => import("./Upload"),
    Check: () => import("./Check")
  }
};
</script>
