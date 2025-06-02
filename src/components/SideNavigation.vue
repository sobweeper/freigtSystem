<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => {
  return computed(() => route.path === path || route.path.startsWith(path + '/'));
};
</script>

<template>
  <div class="side-navigation">
    <div class="logo">
      <span class="logo-text">FAST</span>
      <span class="logo-subtext">Express</span>
    </div>
    
    <div class="nav-links">
      <router-link to="/" class="nav-link" :class="{ active: isActive('/').value }">
        <div class="nav-icon">
          <span class="material-icons">home</span>
        </div>
        <div class="nav-text">首页</div>
      </router-link>
      
      <router-link to="/orders" class="nav-link" :class="{ active: isActive('/orders').value }">
        <div class="nav-icon">
          <span class="material-icons">description</span>
        </div>
        <div class="nav-text">订单管理</div>
      </router-link>
      
      <router-link to="/logistics" class="nav-link" :class="{ active: isActive('/logistics').value }">
        <div class="nav-icon">
          <span class="material-icons">local_shipping</span>
        </div>
        <div class="nav-text">货运管理</div>
      </router-link>
      
      <router-link to="/warehouse" class="nav-link" :class="{ active: isActive('/warehouse').value }">
        <div class="nav-icon">
          <span class="material-icons">store</span>
        </div>
        <div class="nav-text">仓储管理</div>
      </router-link>
      
      <router-link to="/finance" class="nav-link" :class="{ active: isActive('/finance').value }">
        <div class="nav-icon">
          <span class="material-icons">account_balance_wallet</span>
        </div>
        <div class="nav-text">财务管理</div>
      </router-link>
    </div>
    
    <div class="user-profile">
      <div class="avatar">
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User Avatar">
      </div>
      <div class="call-icon">
        <span class="material-icons">call</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-navigation {
  width: 200px;
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
}

.logo {
  padding: 20px;
  display: flex;
  align-items: center;
  
  .logo-text {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary-color);
    margin-right: 4px;
  }
  
  .logo-subtext {
    font-size: 16px;
    font-weight: 500;
  }
}

.nav-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--text-color);
  text-decoration: none;
  margin-bottom: 8px;
  
  &:hover {
    background-color: rgba(255, 152, 0, 0.05);
  }
  
  &.active {
    background-color: rgba(255, 152, 0, 0.1);
    color: var(--primary-color);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--primary-color);
    }
    
    .nav-icon {
      background-color: var(--primary-color);
      color: white;
    }
  }
  
  .nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #f5f5f5;
    margin-right: 12px;
    
    .material-icons {
      font-size: 18px;
    }
  }
  
  .nav-text {
    font-size: 14px;
    font-weight: 500;
  }
}

.user-profile {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .call-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f5f5f5;
    
    .material-icons {
      font-size: 18px;
      color: var(--primary-color);
    }
  }
}
</style>