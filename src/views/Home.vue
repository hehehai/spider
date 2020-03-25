<template>
  <div>
    <h1>今日头条账号状态验证</h1>
    <div class="upload-file">
      <Upload @upload="handleData" />
    </div>
    <el-button @click="handleCheckAllLink">验证</el-button>
    <div class="data">
      <Check :tableData="tableData"></Check>
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
      tableData: []
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
      const { data } = await axios({
        url: "http://localhost:3001/check",
        method: "POST",
        data: qs.stringify({ links: this.tableData }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (data && data.code === "200") {
        this.tableData = data.data;
      } else {
        this.$message.error("未知错误");
      }
    }
  }
};
</script>
