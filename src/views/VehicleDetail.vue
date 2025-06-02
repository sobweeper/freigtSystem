<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { vehicleRoutes } from '../data/mockData';

const route = useRoute();
const vehicleId = computed(() => route.params.id as string);

const vehicle = computed(() => {
  return vehicleRoutes.find(v => v.id === vehicleId.value) || vehicleRoutes[0];
});

const mapLoaded = ref(false);

onMounted(() => {
  // Simulate map loading
  setTimeout(() => {
    mapLoaded.value = true;
  }, 500);
});
</script>

<template>
  <div class="vehicle-detail">
    <h1 class="page-title">4，货运管理-车次信息</h1>
    
    <div class="detail-container">
      <div class="map-container">
        <div class="map" :class="{ 'loaded': mapLoaded }">
          <div v-if="!mapLoaded" class="map-loading">加载中...</div>
          <div v-else class="map-content">
            <!-- Placeholder for the map with route path -->
            <div class="route-path">
              <div class="route-point start"></div>
              <div class="route-line"></div>
              <div class="route-point waypoint"></div>
              <div class="route-line dashed"></div>
              <div class="route-point current">
                <div class="point-tooltip">
                  {{ vehicle.details?.currentAddress || '中山区' }}<br>
                  中山区长江路65号
                </div>
              </div>
              <div class="route-line"></div>
              <div class="route-point waypoint"></div>
              <div class="route-line"></div>
              <div class="route-point end"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-sidebar">
        <div class="info-header">
          <h2>车次信息</h2>
        </div>
        
        <div class="vehicle-basic-info">
          <div class="route-name">{{ vehicle.route }}</div>
          <div class="vehicle-id">{{ vehicle.id }}</div>
        </div>
        
        <div class="driver-info">
          <div class="driver-avatar">
            <img :src="`https://randomuser.me/api/portraits/${vehicle.driver === '苏喜喜' ? 'men' : 'women'}/32.jpg`" alt="Driver Avatar">
          </div>
          <div class="driver-details">
            <div class="driver-name">{{ vehicle.driver }}</div>
            <div class="driver-phone">{{ vehicle.phone }}</div>
          </div>
        </div>
        
        <div class="departure-info">
          <div class="time-label">每天上午10:30发车</div>
          <div class="status-label" :class="`status-${vehicle.status.includes('发车') ? 'active' : 'pending'}`">
            {{ vehicle.status }}
          </div>
        </div>
        
        <div class="trip-stats">
          <div class="stat-item">
            <div class="stat-label">行程</div>
            <div class="stat-value">{{ vehicle.details?.distance || '5.4km' }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">途经站点</div>
            <div class="stat-value">{{ vehicle.details?.stops || 3 }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">载重</div>
            <div class="stat-value">{{ vehicle.details?.batteryLevel || '75%' }}</div>
          </div>
        </div>
        
        <div class="stop-points">
          <div class="stop-header">
            <span class="material-icons">place</span>
            <h3>中山区</h3>
          </div>
          
          <div class="stop-list">
            <div class="stop-item completed">
              <div class="stop-icon"></div>
              <div class="stop-content">
                <div class="stop-name">中山区长江路65号</div>
                <div class="stop-time">8-13-10:31</div>
              </div>
            </div>
            <div class="stop-item completed">
              <div class="stop-icon"></div>
              <div class="stop-content">
                <div class="stop-name">中山区长江路65号</div>
                <div class="stop-time">8-13-10:31</div>
              </div>
            </div>
            <div class="stop-item current">
              <div class="stop-icon"></div>
              <div class="stop-content">
                <div class="stop-name">中山区长江路65号</div>
                <div class="stop-time">8-13-10:31</div>
              </div>
            </div>
            <div class="stop-item">
              <div class="stop-icon"></div>
              <div class="stop-content">
                <div class="stop-name">中山区长江路65号</div>
                <div class="stop-time">8-13-10:31</div>
              </div>
            </div>
            <div class="stop-item">
              <div class="stop-icon"></div>
              <div class="stop-content">
                <div class="stop-name">中山区长江路65号</div>
                <div class="stop-time">8-13-10:31</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="related-orders">
          <h3>运送订单</h3>
          <div class="order-table">
            <div class="order-row header">
              <div class="order-cell">郭德纲</div>
              <div class="order-cell">4件</div>
              <div class="order-cell">已送达</div>
              <div class="order-cell">5城区</div>
            </div>
            <div class="order-row">
              <div class="order-cell">郭德纲</div>
              <div class="order-cell">4件</div>
              <div class="order-cell">配送中</div>
              <div class="order-cell">5城区</div>
            </div>
            <div class="order-row">
              <div class="order-cell">郭德纲</div>
              <div class="order-cell">4件</div>
              <div class="order-cell">待配送</div>
              <div class="order-cell">5城区</div>
            </div>
            <div class="order-row">
              <div class="order-cell">郭德纲</div>
              <div class="order-cell">4件</div>
              <div class="order-cell">已取消</div>
              <div class="order-cell">5城区</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vehicle-detail {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.detail-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
}

.map-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 600px;
  
  .map {
    width: 100%;
    height: 100%;
    background-color: #e5e5e5;
    position: relative;
    
    &.loaded {
      background-color: #d2d2d2;
    }
    
    .map-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-secondary);
    }
    
    .map-content {
      width: 100%;
      height: 100%;
      position: relative;
    }
    
    .route-path {
      position: relative;
      width: 100%;
      height: 100%;
      
      .route-point {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--primary-color);
        
        &.start {
          left: 30%;
          top: 80%;
          background-color: #f44336;
        }
        
        &.end {
          left: 75%;
          top: 30%;
          background-color: #4caf50;
        }
        
        &.waypoint {
          left: 45%;
          top: 60%;
          background-color: var(--primary-color);
          
          &:nth-of-type(3) {
            left: 60%;
            top: 45%;
          }
        }
        
        &.current {
          left: 55%;
          top: 50%;
          width: 16px;
          height: 16px;
          background-color: var(--primary-color);
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 2;
          
          .point-tooltip {
            position: absolute;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 8px 12px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 12px;
            white-space: nowrap;
            
            &::after {
              content: '';
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              border-width: 6px;
              border-style: solid;
              border-color: white transparent transparent transparent;
            }
          }
        }
      }
      
      .route-line {
        position: absolute;
        background-color: var(--primary-color);
        height: 2px;
        transform-origin: 0 0;
        
        &:nth-of-type(2) {
          left: 30%;
          top: 80%;
          width: 20%;
          transform: rotate(-45deg);
        }
        
        &:nth-of-type(4) {
          left: 45%;
          top: 60%;
          width: 15%;
          transform: rotate(-40deg);
          
          &.dashed {
            background: repeating-linear-gradient(
              to right,
              var(--primary-color),
              var(--primary-color) 5px,
              transparent 5px,
              transparent 8px
            );
          }
        }
        
        &:nth-of-type(6) {
          left: 55%;
          top: 50%;
          width: 10%;
          transform: rotate(-25deg);
        }
        
        &:nth-of-type(8) {
          left: 60%;
          top: 45%;
          width: 20%;
          transform: rotate(-30deg);
        }
      }
    }
  }
}

.info-sidebar {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  overflow-y: auto;
  max-height: 600px;
  
  .info-header {
    margin-bottom: 16px;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .vehicle-basic-info {
    margin-bottom: 16px;
    
    .route-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .vehicle-id {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
  
  .driver-info {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
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
      .driver-name {
        font-weight: 500;
      }
      
      .driver-phone {
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }
  
  .departure-info {
    margin-bottom: 16px;
    
    .time-label {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .status-label {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      
      &.status-active {
        background-color: rgba(255, 152, 0, 0.1);
        color: var(--primary-color);
      }
      
      &.status-pending {
        background-color: rgba(76, 175, 80, 0.1);
        color: var(--success-color);
      }
    }
  }
  
  .trip-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
    
    .stat-item {
      text-align: center;
      
      .stat-label {
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 4px;
      }
      
      .stat-value {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  
  .stop-points {
    margin-bottom: 24px;
    
    .stop-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      
      .material-icons {
        color: var(--primary-color);
        margin-right: 8px;
      }
      
      h3 {
        font-size: 16px;
        font-weight: 500;
      }
    }
    
    .stop-list {
      padding-left: 12px;
      
      .stop-item {
        display: flex;
        padding: 8px 0;
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 0;
          bottom: 0;
          width: 1px;
          background-color: #e0e0e0;
        }
        
        &:first-child::before {
          top: 50%;
        }
        
        &:last-child::before {
          bottom: 50%;
        }
        
        &.completed .stop-icon {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          
          &::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: white;
          }
        }
        
        &.current .stop-icon {
          background-color: white;
          border-color: var(--primary-color);
          width: 12px;
          height: 12px;
          
          &::after {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--primary-color);
          }
        }
        
        .stop-icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: white;
          border: 1px solid #e0e0e0;
          margin-right: 12px;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .stop-content {
          flex: 1;
          
          .stop-name {
            font-weight: 500;
            margin-bottom: 2px;
          }
          
          .stop-time {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
      }
    }
  }
  
  .related-orders {
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    
    .order-table {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      
      .order-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        
        &.header {
          background-color: #f5f5f5;
          font-weight: 500;
          
          .order-cell {
            color: var(--text-secondary);
          }
        }
        
        &:not(.header) {
          border-top: 1px solid #e0e0e0;
        }
        
        .order-cell {
          padding: 8px 12px;
          font-size: 13px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .detail-container {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 400px;
  }
}
</style>