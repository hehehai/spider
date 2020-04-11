<template>
  <div class="back-header">
    <el-page-header
      title="返回首页"
      @back="$router.back()"
      :content="label"
    ></el-page-header>
  </div>
</template>

<script>
export default {
  name: "BackHeader",
  props: {
    label: String
  }
};
</script>
