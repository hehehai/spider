<template>
  <div class="home">
    <div class="container">
      <div class="header">
        <h1 class="title">平台用户账号信息批量检测</h1>
        <p>v{{ appVersion }}</p>
      </div>
      <main class="card-link">
        <template v-for="(val, key) in platformType">
          <card :key="key" :path="key" :alt="val" />
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import { version } from "../../package.json";
import Card from "@/components/Card";
import { platformType } from "@/constant";

export default {
  name: "Home",
  components: { Card },
  data() {
    return {
      appVersion: version,
      platformType
    };
  }
};
</script>

<style lang="css">
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home .title {
  font-weight: normal;
  font-size: 36px;
}

.card-link {
  margin: 4rem 0;
  display: flex;
  justify-content: center;
}

.card-link > div + div {
  margin-left: 2rem;
}
</style>
