<script setup lang="ts">
import { ref } from 'vue';
import { vehicleRoutes } from '../data/mockData';

const searchQuery = ref('');
const showAddModal = ref(false);

const closeModal = () => {
  showAddModal.value = false;
};

const openAddModal = () => {
  showAddModal.value = true;
};
</script>

<template>
  <div class="route-management">
    <h1 class="page-title">5，货运管理-货车路线</h1>
    
    <div class="route-container">
      <div class="section-header">
        <div class="search-container">
          <div class="search-bar">
            <span class="material-icons search-icon">search</span>
            <input type="text" v-model="searchQuery" placeholder="搜索..." />
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
        
        <button class="btn btn-primary" @click="openAddModal">+ 添加新路线</button>
      </div>
      
      <div class="routes-list">
        <div class="route-card" v-for="route in vehicleRoutes" :key="route.id">
          <div class="route-info">
            <div class="route-name">{{ route.route }}</div>
            <div class="status-label" :class="`status-${route.status.includes('发车') ? 'active' : route.status.includes('配送') ? 'completed' : 'pending'}`">
              {{ route.status }}
            </div>
          </div>
          
          <div class="departure-time">
            <div class="time-label">{{ route.startTime }}</div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${route.progress}%` }"></div>
            </div>
            <div class="progress-stats">
              <div class="progress-value">{{ route.progress }}%</div>
              <div class="total-orders">{{ route.totalOrders }}</div>
            </div>
          </div>
          
          <div class="vehicle-info">
            <div class="vehicle-id">{{ route.id }}</div>
          </div>
          
          <div class="order-info">
            <div class="order-label">订单数量</div>
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
    
    <!-- Add new route modal -->
    <div class="modal-overlay" v-if="showAddModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>添加新货车路线</h3>
          <button class="close-button" @click="closeModal">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>路线名称</label>
            <input type="text" placeholder="请输入">
          </div>
          
          <div class="form-group">
            <label>车辆号</label>
            <input type="text" placeholder="请输入">
          </div>
          
          <div class="form-group">
            <label>发车时间</label>
            <input type="time" value="10:30">
          </div>
          
          <div class="form-group">
            <label>车辆状态</label>
            <select>
              <option>请选择</option>
              <option>已发车</option>
              <option>已配送</option>
              <option>待发车</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>司机</label>
            <select>
              <option>请选择</option>
              <option>苏喜喜</option>
              <option>郝春霞</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>最大载重</label>
            <input type="text" placeholder="请输入">
          </div>
          
          <div class="form-group">
            <label>路线点</label>
            <input type="text" placeholder="请输入">
          </div>
          
          <div class="form-group">
            <label>终点站</label>
            <input type="text" placeholder="请输入">
            <button class="btn-search">
              <span class="material-icons">search</span>
            </button>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-outline" @click="closeModal">取消</button>
          <button class="btn btn-primary">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.route-management {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.route-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .search-container {
    flex: 1;
    max-width: 300px;
    margin-right: 16px;
  }
  
  .filter-buttons {
    display: flex;
    margin-right: 16px;
    
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
  .route-card {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr auto;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .route-info {
      padding-right: 16px;
      
      .route-name {
        font-weight: 500;
        margin-bottom: 8px;
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
        
        &.status-completed {
          background-color: rgba(76, 175, 80, 0.1);
          color: var(--success-color);
        }
        
        &.status-pending {
          background-color: rgba(33, 150, 243, 0.1);
          color: var(--secondary-color);
        }
      }
    }
    
    .departure-time {
      padding: 0 16px;
      
      .time-label {
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }
      
      .progress-bar {
        height: 8px;
        background-color: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 4px;
        
        .progress {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 4px;
        }
      }
      
      .progress-stats {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        
        .progress-value {
          font-weight: 500;
        }
        
        .total-orders {
          color: var(--text-secondary);
          
          &::before {
            content: '总数:';
            margin-right: 4px;
          }
        }
      }
    }
    
    .vehicle-info {
      padding: 0 16px;
      
      .vehicle-id {
        font-weight: 500;
      }
    }
    
    .order-info {
      text-align: center;
      
      .order-label {
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
        margin-right: 16px;
        
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  
  .close-button {
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

.modal-body {
  padding: 20px;
  
  .form-group {
    margin-bottom: 16px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    input, select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
    
    .btn-search {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
    }
  }
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  .btn {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    
    &.btn-outline {
      background: none;
      border: 1px solid #e0e0e0;
      color: var(--text-secondary);
      
      &:hover {
        background-color: #f5f5f5;
      }
    }
    
    &.btn-primary {
      background-color: var(--primary-color);
      border: none;
      color: white;
      
      &:hover {
        background-color: var(--primary-color-dark);
      }
    }
  }
}

@media (max-width: 1200px) {
  .route-card {
    grid-template-columns: 1fr 1fr !important;
    grid-template-rows: auto auto auto;
    gap: 12px;
    
    .route-info {
      grid-column: 1;
      grid-row: 1;
    }
    
    .departure-time {
      grid-column: 2;
      grid-row: 1;
    }
    
    .vehicle-info {
      grid-column: 1;
      grid-row: 2;
    }
    
    .order-info {
      grid-column: 2;
      grid-row: 2;
      text-align: left !important;
    }
    
    .driver-info {
      grid-column: 1 / span 2;
      grid-row: 3;
    }
  }
}

@media (max-width: 768px) {
  .route-card {
    grid-template-columns: 1fr !important;
    
    .route-info, .departure-time, .vehicle-info, .order-info, .driver-info {
      grid-column: 1;
    }
    
    .route-info {
      grid-row: 1;
    }
    
    .departure-time {
      grid-row: 2;
    }
    
    .vehicle-info {
      grid-row: 3;
    }
    
    .order-info {
      grid-row: 4;
    }
    
    .driver-info {
      grid-row: 5;
    }
  }
}
</style>