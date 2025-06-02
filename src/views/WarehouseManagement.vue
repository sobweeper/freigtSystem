<script setup lang="ts">
import { ref } from 'vue';
import BarChart from '../components/charts/BarChart.vue';
import { warehouseStats, warehouseItems, warehouseStaff, warehouses, dailyOrderData } from '../data/mockData';

const activeTab = ref('周');
const selectedWarehouse = ref(warehouses[0]);

const toggleTab = (tab: string) => {
  activeTab.value = tab;
};

const selectWarehouse = (warehouse: any) => {
  selectedWarehouse.value = warehouse;
};

const showAddWarehouse = ref(false);

const toggleAddWarehouse = () => {
  showAddWarehouse.value = !showAddWarehouse.value;
};
</script>

<template>
  <div class="warehouse-management">
    <h1 class="page-title">8，仓储管理</h1>
    
    <div class="warehouse-container">
      <div class="warehouse-header">
        <div class="warehouse-selector" @click="toggleAddWarehouse">
          <div class="selected-warehouse">
            <span class="material-icons">place</span>
            {{ selectedWarehouse.name }}
          </div>
          <span class="material-icons">expand_more</span>
          
          <div class="warehouse-dropdown" v-if="showAddWarehouse">
            <div
              v-for="warehouse in warehouses"
              :key="warehouse.id"
              class="warehouse-option"
              :class="{ active: selectedWarehouse.id === warehouse.id }"
              @click.stop="selectWarehouse(warehouse)"
            >
              <div class="warehouse-name">{{ warehouse.name }}</div>
              <div class="warehouse-address">{{ warehouse.address }}</div>
            </div>
            <div class="warehouse-option add-option">
              <span class="material-icons">add</span>
              + 添加站点
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-outline">保存数据</button>
          <button class="btn btn-primary">新增入库</button>
        </div>
      </div>
      
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">待入库</div>
          <div class="stat-value">{{ warehouseStats.incoming }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">待取型</div>
          <div class="stat-value">{{ warehouseStats.inStorage }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">待出库</div>
          <div class="stat-value">{{ warehouseStats.outgoing }}</div>
        </div>
      </div>
      
      <div class="warehouse-content">
        <div class="storage-section">
          <div class="chart-container">
            <div class="chart-header">
              <h3>库存预警趋势</h3>
              <div class="tab-buttons">
                <button :class="{ active: activeTab === '周' }" @click="toggleTab('周')">周</button>
                <button :class="{ active: activeTab === '天' }" @click="toggleTab('天')">天</button>
              </div>
            </div>
            <BarChart :chartData="dailyOrderData" height="200px" />
          </div>
          
          <div class="storage-grid">
            <h3>货位容量</h3>
            <div class="grid-container">
              <div class="grid-row" v-for="row in 5" :key="row">
                <div
                  v-for="col in 5"
                  :key="col"
                  class="grid-cell"
                  :class="{
                    'filled': (row <= 2 && col <= 4) || (row === 3 && col <= 2),
                    'partial': row === 3 && col > 2 && col <= 4,
                    'empty': row > 3 || (row === 3 && col === 5) || (row <= 2 && col === 5)
                  }"
                ></div>
              </div>
            </div>
            <div class="usage-info">
              <div class="usage-label">已使用容量</div>
              <div class="usage-value">{{ warehouseStats.usagePercentage }}%</div>
            </div>
          </div>
        </div>
        
        <div class="items-section">
          <h3>仓储订单详情</h3>
          <div class="items-table">
            <div class="table-header">
              <div class="header-cell">订单 #</div>
              <div class="header-cell">取货人</div>
              <div class="header-cell">联系方式</div>
              <div class="header-cell">货物名称</div>
              <div class="header-cell">件数 #</div>
              <div class="header-cell">货期时间 #</div>
              <div class="header-cell">应付金额 #</div>
            </div>
            <div class="table-body">
              <div class="table-row" v-for="item in warehouseItems" :key="item.orderId">
                <div class="table-cell">{{ item.orderId }}</div>
                <div class="table-cell">{{ item.customer }}</div>
                <div class="table-cell">{{ item.contactPhone }}</div>
                <div class="table-cell">{{ item.itemName }}</div>
                <div class="table-cell">{{ item.quantity }}</div>
                <div class="table-cell">{{ item.storageTime }}</div>
                <div class="table-cell">{{ item.amount }}元</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="staff-section">
          <h3>所在站点工作人员</h3>
          <div class="staff-count">{{ warehouseStats.staffCount }}人</div>
          <div class="staff-list">
            <div class="staff-card" v-for="(staff, index) in warehouseStaff" :key="index">
              <div class="staff-avatar">
                <img :src="`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${30 + index}.jpg`" alt="Staff Avatar">
              </div>
              <div class="staff-info">
                <div class="staff-name">{{ staff.name }}</div>
                <div class="staff-position">{{ staff.position }}</div>
              </div>
              <div class="staff-phone">{{ staff.phone }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.warehouse-management {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.warehouse-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.warehouse-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  .warehouse-selector {
    position: relative;
    
    .selected-warehouse {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      cursor: pointer;
      
      .material-icons {
        margin-right: 8px;
        color: var(--primary-color);
      }
    }
    
    .material-icons:last-child {
      margin-left: 8px;
    }
    
    .warehouse-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;
      margin-top: 4px;
      
      .warehouse-option {
        padding: 12px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        &:hover {
          background-color: #f9f9f9;
        }
        
        &.active {
          background-color: rgba(255, 152, 0, 0.05);
        }
        
        .warehouse-name {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .warehouse-address {
          font-size: 12px;
          color: var(--text-secondary);
        }
        
        &.add-option {
          display: flex;
          align-items: center;
          color: var(--primary-color);
          
          .material-icons {
            margin-right: 8px;
          }
        }
      }
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 12px;
  }
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  .stat-card {
    text-align: center;
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    
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

.warehouse-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 20px;
  
  .storage-section {
    grid-column: 1 / span 2;
    grid-row: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
    .chart-container {
      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        
        h3 {
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
    
    .storage-grid {
      h3 {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
      }
      
      .grid-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
        
        .grid-row {
          display: flex;
          gap: 8px;
          
          .grid-cell {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            
            &.filled {
              background-color: var(--primary-color);
            }
            
            &.partial {
              background-color: rgba(255, 152, 0, 0.5);
            }
            
            &.empty {
              background-color: #e0e0e0;
            }
          }
        }
      }
      
      .usage-info {
        text-align: right;
        
        .usage-label {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        
        .usage-value {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  
  .items-section {
    grid-column: 1 / span 2;
    grid-row: 2;
    
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .items-table {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      
      .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr 0.5fr;
        background-color: #f5f5f5;
        
        .header-cell {
          padding: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          font-size: 13px;
        }
      }
      
      .table-body {
        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr 0.5fr 0.5fr;
          border-top: 1px solid #f0f0f0;
          
          .table-cell {
            padding: 12px;
            font-size: 13px;
          }
        }
      }
    }
  }
  
  .staff-section {
    grid-column: 1 / span 2;
    grid-row: 3;
    
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
      display: inline-block;
    }
    
    .staff-count {
      display: inline-block;
      margin-left: 12px;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .staff-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 16px;
      
      .staff-card {
        display: flex;
        align-items: center;
        
        .staff-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .staff-info {
          flex: 1;
          
          .staff-name {
            font-weight: 500;
          }
          
          .staff-position {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
        
        .staff-phone {
          font-size: 12px;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .warehouse-content {
    grid-template-columns: 1fr;
    
    .storage-section {
      grid-column: 1;
      grid-template-columns: 1fr;
    }
    
    .items-section, .staff-section {
      grid-column: 1;
    }
  }
  
  .items-table {
    .table-header, .table-row {
      grid-template-columns: 1fr 1fr 1fr 1fr !important;
      
      .header-cell:nth-child(n+5), .table-cell:nth-child(n+5) {
        display: none;
      }
    }
  }
}
</style>