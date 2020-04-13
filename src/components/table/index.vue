<template>
  <div class="table-data">
    <el-table :data="allTableData" style="width: 100%" border>
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
      <template v-if="platform === 'tt'">
        <el-table-column prop="status" label="账号状态" width="180">
          <template slot-scope="scope">
            <span>{{ getTTStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
      </template>
      <template v-else-if="platform === 'wb'">
        <el-table-column prop="status" label="粉丝" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.status && scope.row.status.fans }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="认证" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </template>
      <template v-else-if="platform === 'xhs'">
        <el-table-column prop="status" label="关注" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.status && scope.row.status.sub }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="粉丝" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.status && scope.row.status.fans }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="获赞与收藏" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.status && scope.row.status.likeAndMark }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { isTTLink, isWBLink, isXHSLink } from "@/constant";
import { ttStatus } from "@/constant";

export default {
  name: "TableData",
  props: {
    tableData: {
      type: Object
    },
    platform: {
      type: String,
      required: true
    }
  },
  computed: {
    allTableData() {
      return [...this.tableData.error, ...this.tableData.right];
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
    },
    getTTStatus(key) {
      return ttStatus[key];
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
