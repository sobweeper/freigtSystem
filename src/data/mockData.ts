// Mock data for the logistics management system

// Dashboard data
export const dashboardStats = {
  orderCount: 502,
  packageCount: 1456,
  todayDeliveries: 1919,
  avgDeliveryTime: 16.5
};

export const dailyOrderData = {
  xAxisData: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
  series: [
    {
      name: '订单',
      data: [320, 350, 300, 250, 80, 150, 400],
      color: '#FF9800'
    }
  ]
};

export const trendAnalysisData = {
  xAxisData: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日'],
  series: [
    {
      name: '出库',
      data: [420, 532, 601, 534, 490, 630, 520, 410],
      color: '#FF9800',
      areaStyle: true
    },
    {
      name: '运送',
      data: [320, 432, 501, 434, 390, 530, 410, 320],
      color: '#9C27B0',
      areaStyle: true
    }
  ]
};

export const deliveryRoutes = [
  { 
    id: 1,
    origin: '大连市-甘井子区',
    destination: '大连市-旅顺口区',
    time: '8-13-10:31' 
  },
  { 
    id: 2,
    origin: '大连市-西岗区',
    destination: '大连市-甘井子区',
    time: '8-13-10:31' 
  },
  { 
    id: 3,
    origin: '大连市-金州',
    destination: '大连市-沙河口区',
    time: '8-13-10:31' 
  },
  { 
    id: 4,
    origin: '大连市-沙河口',
    destination: '大连市-旅顺口区',
    time: '8-13-10:31' 
  },
  { 
    id: 5,
    origin: '大连市-旅顺口区',
    destination: '大连市-高新园区',
    time: '8-13-10:31' 
  },
  { 
    id: 6,
    origin: '大连市-高新园',
    destination: '大连市-金州',
    time: '8-13-10:31' 
  }
];

// Order management data
export const orders = [
  {
    id: '#0008421323',
    origin: '大连市-甘井子区',
    destination: '大连市-旅顺口区',
    status: '未入库',
    driver: '郭德纲',
    phone: '13600006052',
    date: '2023-08-18-15:45',
    items: [
      {
        name: '水果',
        quantity: 4,
        weight: '500kg'
      }
    ],
    payment: {
      amount: 98,
      packageCount: 2,
      insuranceFee: 0,
      deliveryFee: 0,
      totalAmount: 100
    },
    sender: {
      name: '郭德纲',
      phone: '13600006052',
      address: '辽宁省-大连市-甘井子区-东海街45号-2期间-进门左手第一间-东屋'
    },
    receiver: {
      name: '于谦',
      phone: '13600006052',
      address: '辽宁省-大连市-旅顺口区-新城大街594-5号'
    }
  },
  {
    id: '#0008421324',
    origin: '大连市-中山区',
    destination: '大连市-甘井子区',
    status: '已入库',
    driver: '郭德纲',
    phone: '13600006052',
    date: '2023-08-18-15:45',
    items: [
      {
        name: '家具',
        quantity: 2,
        weight: '200kg'
      }
    ],
    payment: {
      amount: 75,
      packageCount: 1,
      insuranceFee: 5,
      deliveryFee: 20,
      totalAmount: 100
    },
    sender: {
      name: '郭德纲',
      phone: '13600006052',
      address: '辽宁省-大连市-中山区-长江街12号'
    },
    receiver: {
      name: '于谦',
      phone: '13600006052',
      address: '辽宁省-大连市-甘井子区-东海街45号'
    }
  },
  {
    id: '#0008421325',
    origin: '大连市-西岗区',
    destination: '大连市-甘井子区',
    status: '未入库',
    driver: '郭德纲',
    phone: '13600006052',
    date: '2023-08-18-15:45',
    items: [
      {
        name: '电子产品',
        quantity: 1,
        weight: '50kg'
      }
    ],
    payment: {
      amount: 120,
      packageCount: 1,
      insuranceFee: 10,
      deliveryFee: 20,
      totalAmount: 150
    },
    sender: {
      name: '郭德纲',
      phone: '13600006052',
      address: '辽宁省-大连市-西岗区-五四路10号'
    },
    receiver: {
      name: '于谦',
      phone: '13600006052',
      address: '辽宁省-大连市-甘井子区-东海街45号'
    }
  },
  {
    id: '#0008421326',
    origin: '大连市-中山区',
    destination: '大连市-甘井子区',
    status: '已入库',
    driver: '郭德纲',
    phone: '13600006052',
    date: '2023-08-18-15:45',
    items: [
      {
        name: '办公用品',
        quantity: 3,
        weight: '30kg'
      }
    ],
    payment: {
      amount: 60,
      packageCount: 1,
      insuranceFee: 0,
      deliveryFee: 20,
      totalAmount: 80
    },
    sender: {
      name: '郭德纲',
      phone: '13600006052',
      address: '辽宁省-大连市-中山区-长江街12号'
    },
    receiver: {
      name: '于谦',
      phone: '13600006052',
      address: '辽宁省-大连市-甘井子区-东海街45号'
    }
  },
  {
    id: '#0008421327',
    origin: '大连市-沙河口区',
    destination: '大连市-西岗区',
    status: '配送中',
    driver: '于谦',
    phone: '13600006053',
    date: '2023-08-18-16:30',
    items: [
      {
        name: '服装',
        quantity: 5,
        weight: '25kg'
      }
    ],
    payment: {
      amount: 85,
      packageCount: 1,
      insuranceFee: 5,
      deliveryFee: 15,
      totalAmount: 105
    },
    sender: {
      name: '李四',
      phone: '13600006054',
      address: '辽宁省-大连市-沙河口区-星海广场123号'
    },
    receiver: {
      name: '王五',
      phone: '13600006055',
      address: '辽宁省-大连市-西岗区-人民路45号'
    }
  },
  {
    id: '#0008421328',
    origin: '大连市-金州区',
    destination: '大连市-旅顺口区',
    status: '已签收',
    driver: '岳云鹏',
    phone: '13600006056',
    date: '2023-08-18-14:20',
    items: [
      {
        name: '食品',
        quantity: 2,
        weight: '15kg'
      }
    ],
    payment: {
      amount: 45,
      packageCount: 1,
      insuranceFee: 0,
      deliveryFee: 10,
      totalAmount: 55
    },
    sender: {
      name: '张三',
      phone: '13600006057',
      address: '辽宁省-大连市-金州区-金石滩路78号'
    },
    receiver: {
      name: '李六',
      phone: '13600006058',
      address: '辽宁省-大连市-旅顺口区-滨海路99号'
    }
  },
  {
    id: '#0008421329',
    origin: '大连市-高新园区',
    destination: '大连市-开发区',
    status: '已取消',
    driver: '孙越',
    phone: '13600006059',
    date: '2023-08-18-09:15',
    items: [
      {
        name: '图书',
        quantity: 3,
        weight: '10kg'
      }
    ],
    payment: {
      amount: 35,
      packageCount: 1,
      insuranceFee: 0,
      deliveryFee: 10,
      totalAmount: 45
    },
    sender: {
      name: '王七',
      phone: '13600006060',
      address: '辽宁省-大连市-高新园区-创新路256号'
    },
    receiver: {
      name: '赵八',
      phone: '13600006061',
      address: '辽宁省-大连市-开发区-金马路789号'
    }
  }
];

// Logistics management data
export const logisticsStats = {
  vehicleCount: 58,
  runningVehicles: 24
};

export const vehicleRoutes = [
  {
    id: 'JZB-EM000',
    route: '大连-旅顺',
    driver: '苏喜喜',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日已发车',
    progress: 33,
    orderCount: 50,
    totalOrders: 10,
    details: {
      location: '中山区',
      currentAddress: '中山区长江路65号',
      distance: 5.4,
      stops: 3,
      batteryLevel: 75,
      path: [
        {
          location: '中山区',
          address: '中山区长江路65号',
          time: '8-13-10:31'
        },
        {
          location: '中山区',
          address: '中山区长江路65号',
          time: '8-13-10:42'
        },
        {
          location: '中山区',
          address: '中山区长江路65号',
          time: '8-13-10:55'
        },
        {
          location: '中山区',
          address: '中山区长江路65号',
          time: '8-13-11:10'
        }
      ],
      relatedOrders: [
        { id: '#0008421323', customer: '郭德纲', items: 4, status: '已送达' },
        { id: '#0008421324', customer: '郭德纲', items: 4, status: '配送中' },
        { id: '#0008421325', customer: '郭德纲', items: 4, status: '待配送' },
        { id: '#0008421326', customer: '郭德纲', items: 4, status: '已取消' }
      ]
    }
  },
  {
    id: 'JZB-CD000',
    route: '大连-金州',
    driver: '郝春霞',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日已发车',
    progress: 86,
    orderCount: 50,
    totalOrders: 10
  },
  {
    id: 'JZB-EM001',
    route: '大连-高新园区',
    driver: '苏喜喜',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日已配送',
    progress: 33,
    orderCount: 50,
    totalOrders: 10
  },
  {
    id: 'JZB-CD001',
    route: '大连-金州',
    driver: '郝春霞',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日取消发车',
    progress: 0,
    orderCount: 0,
    totalOrders: 10
  },
  {
    id: 'JZB-EM002',
    route: '大连-旅顺',
    driver: '苏喜喜',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日已发车',
    progress: 33,
    orderCount: 50,
    totalOrders: 10
  },
  {
    id: 'JZB-CD002',
    route: '大连-金州',
    driver: '郝春霞',
    phone: '13600006052',
    startTime: '每天上午10:30发车',
    status: '今日已发车',
    progress: 86,
    orderCount: 50,
    totalOrders: 10
  }
];

// Warehouse management data
export const warehouseStats = {
  incoming: 151,
  inStorage: 120,
  outgoing: 86,
  usagePercentage: 84,
  staffCount: 10
};

export const warehouseItems = [
  {
    orderId: '#0008421323',
    customer: '郭德纲',
    contactPhone: '13600006052',
    itemName: '水果',
    quantity: 1,
    storageTime: '2天',
    amount: 100
  },
  {
    orderId: '#0008421324',
    customer: '郭德纲',
    contactPhone: '13600006052',
    itemName: '水果',
    quantity: 1,
    storageTime: '2天',
    amount: 100
  },
  {
    orderId: '#0008421325',
    customer: '郭德纲',
    contactPhone: '13600006052',
    itemName: '水果',
    quantity: 1,
    storageTime: '1天',
    amount: 100
  },
  {
    orderId: '#0008421326',
    customer: '郭德纲',
    contactPhone: '13600006052',
    itemName: '水果',
    quantity: 1,
    storageTime: '1天',
    amount: 100
  }
];

export const warehouseStaff = [
  {
    name: '刘辉',
    position: '仓库管理员',
    phone: '13600006052'
  },
  {
    name: '黄海',
    position: '分拣员',
    phone: '13600006052'
  },
  {
    name: '黄海',
    position: '分拣员',
    phone: '13600006052'
  },
  {
    name: '金华',
    position: '装卸工',
    phone: '13600006052'
  }
];

export const warehouses = [
  {
    id: 1,
    name: '中三区1号站点',
    address: '大连市中三区凌海路1号',
    storage: 120,
    outgoing: 86
  },
  {
    id: 2,
    name: '西岗区1号站点',
    address: '大连市西岗区香炉礁路',
    storage: 95,
    outgoing: 45
  },
  {
    id: 3,
    name: '西岗区1号站点',
    address: '大连市西岗区香炉礁路',
    storage: 85,
    outgoing: 40
  },
  {
    id: 4,
    name: '旅顺口1号站点',
    address: '大连市旅顺口区黄金路',
    storage: 110,
    outgoing: 65
  }
];

export const notifications = [
  {
    id: 1,
    title: '关于中秋节放假通知',
    isRead: true
  },
  {
    id: 2,
    title: '雨雪恶劣天气, 配送将延迟',
    isRead: false
  },
  {
    id: 3,
    title: '况雪寒天气预报, 提醒大家文明',
    isRead: true
  },
  {
    id: 4,
    title: '关于中秋节放假通知',
    isRead: false
  },
  {
    id: 5,
    title: '雨雪恶劣天气, 配送将延迟',
    isRead: true
  },
  {
    id: 6,
    title: '况雪寒天气预报, 提醒大家文明',
    isRead: false
  }
];