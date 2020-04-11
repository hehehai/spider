<template>
  <div class="spider-page">
    <div class="header">
      <div class="menu">
        <BackHeader :label="currentPlatformLabel" />
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import { platformType } from "@/constant";

export default {
  name: "SpiderPlatform",
  components: { BackHeader },
  data() {
    return {
      currentPlatform: "tt"
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
  }
};
</script>
