<template>
  <div>
    <el-table :data="tableData.data" style="width: 100%" border>
      <el-table-column prop="a" label="名称" width="180"> </el-table-column>
      <el-table-column prop="a" label="链接" width="180"> </el-table-column>
      <el-table-column prop="a" label="状态"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Check",
  data() {
    return {
      tableData: {
        data: []
      }
    };
  }
};
</script>
