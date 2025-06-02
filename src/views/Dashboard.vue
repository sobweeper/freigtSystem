<script setup lang="ts">
import { ref } from 'vue';
import StatCard from '../components/StatCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import { dashboardStats, dailyOrderData, trendAnalysisData, deliveryRoutes, notifications } from '../data/mockData';

const activeTab = ref('周');

const toggleTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="dashboard">
    <h1 class="page-title">1，货运物流管理系统后台设计</h1>
    
    <div class="stats-container">
      <StatCard title="订单数" :value="dashboardStats.orderCount" icon="description" iconColor="#FF9800" />
      <StatCard title="货物数" :value="dashboardStats.packageCount" icon="inventory_2" iconColor="#2196F3" />
      <StatCard title="今日配送" :value="dashboardStats.todayDeliveries" icon="local_shipping" iconColor="#673AB7" />
      <StatCard title="平均配送时间" :value="`${dashboardStats.avgDeliveryTime}`" icon="schedule" iconColor="#9C27B0" />
    </div>
    
    <div class="charts-container">
      <div class="chart-card">
        <div class="chart-header">
          <h2>数据分析</h2>
          <div class="tab-buttons">
            <button :class="{ active: activeTab === '周' }" @click="toggleTab('周')">周</button>
            <button :class="{ active: activeTab === '天' }" @click="toggleTab('天')">天</button>
          </div>
        </div>
        <BarChart :chartData="dailyOrderData" />
      </div>
      
      <div class="chart-card">
        <div class="chart-header">
          <h2>趋势分析</h2>
          <div class="tab-buttons">
            <button :class="{ active: activeTab === '周' }" @click="toggleTab('周')">周</button>
            <button :class="{ active: activeTab === '天' }" @click="toggleTab('天')">天</button>
          </div>
        </div>
        <LineChart :chartData="trendAnalysisData" />
      </div>
    </div>
    
    <div class="bottom-container">
      <div class="routes-container">
        <h2>发车路线</h2>
        <div class="routes-list">
          <div class="route-item" v-for="route in deliveryRoutes" :key="route.id">
            <div class="route-info">
              <div class="route-name">{{ route.origin }}</div>
              <div class="route-arrow">→</div>
              <div class="route-name">{{ route.destination }}</div>
            </div>
            <div class="route-time">{{ route.time }}</div>
          </div>
        </div>
      </div>
      
      <div class="notices-container">
        <h2>公告</h2>
        <div class="notices-list">
          <div class="notice-item" v-for="notice in notifications" :key="notice.id">
            <div class="notice-icon" :class="{ 'unread': !notice.isRead }"></div>
            <div class="notice-title">{{ notice.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 {
      font-size: 16px;
      font-weight: 500;
    }
    
    .tab-buttons {
      display: flex;
      
      button {
        padding: 4px 12px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        color: var(--text-secondary);
        
        &.active {
          color: var(--text-color);
          font-weight: 500;
        }
      }
    }
  }
}

.bottom-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.routes-container, .notices-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
}

.routes-list {
  .route-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .route-info {
      display: flex;
      align-items: center;
      
      .route-name {
        font-weight: 500;
      }
      
      .route-arrow {
        margin: 0 8px;
        color: var(--text-secondary);
      }
    }
    
    .route-time {
      color: var(--text-secondary);
      font-size: 13px;
    }
  }
}

.notices-list {
  .notice-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .notice-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e0e0e0;
      margin-right: 12px;
      
      &.unread {
        background-color: var(--primary-color);
      }
    }
    
    .notice-title {
      font-weight: 500;
    }
  }
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-container, .bottom-container {
    grid-template-columns: 1fr;
  }
}
</style>