<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    Home: () => import("./views/Home")
  }
};
</script>
