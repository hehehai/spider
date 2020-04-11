<template>
  <el-drawer
    title="上传文档"
    size="60%"
    :visible.sync="isOpened"
    @closed="$emit('update:isShow', false)"
    modal-append-to-body
    append-to-body
    modal
  >
    <div class="upload-content">
      <div class="demo">
        <FileUploadDemo :platform="platform" :label="label" />
      </div>
      <Upload />
    </div>
  </el-drawer>
</template>

<script>
import FileUploadDemo from "./FileUploadDemo";
import Upload from "./Upload";

export default {
  name: "FileUpload",
  components: { FileUploadDemo, Upload },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    platform: String,
    label: String
  },
  data() {
    return {
      isOpened: this.isShow
    };
  },
  watch: {
    isShow(val) {
      this.isOpened = val;
    }
  }
};
</script>

<style lang="css">
.upload-content {
  margin: 1.5rem;
}

.upload-content .demo {
  margin-bottom: 1rem;
}
</style>
