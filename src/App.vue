<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.app {
  .header {
    height: $header-height;
  }
  
  .main {
    max-width: $content-max-width;
    min-width: $content-min-width;
    padding: $spacing-base;
  }
}
</style>
