<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        prop="账号名称"
        label="账号名称"
        width="220"
      ></el-table-column>
      <el-table-column prop="案例" label="案例" width="280">
        <template slot-scope="scope">
          <a :href="scope.row['案例']" target="_blank">{{
            scope.row["案例"]
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="a" label="状态"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Check",
  props: {
    tableData: {
      type: Array
    }
  }
};
</script>
