<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username or Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <router-link to="/register" class="register-link">
      <button class="register-button">Register</button>
    </router-link>
    <div v-if="showIcon" :class="['icon', status]">
      <div  v-if="status === 'success'"></div>
      <div class="error-cross" v-else></div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      isLoading: false,
      showIcon: false,
      status: ''
    }
  },
  methods: {
    async login() {
      if (!this.validateForm()) return;
      
      this.isLoading = true;
      this.error = null;
      this.showIcon = false;

      try {
        await this.$store.dispatch('login', { 
          username: this.username, 
          password: this.password 
        });
        this.showIcon = true;
        this.status = 'success';
        setTimeout(() => {
          this.$router.push('/products');
        }, 1500);
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred during login';
        this.showIcon = true;
        this.status = 'error';
      } finally {
        this.isLoading = false;
      }
    },
    validateForm() {
      if (!this.username || !this.password) {
        this.error = 'Please enter both username or email and password';
        return false;
      }
      return true;
    }
  }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 0.5s ease-out;
}

h2 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

button {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  animation: pulse 0.5s infinite;
}

button:disabled {
  background: linear-gradient(45deg, #95a5a6, #7f8c8d);
  cursor: not-allowed;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
}

.register-button {
  background: linear-gradient(45deg, #cc2e43, #ee102a);
  color: white;
  border: none;
  padding: 1rem;
  margin: 2rem auto;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.register-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 300;
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

.icon {
  width: 80px;
  height: 80px;
  margin: 1rem auto;
  border-radius: 50%;
  padding: 2px;
  position: relative;
  box-sizing: content-box;
}

.success {
  border: 4px solid #4CAF50;
}

.error {
  border: 4px solid #F44336;
}

.success-checkmark {
  width: 56px;
  height: 100px;
  border-right: 4px solid #4CAF50;
  border-top: 4px solid #4CAF50;
  margin-left: 16px;
  transform: rotate(135deg);
  animation: checkmark 0.3s ease-in-out;
}

.error-cross {
  position: relative;
  height: 80px;
  width: 80px;
}

.error-cross::before,
.error-cross::after {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 4px;
  background: #F44336;
  border-radius: 2px;
}

.error-cross::before {
  transform: rotate(45deg);
}

.error-cross::after {
  transform: rotate(-45deg);
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }
  40% {
    height: 0;
    width: 30px;
    opacity: 1;
  }
  100% {
    height: 100px;
    width: 56px;
    opacity: 1;
  }
}

@keyframes crossmark {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.success .success-checkmark {
  animation: checkmark 0.3s ease-in-out 0.2s forwards;
}

.error .error-cross::before,
.error .error-cross::after {
  animation: crossmark 0.3s ease-in-out 0.2s forwards;
}
</style>
