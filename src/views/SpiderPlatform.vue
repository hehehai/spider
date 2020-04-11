<template>
  <div class="spider-page">
    <div class="header">
      <BackHeader :label="currentPlatformLabel" />
      <div class="control">
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="isFileUploadModel = true"
          >上传文档</el-button
        >
        <el-button type="success" icon="el-icon-toilet-paper">抓取</el-button>
        <el-button icon="el-icon-truck">导出数据</el-button>
      </div>
    </div>
    <div class="wrap">
      <div class="statistics">
        <div class="statistics-card"></div>
      </div>
      <div class="table-data">
        <p v-for="item in tableData" :key="item.id">
          <span>{{ item.name }}</span>
          <span>{{ item.link }}</span>
        </p>
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
import BackHeader from "@/components/BackHeader";
import FileUpload from "@/components/upload/FileUpload";
import { platformType } from "@/constant";

export default {
  name: "SpiderPlatform",
  components: { BackHeader, FileUpload },
  data() {
    return {
      currentPlatform: "tt",
      isFileUploadModel: false,
      tableData: []
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
