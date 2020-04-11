<template>
  <div class="card" @click="handleRouter(path)">
    <div class="content">
      <img class="icon" :src="imgPath" :alt="alt" />
      <div class="desc">{{ alt }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    path: String,
    alt: String
  },
  computed: {
    imgPath() {
      return require(`@/assets/${this.path}.png`);
    }
  },
  methods: {
    handleRouter(platform) {
      this.$router.push(`/spider/${platform}`);
    }
  }
};
</script>

<style lang="css">
.card {
  width: 220px;
  height: 220px;
  border-radius: 20px;
  border: 1px solid #f7f7f7;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-out;

  display: flex;
  justify-content: center;
  align-items: center;
}

.card:hover,
.card:focus {
  border-color: #1890ff;
  box-shadow: 0 0 6px rgba(24, 144, 255, 0.2);
}

.card .content {
  position: relative;
}

.card .icon {
  width: 120px;
  height: 120px;
}

.card .desc {
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: -2rem;
  transform: translateX(-50%);
}
</style>
