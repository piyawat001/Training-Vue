<template>
  <div class="home-page">
    <h1>Orders</h1>
    <div v-if="loading">Loading orders...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <table v-if="orders.length">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ formatId(order._id) }}</td>
            <td>{{ formatId(order.product) }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ formatId(order.user) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No orders found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      orders: [],
      loading: true,
      error: null,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg3NThjMzlmMzg3NWM2Mjg0YzRjMzAiLCJpYXQiOjE3MjAxNDY4NTIsImV4cCI6MTcyMjczODg1Mn0.o1G7OL0fqO_flBSpo6zgaSPrDFFqZuLrWHC8Ky-sw20'
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/orders', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.orders = response.data.data;
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch orders. Please try again.';
        this.loading = false;
        console.error('Error fetching orders:', error);
      }
    },
    formatId(id) {
      if (id == null) return 'N/A'; // ถ้า id เป็น null หรือ undefined ให้แสดง 'N/A'
      return id.toString();
    }
  }
};
</script>


<style scoped>
.home-page {
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

.loading, .error {
  color: #666;
  font-style: italic;
}
</style>