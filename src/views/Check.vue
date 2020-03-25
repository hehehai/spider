<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
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
      <el-table-column prop="status" label="状态" width="100">
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

export default {
  name: "Check",
  data() {
    return {
      statusTypes: Object.freeze(statusTypes)
    };
  },
  props: {
    tableData: {
      type: Array
    }
  },
  methods: {
    handleLink(link) {
      this.$electron.remote.shell.openExternal(link);
    }
  }
};
</script>

<style lang="css">
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
