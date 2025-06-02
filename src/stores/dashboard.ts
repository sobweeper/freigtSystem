import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // 周数据
  const weeklyOrderData = {
    xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    series: [{
      name: '订单',
      data: [320, 350, 300, 250, 380, 450, 400],
      color: '#FF9800'
    }]
  }

  // 天数据
  const dailyOrderData = {
    xAxisData: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
    series: [{
      name: '订单',
      data: [220, 250, 200, 150, 280, 350, 300],
      color: '#FF9800'
    }]
  }

  // 周趋势数据
  const weeklyTrendData = {
    xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    series: [
      {
        name: '出库',
        data: [420, 532, 601, 534, 490, 630, 520],
        color: '#FF9800',
        areaStyle: true
      },
      {
        name: '运送',
        data: [320, 432, 501, 434, 390, 530, 410],
        color: '#9C27B0',
        areaStyle: true
      }
    ]
  }

  // 天趋势数据
  const dailyTrendData = {
    xAxisData: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
    series: [
      {
        name: '出库',
        data: [320, 432, 501, 434, 390, 530, 410],
        color: '#FF9800',
        areaStyle: true
      },
      {
        name: '运送',
        data: [220, 332, 401, 334, 290, 430, 310],
        color: '#9C27B0',
        areaStyle: true
      }
    ]
  }

  // 当前选中的时间维度
  const currentTimeFrame = ref('周')
  
  // 路线数据
  const routes = ref([...deliveryRoutes])

  // 获取当前数据分析数据
  const getCurrentOrderData = () => {
    return currentTimeFrame.value === '周' ? weeklyOrderData : dailyOrderData
  }

  // 获取当前趋势分析数据
  const getCurrentTrendData = () => {
    return currentTimeFrame.value === '周' ? weeklyTrendData : dailyTrendData
  }

  // 切换时间维度
  const toggleTimeFrame = (timeFrame: '周' | '天') => {
    currentTimeFrame.value = timeFrame
  }

  // 模拟更新路线
  const updateRoutes = () => {
    setInterval(() => {
      routes.value = routes.value.map(route => ({
        ...route,
        time: new Date().toLocaleTimeString()
      }))
    }, 60000) // 每分钟更新一次
  }

  return {
    currentTimeFrame,
    routes,
    getCurrentOrderData,
    getCurrentTrendData,
    toggleTimeFrame,
    updateRoutes
  }
})