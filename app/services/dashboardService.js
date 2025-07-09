
class DashboardService {
  constructor() {
    this.storageKeys = {
      orders: 'dealerOrders',
      stats: 'dealerStats',
      activities: 'dealerActivities'
    };
  }

  initializeData() {
    if (!localStorage.getItem(this.storageKeys.stats)) {
      const defaultStats = {
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        totalSpent: 0,
        monthlyGrowth: 0,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.storageKeys.stats, JSON.stringify(defaultStats));
    }

    if (!localStorage.getItem(this.storageKeys.orders)) {
      localStorage.setItem(this.storageKeys.orders, JSON.stringify([]));
    }

    if (!localStorage.getItem(this.storageKeys.activities)) {
      localStorage.setItem(this.storageKeys.activities, JSON.stringify([]));
    }
  }

  
  getStats() {
    this.initializeData();
    const stats = JSON.parse(localStorage.getItem(this.storageKeys.stats));
    return stats;
  }


  updateStats(newStats) {
    const currentStats = this.getStats();
    const updatedStats = {
      ...currentStats,
      ...newStats,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(this.storageKeys.stats, JSON.stringify(updatedStats));
    return updatedStats;
  }

  
  addOrder(orderData) {
    const orders = this.getOrders();
    const stats = this.getStats();
    
    const newOrder = {
      id: `DP-${Date.now()}`,
      ...orderData,
      status: 'completed',
      orderDate: new Date().toISOString(),
      total: orderData.total || 0
    };

    
    orders.unshift(newOrder); 
    localStorage.setItem(this.storageKeys.orders, JSON.stringify(orders));

 
    const updatedStats = {
      totalOrders: stats.totalOrders + 1,
      completedOrders: stats.completedOrders + 1,
      totalSpent: stats.totalSpent + newOrder.total,
      monthlyGrowth: this.calculateMonthlyGrowth(orders),
      lastUpdated: new Date().toISOString()
    };
    this.updateStats(updatedStats);

    this.addActivity({
      type: 'order_completed',
      message: `Order ${newOrder.id} completed`,
      amount: newOrder.total,
      status: 'completed'
    });

    return newOrder;
  }


  getOrders() {
    this.initializeData();
    return JSON.parse(localStorage.getItem(this.storageKeys.orders));
  }

  
  addActivity(activity) {
    const activities = this.getActivities();
    const newActivity = {
      id: Date.now(),
      ...activity,
      timestamp: new Date().toISOString()
    };
    
    activities.unshift(newActivity); 
    
    
    if (activities.length > 10) {
      activities.splice(10);
    }
    
    localStorage.setItem(this.storageKeys.activities, JSON.stringify(activities));
    return newActivity;
  }

 
  getActivities() {
    this.initializeData();
    return JSON.parse(localStorage.getItem(this.storageKeys.activities));
  }

 
  calculateMonthlyGrowth(orders) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const lastMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
    });

    if (lastMonthOrders.length === 0) return 0;
    
    const growthPercentage = ((currentMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100;
    return Math.round(growthPercentage * 10) / 10; // Round to 1 decimal place
  }


  async getAvailableProductsCount() {
    try {
      
      const cachedCount = localStorage.getItem('availableProductsCount');
      const cacheTimestamp = localStorage.getItem('productsCountTimestamp');
      
    
      if (cachedCount && cacheTimestamp) {
        const hourAgo = Date.now() - (60 * 60 * 1000);
        if (parseInt(cacheTimestamp) > hourAgo) {
          return parseInt(cachedCount);
        }
      }

     
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      const count = products.length * 62; 
    
      localStorage.setItem('availableProductsCount', count.toString());
      localStorage.setItem('productsCountTimestamp', Date.now().toString());
      
      return count;
    } catch (error) {
      console.error('Error fetching products count:', error);
      return 1240; 
    }
  }

  
  resetData() {
    localStorage.removeItem(this.storageKeys.stats);
    localStorage.removeItem(this.storageKeys.orders);
    localStorage.removeItem(this.storageKeys.activities);
    localStorage.removeItem('availableProductsCount');
    localStorage.removeItem('productsCountTimestamp');
    this.initializeData();
  }

 formatCurrency(amount) {
    return `₹${amount.toFixed(2)}`;
  }

  
  getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return time.toLocaleDateString();
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
