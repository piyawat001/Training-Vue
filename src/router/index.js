import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import AdminPanel from '../components/AdminPanel.vue';
import ProductGrid from '../components/ProductGrid.vue';
import Toolbar from '../components/Toolbar.vue';
import GetOrder from '../components/GetOrder.vue'
import store from '../store';
import CartComponent from '../components/CartComponent.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    component: Toolbar,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'products',
        name: 'ProductGrid',
        component: ProductGrid
      },
      {
        path: 'order',
        name: 'GetOrder',
        component: GetOrder
      },
      {
        path: 'cart',
        name: 'Cart',
        component: CartComponent
      },
      {
        path: 'admin',
        name: 'AdminPanel',
        component: AdminPanel,
        meta: {
          isAdmin: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/login'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else if (!store.getters.isLoggedIn) {
    next('/login');
  } else if (to.matched.some(record => record.meta.isAdmin) && !store.getters.isAdmin) {
    next('/home');
  } else {
    next();
  }
});

export default router;