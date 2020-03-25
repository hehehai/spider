<template>
  <div>
    <h1>今日头条账号状态验证</h1>
    <div class="upload-file">
      <Upload @upload="handleData" />
    </div>
    <div class="data">
      <Check :tableData="tableData"></Check>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Upload: () => import("./Upload"),
    Check: () => import("./Check")
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleData(data) {
      this.tableData = data;
    }
  }
};
</script>
