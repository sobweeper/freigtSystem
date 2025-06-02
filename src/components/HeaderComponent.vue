<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchQuery = ref('');

const pageTitle = ref('首页');

// Update page title based on current route
const updatePageTitle = () => {
  switch(route.name) {
    case 'Dashboard':
      pageTitle.value = '首页';
      break;
    case 'OrderManagement':
      pageTitle.value = '订单管理';
      break;
    case 'LogisticsManagement':
      pageTitle.value = '货运管理';
      break;
    case 'VehicleDetail':
      pageTitle.value = '车次信息';
      break;
    case 'RouteManagement':
      pageTitle.value = '货车路线';
      break;
    case 'WarehouseManagement':
      pageTitle.value = '仓储管理';
      break;
    case 'FinanceManagement':
      pageTitle.value = '财务管理';
      break;
    default:
      pageTitle.value = '首页';
  }
};

updatePageTitle();
</script>

<template>
  <header class="header">
    <div class="search-container">
      <div class="search-bar">
        <span class="material-icons search-icon">search</span>
        <input type="text" v-model="searchQuery" placeholder="搜索运单号, 人员名称, 货车信息......" />
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary">+ 添加新订单</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
}

.search-container {
  flex: 1;
  max-width: 600px;
  
  .search-bar {
    position: relative;
    
    input {
      width: 100%;
      padding: 10px 16px 10px 40px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
    
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #757575;
    }
  }
}

.actions {
  .btn {
    padding: 10px 16px;
    font-weight: 500;
  }
}
</style>