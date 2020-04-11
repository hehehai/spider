<template>
  <div class="table-data">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" label="账号" width="180"></el-table-column>
      <el-table-column prop="link" label="链接">
        <template slot-scope="scope">
          <p class="link-cell">
            <span class="color-success" v-if="regExpLinkRight(scope.row.link)"
              ><i class="el-icon-circle-check"></i
            ></span>
            <span class="color-error" v-else
              ><i class="el-icon-circle-close"></i
            ></span>
            <span class="link">{{ scope.row.link }}</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { isTTLink, isWBLink, isXHSLink } from "@/constant";

export default {
  name: "TableData",
  props: {
    tableData: {
      type: Array
    },
    platform: {
      type: String,
      required: true
    }
  },
  methods: {
    regExpLinkRight(link) {
      switch (this.platform) {
        case "tt":
          return isTTLink(link);
        case "wb":
          return isWBLink(link);
        case "xhs":
          return isXHSLink(link);
      }
    }
  }
};
</script>

<style lang="css">
.color-success {
  color: #52c41a;
}

.color-error {
  color: #f5222d;
}

.link-cell {
  display: flex;
  margin: 0;
}

.link-cell .link {
  margin-left: 1em;
}
</style>
