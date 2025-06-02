<script setup lang="ts">
// Placeholder for future finance management implementation
</script>

<template>
  <div class="finance-management">
    <h1 class="page-title">财务管理</h1>
    
    <div class="placeholder-container">
      <div class="placeholder-icon">
        <span class="material-icons">account_balance_wallet</span>
      </div>
      <h2>财务管理功能即将上线</h2>
      <p>该功能正在开发中，敬请期待...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.finance-management {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

.placeholder-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 40px;
  text-align: center;
  
  .placeholder-icon {
    width: 80px;
    height: 80px;
    background-color: #f5f5f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    
    .material-icons {
      font-size: 40px;
      color: var(--primary-color);
    }
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  p {
    color: var(--text-secondary);
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>