<template>
  <div>
    <h1 class="text-center">今日头条账号状态验证</h1>
    <div class="upload-file">
      <Upload @upload="handleData" />
      <el-button @click="handleCheckAllLink" type="primary" class="check-btn"
        >验证</el-button
      >
    </div>
    <div class="data">
      <Check :tableData="tableData" :loading="loading"></Check>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Home",
  components: {
    Upload: () => import("./Upload"),
    Check: () => import("./Check")
  },
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  methods: {
    handleData(data) {
      this.tableData = data.map(i => ({
        mediaName: i["账号名称"],
        link: i["案例"]
      }));
    },
    async handleCheckAllLink() {
      this.loading = true;
      const { data } = await axios({
        url: "http://localhost:3001/check",
        method: "POST",
        data: qs.stringify({ links: this.tableData }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      this.loading = false;
      if (data && data.code === "200") {
        this.tableData = data.data;
      } else {
        this.$message.error("未知错误");
      }
    }
  }
};
</script>

<style lang="css">
.text-center {
  text-align: center;
}

.upload-file {
  margin: 0 auto;
  width: 380px;
}

.check-btn {
  width: 100%;
  margin: 1em 0;
}
</style>
