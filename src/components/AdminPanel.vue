<template>
  <div class="admin-panel">
    <h2>Admin Panel</h2>
    <div class="user-list">
      <div v-for="user in users" :key="user._id" class="user-item">
        <div class="user-info">
          <span class="username">{{ user.username }}</span>
          <span class="email">({{ user.email }})</span>
        </div>
        <button 
          v-if="!user.isApproved" 
          @click="approveUser(user._id)"
          class="approve-btn"
        >
          Approve
        </button>
        <span v-else class="approved-tag">Approved</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      users: []
    };
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'approveUser']),
    loadUsers() {
      this.fetchUsers().then(users => {
        this.users = users;
      });
    },
    approveUser(userId) {
      this.approveUser(userId).then(() => {
        this.loadUsers();
      });
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>
  
  <style scoped>
  .admin-panel {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .user-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .username {
    font-weight: bold;
    color: #333;
  }
  
  .email {
    color: #666;
    font-size: 0.9em;
  }
  
  .approve-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .approve-btn:hover {
    background-color: #45a049;
  }
  
  .approved-tag {
    background-color: #dff0d8;
    color: #3c763d;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  @media (max-width: 600px) {
    .user-item {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .approve-btn, .approved-tag {
      margin-top: 10px;
    }
  }
  </style>