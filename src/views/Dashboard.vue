<script setup lang="ts">
import { onMounted } from 'vue';
import StatCard from '../components/StatCard.vue';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import { dashboardStats, notifications } from '../data/mockData';
import { useDashboardStore } from '../stores/dashboard';

const dashboardStore = useDashboardStore()

const toggleTab = (tab: '周' | '天') => {
  dashboardStore.toggleTimeFrame(tab)
};

onMounted(() => {
  dashboardStore.updateRoutes()
})
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
            <button :class="{ active: dashboardStore.currentTimeFrame === '周' }" @click="toggleTab('周')">周</button>
            <button :class="{ active: dashboardStore.currentTimeFrame === '天' }" @click="toggleTab('天')">天</button>
          </div>
        </div>
        <BarChart :chartData="dashboardStore.getCurrentOrderData()" />
      </div>
      
      <div class="chart-card">
        <div class="chart-header">
          <h2>趋势分析</h2>
          <div class="tab-buttons">
            <button :class="{ active: dashboardStore.currentTimeFrame === '周' }" @click="toggleTab('周')">周</button>
            <button :class="{ active: dashboardStore.currentTimeFrame === '天' }" @click="toggleTab('天')">天</button>
          </div>
        </div>
        <LineChart :chartData="dashboardStore.getCurrentTrendData()" />
      </div>
    </div>
    
    <div class="bottom-container">
      <div class="routes-container">
        <h2>发车路线</h2>
        <div class="routes-list">
          <div class="route-item" v-for="route in dashboardStore.routes" :key="route.id">
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