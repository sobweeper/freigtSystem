<script setup lang="ts">
import SideNavigation from './components/SideNavigation.vue'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <div class="app-container">
    <SideNavigation />
    <div class="main-content">
      <HeaderComponent />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}
</style>