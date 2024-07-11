<template>
    <div class="order-list">
      <h1>แสดง Order ทั้งหมด</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <ul>
          <li v-for="order in orders" :key="order._id">
            <!-- Display order details here -->
            <p><strong>Order ID:</strong> {{ order._id }}</p>
            <p><strong>Customer Name:</strong> {{ order.customerName }}</p>
            <!-- Add more details as needed -->
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        orders: [],
        loading: false
      };
    },
    created() {
      this.fetchOrders();
    },
    methods: {
      fetchOrders() {
        this.loading = true;
        // Replace with your actual API endpoint and token handling
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg3NThjMzlmMzg3NWM2Mjg0YzRjMzAiLCJpYXQiOjE3MjA2NzkwOTksImV4cCI6MTcyMzI3MTA5OX0.Se2OBQNT2cshWMYLNQYee31bvWdXR18mY-xDFsm_t5E';
  
        // Example Axios call (make sure to install axios via npm/yarn)
        axios.get('http://localhost:3000/api/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Orders fetched successfully:', response.data);
          this.orders = response.data; // Assuming response.data is an array of orders
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          // Handle error (e.g., show error message)
        })
        .finally(() => {
          this.loading = false;
        });
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  