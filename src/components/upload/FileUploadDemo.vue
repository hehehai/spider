<template>
  <div class="file-demo">
    <p class="info">{{ label }} 批量抓取文档格式（请注意链接类型）</p>
    <div class="table">
      <el-table :data="tableData" size="medium" border style="width: 100%">
        <el-table-column prop="author" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="link" label="链接"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const platformDemo = {
  tt: [
    {
      author: "光明网",
      link: "https://www.toutiao.com/c/user/5806115967/#mid=5806115967"
    },
    {
      author: "牛华网",
      link: "https://www.toutiao.com/c/user/3339797036/#mid=3339808431"
    }
  ],
  wb: [
    {
      author: "张新成",
      link: "https://weibo.com/stevenzhang1995?is_hot=1"
    },
    {
      author: "这是小布啊",
      link: "https://weibo.com/u/5227768983"
    },
    {
      author: "无锡同城",
      link:
        "https://weibo.com/p/1006066068931107/home?from=page_100606&mod=TAB&is_hot=1#place"
    }
  ],
  xhs: [
    {
      author: "cindy涵涵",
      link:
        "https://www.xiaohongshu.com/user/profile/5d93420c0000000001005cd8?xhsshare=CopyLink&appuid=5d93420c0000000001005cd8&apptime=1585137350"
    }
  ]
};

export default {
  name: "FileUploadDemo",
  props: {
    platform: String,
    label: String
  },
  computed: {
    tableData() {
      return platformDemo[this.platform];
    }
  }
};
</script>
