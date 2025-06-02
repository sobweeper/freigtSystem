import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import OrderManagement from '../views/OrderManagement.vue'
import LogisticsManagement from '../views/LogisticsManagement.vue'
import VehicleDetail from '../views/VehicleDetail.vue'
import RouteManagement from '../views/RouteManagement.vue'
import WarehouseManagement from '../views/WarehouseManagement.vue'
import FinanceManagement from '../views/FinanceManagement.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/orders',
      name: 'OrderManagement',
      component: OrderManagement
    },
    {
      path: '/logistics',
      name: 'LogisticsManagement',
      component: LogisticsManagement
    },
    {
      path: '/logistics/vehicle/:id',
      name: 'VehicleDetail',
      component: VehicleDetail
    },
    {
      path: '/routes',
      name: 'RouteManagement',
      component: RouteManagement
    },
    {
      path: '/warehouse',
      name: 'WarehouseManagement',
      component: WarehouseManagement
    },
    {
      path: '/finance',
      name: 'FinanceManagement',
      component: FinanceManagement
    }
  ]
})

export default router