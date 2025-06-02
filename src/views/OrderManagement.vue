<script setup lang="ts">
import { ref, computed } from 'vue';
import { orders } from '../data/mockData';

const selectedOrder = ref(orders[0]);
const searchQuery = ref('');
const filterDate = ref('');
const filterOrigin = ref('');
const filterStatus = ref('');

const filteredOrders = computed(() => {
  return orders.filter(order => {
    const searchText = searchQuery.value.toLowerCase();
    const matchesSearch = searchQuery.value === '' || 
      order.id.toLowerCase().includes(searchText) ||
      order.sender.name.toLowerCase().includes(searchText) ||
      order.receiver.name.toLowerCase().includes(searchText) ||
      order.origin.toLowerCase().includes(searchText) ||
      order.destination.toLowerCase().includes(searchText) ||
      order.items.some(item => item.name.toLowerCase().includes(searchText));
    
    const matchesDate = filterDate.value === '' || order.date.includes(filterDate.value);
    const matchesOrigin = filterOrigin.value === '' || order.origin === filterOrigin.value;
    const matchesStatus = filterStatus.value === '' || order.status === filterStatus.value;
    
    return matchesSearch && matchesDate && matchesOrigin && matchesStatus;
  });
});

const clearFilter = (filter: string) => {
  switch(filter) {
    case 'date':
      filterDate.value = '';
      break;
    case 'origin':
      filterOrigin.value = '';
      break;
    case 'status':
      filterStatus.value = '';
      break;
    default:
      break;
  }
};

const selectOrder = (order: any) => {
  selectedOrder.value = order;
};
</script>

<template>
  <div class="order-management">
    <h1 class="page-title">2，订单管理</h1>
    
    <div class="order-container">
      <div class="order-list">
        <div class="filter-bar">
          <div class="search-container">
            <div class="search-bar">
              <span class="material-icons search-icon">search</span>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="搜索订单号, 发货人, 收货人, 货物信息......" 
              />
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
        
        <div class="active-filters" v-if="filterDate || filterOrigin || filterStatus">
          <div class="filter-tag" v-if="filterDate">
            {{ filterDate }}
            <span class="close-icon" @click="clearFilter('date')">×</span>
          </div>
          <div class="filter-tag" v-if="filterOrigin">
            {{ filterOrigin }}
            <span class="close-icon" @click="clearFilter('origin')">×</span>
          </div>
          <div class="filter-tag" v-if="filterStatus">
            {{ filterStatus }}
            <span class="close-icon" @click="clearFilter('status')">×</span>
          </div>
        </div>
        
        <div class="orders">
          <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="order-item"
            :class="{ active: selectedOrder && selectedOrder.id === order.id }"
            @click="selectOrder(order)"
          >
            <div class="order-id">{{ order.id }}</div>
            <div class="order-locations">
              <div>{{ order.origin }}</div>
              <div>{{ order.destination }}</div>
            </div>
            <div class="order-status" :class="`status-${order.status === '已入库' ? 'completed' : 'pending'}`">
              {{ order.status }}
            </div>
            <div class="order-date">{{ order.date }}</div>
          </div>
        </div>
      </div>
      
      <div class="order-details" v-if="selectedOrder">
        <div class="order-header">
          <h2>订单信息</h2>
          <div class="order-id">#{{ selectedOrder.id }}</div>
        </div>
        
        <div class="status-timeline">
          <div class="timeline-item active">
            <div class="timeline-icon">
              <span class="material-icons">inventory</span>
            </div>
            <div class="timeline-text">未入库</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">
              <span class="material-icons">local_shipping</span>
            </div>
            <div class="timeline-text">配送中</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">
              <span class="material-icons">check_circle</span>
            </div>
            <div class="timeline-text">已签收</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">
              <span class="material-icons">star</span>
            </div>
            <div class="timeline-text">已评价</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon">
              <span class="material-icons">done_all</span>
            </div>
            <div class="timeline-text">已完成</div>
          </div>
        </div>
        
        <div class="order-info-container">
          <div class="order-update">
            <div class="update-icon">
              <span class="material-icons">schedule</span>
            </div>
            <div class="update-text">
              2023-08-18-15:45 于甘井子区派件中
            </div>
          </div>
          
          <div class="order-addresses">
            <div class="address-container sender">
              <div class="address-label">发货地址</div>
              <div class="address-value">{{ selectedOrder.sender.address }}</div>
              <div class="address-contact">
                <div class="contact-name">发货人</div>
                <div class="contact-value">{{ selectedOrder.sender.name }}</div>
              </div>
              <div class="address-contact">
                <div class="contact-name">电话</div>
                <div class="contact-value">{{ selectedOrder.sender.phone }}</div>
              </div>
            </div>
            
            <div class="address-container receiver">
              <div class="address-label">收货地址</div>
              <div class="address-value">{{ selectedOrder.receiver.address }}</div>
              <div class="address-contact">
                <div class="contact-name">收货人</div>
                <div class="contact-value">{{ selectedOrder.receiver.name }}</div>
              </div>
              <div class="address-contact">
                <div class="contact-name">电话</div>
                <div class="contact-value">{{ selectedOrder.receiver.phone }}</div>
              </div>
            </div>
          </div>
          
          <div class="order-details-table">
            <div class="detail-row">
              <div class="detail-label">物品</div>
              <div class="detail-value">{{ selectedOrder.items[0].name }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">件数</div>
              <div class="detail-value">{{ selectedOrder.items[0].quantity }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">重量</div>
              <div class="detail-value">{{ selectedOrder.items[0].weight }}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">付款方式</div>
              <div class="detail-value">到付</div>
            </div>
          </div>
          
          <div class="payment-details">
            <div class="payment-header">支付金额</div>
            <div class="payment-row">
              <div class="payment-label">运费</div>
              <div class="payment-value">{{ selectedOrder.payment.amount }}元</div>
            </div>
            <div class="payment-row">
              <div class="payment-label">件数附加费</div>
              <div class="payment-value">{{ selectedOrder.payment.packageCount }}元</div>
            </div>
            <div class="payment-row">
              <div class="payment-label">保价保险费</div>
              <div class="payment-value">{{ selectedOrder.payment.insuranceFee }}元</div>
            </div>
            <div class="payment-row">
              <div class="payment-label">派送费用</div>
              <div class="payment-value">{{ selectedOrder.payment.deliveryFee }}元</div>
            </div>
            <div class="payment-row total">
              <div class="payment-label">合计总金额</div>
              <div class="payment-value">{{ selectedOrder.payment.totalAmount }}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-management {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.order-container {
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 20px;
}

.order-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.filter-bar {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .search-container {
    flex: 1;
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

.active-filters {
  padding: 8px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #f0f0f0;
  
  .filter-tag {
    padding: 4px 8px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    
    .close-icon {
      margin-left: 4px;
      cursor: pointer;
      font-weight: bold;
    }
  }
}

.orders {
  flex: 1;
  overflow-y: auto;
  
  .order-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f9f9f9;
    }
    
    &.active {
      background-color: rgba(255, 152, 0, 0.05);
      border-left: 3px solid var(--primary-color);
    }
    
    .order-id {
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .order-locations {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 13px;
    }
    
    .order-status {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-bottom: 8px;
      
      &.status-pending {
        background-color: rgba(255, 152, 0, 0.1);
        color: var(--primary-color);
      }
      
      &.status-completed {
        background-color: rgba(33, 150, 243, 0.1);
        color: var(--secondary-color);
      }
    }
    
    .order-date {
      font-size: 12px;
      color: var(--text-secondary);
    }
  }
}

.order-details {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      font-size: 18px;
      font-weight: 600;
    }
    
    .order-id {
      font-weight: 500;
      color: var(--text-secondary);
    }
  }
}

.status-timeline {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 20px;
    right: 20px;
    height: 2px;
    background-color: #e0e0e0;
    z-index: 1;
  }
  
  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    
    .timeline-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      
      .material-icons {
        font-size: 16px;
        color: white;
      }
    }
    
    .timeline-text {
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    
    &.active {
      .timeline-icon {
        background-color: var(--primary-color);
      }
      
      .timeline-text {
        color: var(--primary-color);
        font-weight: 500;
      }
    }
  }
}

.order-info-container {
  .order-update {
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: rgba(255, 152, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    
    .update-icon {
      margin-right: 12px;
      
      .material-icons {
        color: var(--primary-color);
      }
    }
    
    .update-text {
      font-size: 14px;
    }
  }
  
  .order-addresses {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
    
    .address-container {
      padding: 16px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      
      .address-label {
        font-weight: 500;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        
        &::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
      
      &.sender .address-label::before {
        background-color: var(--primary-color);
      }
      
      &.receiver .address-label::before {
        background-color: var(--secondary-color);
      }
      
      .address-value {
        margin-bottom: 12px;
        line-height: 1.5;
      }
      
      .address-contact {
        display: flex;
        margin-bottom: 4px;
        
        .contact-name {
          width: 60px;
          color: var(--text-secondary);
        }
        
        .contact-value {
          font-weight: 500;
        }
      }
    }
  }
  
  .order-details-table {
    margin-bottom: 20px;
    
    .detail-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .detail-label {
        width: 100px;
        color: var(--text-secondary);
      }
      
      .detail-value {
        font-weight: 500;
      }
    }
  }
  
  .payment-details {
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 16px;
    
    .payment-header {
      font-weight: 500;
      margin-bottom: 12px;
    }
    
    .payment-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      .payment-label {
        color: var(--text-secondary);
      }
      
      .payment-value {
        font-weight: 500;
      }
      
      &.total {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px dashed #e0e0e0;
        
        .payment-label, .payment-value {
          font-weight: bold;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .order-container {
    grid-template-columns: 1fr;
  }
  
  .order-addresses {
    grid-template-columns: 1fr !important;
  }
}
</style>