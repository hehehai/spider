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
        <el-button icon="el-icon-truck" @click="exportData">导出数据</el-button>
        <el-button icon="el-icon-truck" @click="exportErrorLinks"
          >导出错误链接</el-button
        >
      </div>
    </div>
    <div class="wrap">
      <div class="statistics">
        <div class="statistics-card">
          <p>正确链接： {{ tableData.right.length }}</p>
          <p style="color: red">错误链接：{{ tableData.error.length }}</p>
        </div>
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
import {
  platformType,
  ttStatus,
  isTTLink,
  isWBLink,
  isXHSLink
} from "@/constant";

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
      tableData: {
        right: [],
        error: []
      },
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
    // async handleDemo() {
    //   this.$ipcRenderer.send("demo-message", "ping");
    // },
    handleUploadSuccess(data) {
      this.tableData = this.checkLinks(data);
      this.isFileUploadModel = false;
    },
    async handleCatchLinks() {
      if (this.tableData.right.length) {
        if (this.tableData.error.length) {
          this.$message.error(`${this.tableData.error.length}错误链接跳过检测`);
        }
        this.loading = true;
        await this.spiderLinks();
        this.loading = false;
      } else {
        this.$message.error("无可检测链接");
      }
    },
    async spiderLinks() {
      try {
        const resData = await axios.post(
          "http://localhost:56688/check",
          qs.stringify({
            links: JSON.stringify(this.tableData.right),
            platform: this.currentPlatform
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        if (resData.status === 200 && resData.data.code === "200") {
          this.tableData.right = resData.data.data;
        } else {
          this.$message.error("抓取失败");
        }
      } catch (error) {
        this.$message.error("抓取失败，请重试");
      }
    },
    checkLinks(d) {
      const right = [];
      const error = [];
      switch (this.currentPlatform) {
        case "tt":
          d.forEach(i => {
            if (isTTLink(i.link)) {
              right.push(i);
            } else {
              error.push(i);
            }
          });
          break;
        case "wb":
          d.forEach(i => {
            if (isWBLink(i.link)) {
              right.push(i);
            } else {
              error.push(i);
            }
          });
          break;
        case "xhs":
          d.forEach(i => {
            if (isXHSLink(i.link)) {
              right.push(i);
            } else {
              error.push(i);
            }
          });
          break;
      }

      return {
        right,
        error
      };
    },
    exportExcel(statusColumns, data, title) {
      const columns = [
        {
          label: "账号",
          prop: "name"
        },
        {
          label: "链接",
          prop: "link"
        }
      ];
      columns.push(...statusColumns);
      this.$export.excel({
        columns,
        data,
        title
      });
    },
    ttDataExport() {
      this.exportExcel(
        [
          {
            label: "账号状态",
            prop: "status"
          }
        ],
        this.tableData.right.map(i => {
          return {
            ...i,
            status: ttStatus[i.status]
          };
        }),
        "今日头条账号状态验证"
      );
    },
    wbDataExport() {
      this.exportExcel(
        [
          {
            label: "粉丝",
            prop: "fans"
          },
          {
            label: "认证",
            prop: "verified"
          }
        ],
        this.tableData.right.map(i => {
          return {
            ...i,
            fans: i.status.fans,
            verified: JSON.stringify(i.status)
          };
        }),
        "微博账号状态验证"
      );
    },
    xhsDataExport() {
      this.exportExcel(
        [
          {
            label: "关注",
            prop: "sub"
          },
          {
            label: "粉丝",
            prop: "fans"
          },
          {
            label: "获赞与收藏",
            prop: "likeAndMark"
          }
        ],
        this.tableData.right.map(i => {
          return {
            ...i,
            sub: i.status.sub,
            fans: i.status.fans,
            likeAndMark: i.status.likeAndMark
          };
        }),
        "小红书账号状态验证"
      );
    },
    exportErrorLinks() {
      this.exportExcel([], this.tableData.error, "链接格式错误");
    },
    exportData() {
      switch (this.currentPlatform) {
        case "tt":
          return this.ttDataExport();
        case "wb":
          return this.wbDataExport();
        case "xhs":
          return this.xhsDataExport();
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

.spider-page .statistics {
  margin-bottom: 8px;
}

.spider-page .statistics-card {
  height: 120px;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
}
</style>
