<script setup lang="ts">
defineProps<{
  title: string,
  value: string | number,
  icon?: string,
  iconColor?: string
}>();
</script>

<template>
  <div class="stat-card">
    <div class="card-icon" v-if="icon" :style="{ backgroundColor: iconColor || '#f5f5f5' }">
      <span class="material-icons">{{ icon }}</span>
    </div>
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .card-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-right: 16px;
    
    .material-icons {
      font-size: 24px;
      color: white;
    }
  }
  
  .card-content {
    flex: 1;
    
    .card-title {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }
    
    .card-value {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>