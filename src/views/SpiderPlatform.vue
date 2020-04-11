<template>
  <div class="spider-page" v-loading="loading">
    <div class="header">
      <BackHeader :label="currentPlatformLabel" />
      <div class="control">
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="isFileUploadModel = true"
          >上传文档</el-button
        >
        <el-button
          type="success"
          icon="el-icon-toilet-paper"
          @click="handleCatchLinks"
          >抓取</el-button
        >
        <el-button icon="el-icon-truck">导出数据</el-button>
      </div>
    </div>
    <div class="wrap">
      <div class="statistics">
        <div class="statistics-card"></div>
      </div>
      <div class="table-data">
        <TableData
          :table-data="tableData"
          :platform="currentPlatform"
        ></TableData>
      </div>
    </div>
    <FileUpload
      :is-show.sync="isFileUploadModel"
      :platform="currentPlatform"
      :label="currentPlatformLabel"
      @uploaded="handleUploadSuccess"
    />
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import BackHeader from "@/components/BackHeader";
import FileUpload from "@/components/upload/FileUpload";
import { platformType } from "@/constant";

export default {
  name: "SpiderPlatform",
  components: {
    BackHeader,
    FileUpload,
    TableData: () => import("@/components/table/index")
  },
  data() {
    return {
      currentPlatform: "tt",
      isFileUploadModel: false,
      tableData: [],
      loading: false
    };
  },
  computed: {
    currentPlatformLabel() {
      return platformType[this.currentPlatform];
    }
  },
  mounted() {
    if (this.$route.params.platform) {
      this.currentPlatform = this.$route.params.platform;
    }
  },
  methods: {
    handleUploadSuccess(data) {
      this.tableData = data;
      this.isFileUploadModel = false;
    },
    async handleCatchLinks() {
      if (this.tableData.length) {
        this.loading = true;
        await this.spiderLinks();
        this.loading = false;
      } else {
        this.$message.error("请先上传文档");
      }
    },
    async spiderLinks() {
      try {
        const resData = await axios.post(
          "http://localhost:56688/check",
          qs.stringify({
            links: JSON.stringify(this.tableData),
            platform: this.currentPlatform
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        if (resData.status === 200 && resData.data.code === "200") {
          this.tableData = resData.data.data;
        } else {
          this.$message.error("抓取失败");
        }
      } catch (error) {
        this.$message.error("抓取失败，请重试");
      }
    }
  }
};
</script>

<style lang="css">
.spider-page .header {
  display: flex;
  padding: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.spider-page .wrap {
  padding: 8px;
}

.spider-page .statistics-card {
  height: 120px;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
}
</style>
