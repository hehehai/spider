<template>
  <div>
    <p class="total" v-if="total.all">
      <span>总数：{{ total.all }}</span>
      <span class="status unknown">未知：{{ total.unknown }}</span>
      <span class="status normal">正常：{{ total.normal }}</span>
      <span class="status banded">封禁：{{ total.banded }}</span>
      <span class="status error">错误：{{ total.error }}</span>
    </p>
    <el-table :data="tableData" style="width: 100%" border v-loading="loading">
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="mediaName"
        label="账号名称"
        width="220"
      ></el-table-column>
      <el-table-column prop="link" label="案例">
        <template slot-scope="scope">
          <a
            :href="scope.row.link"
            target="_blank"
            @click.prevent="handleLink(scope.row.link)"
            >{{ scope.row.link }}</a
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        align="center"
        :filters="filterStatus"
        :filter-method="handleFilterStatus"
      >
        <template slot-scope="scope">
          <span :class="['status', scope.row.status]">{{
            statusTypes[scope.row.status]
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const statusTypes = {
  unknown: "未知",
  normal: "正常",
  banded: "封禁",
  error: "错误"
};

const filterStatus = [
  { text: "未知", value: "unknown" },
  { text: "正常", value: "normal" },
  { text: "封禁", value: "banded" },
  { text: "错误", value: "error" }
];

export default {
  name: "Check",
  data() {
    return {
      statusTypes: Object.freeze(statusTypes),
      filterStatus: Object.freeze(filterStatus)
    };
  },
  props: {
    tableData: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    total() {
      let result = {
        all: this.tableData.length,
        unknown: 0,
        normal: 0,
        banded: 0,
        error: 0
      };

      if (this.tableData.length) {
        this.tableData.forEach(item => {
          if (item.status) {
            result[item.status] += 1;
          }
        });
      }
      return result;
    }
  },
  methods: {
    handleLink(link) {
      this.$electron.remote.shell.openExternal(link);
    },
    handleFilterStatus(value, row) {
      return row.status === value;
    }
  }
};
</script>

<style lang="css">
.total {
  display: flex;
  justify-content: center;
}

.total > span + span {
  margin-left: 2em;
}

.status {
  padding: 1px 6px;
  border-radius: 3px;
  color: white;
}

.status.unknown {
  background-color: #5a5a5a;
}

.status.normal {
  background-color: #52c41a;
}

.status.banded {
  background-color: #722ed1;
}

.status.error {
  background-color: #eb2f96;
}
</style>
