<template>
  <div class="product-grid">
    <h1>Products</h1>
    <button v-if="isAdmin" @click="showAddPopup = true" class="add-btn">Add Product</button>
    <div v-if="loading">Loading...</div>
    <div v-else class="grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.imageUrl" :alt="product.name" class="product-image">
        <h3>{{ product.name }}</h3>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <p class="stock">จำนวณ {{(product.stock)}} ชิ้น</p>
        <button @click="addToCart(product)">Add to Cart</button>
        <button v-if="isAdmin" @click="editProduct(product)">Edit</button>
        <button v-if="isAdmin" @click="deleteProduct(product)" class="delete-btn">Delete</button>
      </div>
    </div>
    
    <!-- Edit Popup -->
    <div v-if="showEditPopup" class="edit-popup">
      <div class="edit-popup-content">
        <h2>Edit Product</h2>
        <input v-model="editedProduct.name" placeholder="Name">
        <input v-model.number="editedProduct.price" type="number" step="0.01" placeholder="Price">
        <input v-model.number="editedProduct.stock" type="number" placeholder="Stock">
        <input v-model="editedProduct.imageUrl" placeholder="Image URL">
        <button @click="updateProduct">Save</button>
        <button @click="showEditPopup = false">Cancel</button>
      </div>
    </div>

    <!-- Add Product Popup -->
    <div v-if="showAddPopup" class="edit-popup">
      <div class="edit-popup-content">
        <h2>Add New Product</h2>
        <input v-model="newProduct.name" placeholder="Name">
        <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price">
        <input v-model.number="newProduct.stock" type="number" placeholder="Stock">
        <input v-model="newProduct.imageUrl" placeholder="Image URL">
        <button @click="addNewProduct">Add</button>
        <button @click="showAddPopup = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductGrid',
  data() {
    return {
      products: [],
      loading: false,
      isAdmin: false,
      token: '',
      editedProduct: null,
      showEditPopup: false,
      showAddPopup: false,
      newProduct: {
        name: '',
        price: 0,
        stock: 0,
        imageUrl: ''
      }
    }
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const productIndex = cart.findIndex(item => item._id === product._id);

      if (productIndex !== -1) {
        if (cart[productIndex].quantity < product.stock) {
          cart[productIndex].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log(`Added ${product.name} to cart`);
          this.$router.push('/cart');
        } else {
          alert(`Sorry, we only have ${product.stock} ${product.name}(s) in stock.`);
        }
      } else {
        if (product.stock > 0) {
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log(`Added ${product.name} to cart`);
          this.$router.push('/cart');
        } else {
          alert(`Sorry, ${product.name} is out of stock.`);
        }
      }
    },
    fetchProducts() {
  this.loading = true;
  const token = localStorage.getItem('token');

  axios.get('http://localhost:3000/api/v1/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    console.log('Raw response:', response);
    if (response.data && Array.isArray(response.data)) {
      this.products = response.data;
    } else if (response.data && typeof response.data === 'object') {
      this.products = response.data.data;
    } else {
      console.error("Unexpected response format", response.data);
      this.products = [];
    }
  })
  .catch((error) => {
    console.error("There was an error fetching the products!", error);
    this.products = [];
  })
  .finally(() => {
    this.loading = false; // เมื่อโหลดเสร็จสิ้นให้ตั้งค่า loading เป็น false เท่านั้น
  });
},
    editProduct(product) {
      this.editedProduct = { ...product };
      this.showEditPopup = true;
    },
    updateProduct() {
      this.loading = true;
      const token = localStorage.getItem('token');

      const updatedData = {
        name: this.editedProduct.name,
        price: this.editedProduct.price,
        stock: this.editedProduct.stock,
        imageUrl: this.editedProduct.imageUrl
      };

      axios.put(`http://localhost:3000/api/v1/products/${this.editedProduct._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        
        // Update the product in the local array
        const index = this.products.findIndex(p => p._id === this.editedProduct._id);
        if (index !== -1) {
          this.products[index] = response.data;
        }

        this.showEditPopup = false;
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        this.loading = true;
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:3000/api/v1/products/${product._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          console.log('Product deleted successfully');
          // Remove the product from the local array
          this.products = this.products.filter(p => p._id !== product._id);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        })
        .finally(() => {
          this.loading = false;
        });
      }
    },
    addNewProduct() {
      this.loading = true;
      const token = localStorage.getItem('token');

      axios.post('http://localhost:3000/api/v1/products', this.newProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Product added successfully:', response.data);
        this.products.push(response.data);
        this.showAddPopup = false;
        this.newProduct = { name: '', price: 0, stock: 0, imageUrl: '' };
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  created() {
    this.token = localStorage.getItem('token') || '';
    this.isAdmin = true; // Set this based on your logic
    this.fetchProducts();
  }
}
</script>

<style scoped>
.product-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

h3 {
  font-size: 18px;
  margin: 15px 0 10px;
  padding: 0 15px;
}

.price {
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 15px;
  padding: 0 15px;
}

button {
  display: block;
  width: calc(100% - 30px);
  margin: 0 15px 15px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.edit-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.edit-popup-content input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.edit-popup-content button {
  margin-right: 10px;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.add-btn {
  display: block;
  width: 200px;
  margin: 0 auto 20px;
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #27ae60;
}
</style>