<template>
    <div class="cart-container">
      <h1>Your Shopping Cart</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        Your cart is empty. 
        <router-link to="/">Continue shopping</router-link>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item._id" class="cart-item">
          <img :src="item.imageUrl" :alt="item.name" class="item-image">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Price: {{ formatPrice(item.price) }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Subtotal: {{ formatPrice(item.price * item.quantity) }}</p>
          </div>
          <div class="item-actions">
            <button @click="increaseQuantity(item)">+</button>
            <button @click="decreaseQuantity(item)">-</button>
            <button @click="removeItem(item)" class="remove-btn">Remove</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Total: {{ formatPrice(totalPrice) }}</h2>
          <button @click="checkout" class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartComponent',
    data() {
      return {
        cartItems: []
      }
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    methods: {
      formatPrice(price) {
        return `$${price.toFixed(2)}`;
      },
      loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartItems = cart;
      },
      saveCartItems() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      },
      increaseQuantity(item) {
  if (item.quantity < item.stock) {
    item.quantity += 1;
    this.saveCartItems();
  } else {
    alert(`Sorry, we only have ${item.stock} ${item.name}(s) in stock.`);
  }
},
      decreaseQuantity(item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeItem(item);
        }
        this.saveCartItems();
      },
      removeItem(item) {
        const index = this.cartItems.findIndex(cartItem => cartItem._id === item._id);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
          this.saveCartItems();
        }
      },
      checkout() {
        // Implement checkout logic here
        alert('Proceeding to checkout. This feature is not yet implemented.');
      }
    },
    created() {
      this.loadCartItems();
    }
  }
  </script>
  
  <style scoped>
  .cart-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
  }
  
  .cart-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }
  
  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .item-actions button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-btn {
    background-color: #e74c3c !important;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  
  .checkout-btn {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
  }
  </style>