<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="css">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

.v-modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.2);
}

.el-drawer:focus,
.el-drawer__header span:focus {
  outline: none;
}

.el-drawer__header {
  margin-bottom: 12px !important;
}
</style>
