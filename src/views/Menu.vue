<template>
  <!-- 浮动导航菜单 -->
  <nav class="floating-nav">
    <router-link to="/sequence-chart" class="nav-button" active-class="active">
      时序图
    </router-link>
    <router-link to="/flow-chart" class="nav-button" active-class="active">
      流程图
    </router-link>
  </nav>
  <!-- 子路由 -->
  <router-view></router-view>
</template>

<style scoped>
.floating-nav {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.nav-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #666;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 14px;
  text-align: center;
  padding: 10px;
}

.nav-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.nav-button.active {
  color: #fff;
  background-color: #42b983;
}
</style>