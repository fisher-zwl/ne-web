import Vue from 'vue'
import Router from 'vue-router'
import ConversionCode from '../main/ConversionCode.vue'
import Login from '../main/Login.vue'
import Menu from '../main/Menu.vue'
import Admin from '../main/Admin.vue'
import Order from '../main/Order.vue'
import Product from '../main/Product.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu,
      children: [
        {
          path: '/',
          name: 'Order',
          component: Order
        }, {
          path: '/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/cc',
          name: 'ConversionCode',
          component: ConversionCode
        }, {
          path: '/product',
          name: 'Product',
          component: Product
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
