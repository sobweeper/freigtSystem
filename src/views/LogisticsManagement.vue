<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { logisticsStats, vehicleRoutes } from '../data/mockData';
import AMapLoader from '@amap/amap-jsapi-loader';

const mapLoaded = ref(false);
const map = ref<any>(null);

onMounted(() => {
  initMap();
});

const initMap = async () => {
  try {
    const AMap = await AMapLoader.load({
      key: '7dd3bee9473d3c519ec6cdb4b996e82d',
      version: '2.0',
      plugins: ['AMap.ToolBar', 'AMap.Scale']
    });

    map.value = new AMap.Map('container', {
      zoom: 11,
      center: [121.618622, 38.91459] // 大连市的经纬度坐标
    });

    // 添加标记点
    const markers = [
      { position: [121.518622, 38.91459], text: '5辆' },
      { position: [121.718622, 38.91459], text: '6辆' },
      { position: [121.518622, 38.81459], text: '3辆' },
      { position: [121.618622, 38.71459], text: '5辆' },
      { position: [121.418622, 38.91459], text: '20辆' },
      { position: [121.618622, 38.86459], text: '10辆' },
      { position: [121.718622, 38.76459], text: '10辆' },
      { position: [121.618622, 38.66459], text: '8辆' },
      { position: [121.818622, 38.81459], text: '4辆' }
    ];

    markers.forEach(marker => {
      const markerContent = `
        <div class="custom-marker">
          <span class="marker-text">${marker.text}</span>
        </div>
      `;
      new AMap.Marker({
        position: marker.position,
        content: markerContent,
        anchor: 'center',
        offset: new AMap.Pixel(0, 0),
        map: map.value
      });
    });

    // 添加工具条和比例尺
    map.value.addControl(new AMap.ToolBar());
    map.value.addControl(new AMap.Scale());

    mapLoaded.value = true;
  } catch (e) {
    console.error('地图加载失败:', e);
  }
};
</script>

<template>
  <div class="logistics-management">
    <h1 class="page-title">3, 货运管理</h1>
    
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">车辆总数</div>
        <div class="stat-value">{{ logisticsStats.vehicleCount }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">运行数量</div>
        <div class="stat-value">{{ logisticsStats.runningVehicles }}</div>
      </div>
    </div>
    
    <div class="map-container">
      <div id="container" class="map"></div>
    </div>
    
    <div class="routes-section">
      <div class="section-header">
        <h2>货车线路</h2>
        <button class="btn btn-primary">+ 添加新线路</button>
      </div>
      
      <div class="search-filter">
        <div class="search-container">
          <div class="search-bar">
            <span class="material-icons search-icon">search</span>
            <input type="text" placeholder="搜索..." />
          </div>
        </div>
        
        <div class="filter-buttons">
          <button class="filter-button">
            <span class="material-icons">sort</span>
          </button>
          <button class="filter-button">
            <span class="material-icons">filter_list</span>
          </button>
        </div>
      </div>
      
      <div class="routes-list">
        <div class="route-card" v-for="route in vehicleRoutes.slice(0, 3)" :key="route.id">
          <div class="route-info">
            <div class="route-name">{{ route.route }}</div>
            <div class="route-time">{{ route.startTime }}</div>
            <div class="route-id">{{ route.id }}</div>
          </div>
          
          <div class="route-progress">
            <div class="status-label" :class="`status-${route.status.includes('发车') ? 'active' : 'pending'}`">
              {{ route.status }}
            </div>
            <div class="progress-info">
              <div class="progress-value">{{ route.progress }}%</div>
              <div class="progress-total">{{ route.totalOrders }}</div>
            </div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${route.progress}%` }"></div>
            </div>
          </div>
          
          <div class="route-driver">
            <div class="order-count">订单数量</div>
            <div class="order-value">{{ route.orderCount }}</div>
          </div>
          
          <div class="driver-info">
            <div class="driver-avatar">
              <img :src="`https://randomuser.me/api/portraits/${route.driver === '苏喜喜' ? 'men' : 'women'}/32.jpg`" alt="Driver Avatar">
            </div>
            <div class="driver-details">
              <div class="driver-name">{{ route.driver }}</div>
              <div class="driver-phone">{{ route.phone }}</div>
            </div>
            <button class="action-button">
              <span class="material-icons">more_vert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logistics-management {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  .stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 16px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
    }
  }
}

.map-container {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  height: 400px;
  
  .map {
    width: 100%;
    height: 100%;
  }
}

:global(.custom-marker) {
  background-color: #FF9800;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  .marker-text {
    text-align: center;
  }
}

.routes-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .search-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .search-container {
      flex: 1;
      max-width: 300px;
    }
    
    .filter-buttons {
      display: flex;
      
      .filter-button {
        width: 36px;
        height: 36px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        
        &:hover {
          background-color: #f5f5f5;
        }
        
        .material-icons {
          font-size: 20px;
        }
      }
    }
  }
  
  .routes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 20px;
    
    .route-card {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto auto;
      gap: 16px;
      
      .route-info {
        grid-column: 1;
        grid-row: 1;
        
        .route-name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .route-time {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .route-id {
          font-size: 12px;
          color: var(--text-secondary);
        }
      }
      
      .route-progress {
        grid-column: 2;
        grid-row: 1;
        padding: 0 16px;
        
        .status-label {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-bottom: 8px;
          
          &.status-active {
            background-color: rgba(255, 152, 0, 0.1);
            color: var(--primary-color);
          }
          
          &.status-pending {
            background-color: rgba(76, 175, 80, 0.1);
            color: var(--success-color);
          }
        }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          
          .progress-value {
            font-weight: 500;
          }
          
          .progress-total {
            color: var(--text-secondary);
            font-size: 12px;
            &::before {
              content: '总数:';
              margin-right: 4px;
            }
          }
        }
        
        .progress-bar {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          
          .progress {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: 4px;
          }
        }
      }
      
      .route-driver {
        grid-column: 3;
        grid-row: 1;
        text-align: center;
        
        .order-count {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .order-value {
          font-size: 18px;
          font-weight: bold;
        }
      }
      
      .driver-info {
        grid-column: 1 / span 3;
        grid-row: 2;
        display: flex;
        align-items: center;
        
        .driver-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .driver-details {
          flex: 1;
          
          .driver-name {
            font-weight: 500;
          }
          
          .driver-phone {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
        
        .action-button {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .routes-list {
    grid-template-columns: 1fr !important;
  }
}
</style>