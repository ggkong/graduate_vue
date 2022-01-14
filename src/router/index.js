import Vue from 'vue'
import VueRouter from 'vue-router'
import Book from '../views/Book'
import Index from '../views/Index'
import NewClub from '../views/NewClub'
import upload from '../views/UpLoadTest'
import main from '../views/main'
import login from '../views/login'
import question from '../views/Question'
import register from '../views/Register'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    redirect: '/index',
    component: main,
    children: [{
        path: '/index',
        name: 'Index',
        component: Index,
      },
      {
        path: '/newclub',
        name: 'NewClub',
        component: NewClub
      },
      {
        path: '/question',
        name: 'question',
        component: question
      },
      {
        path: '/book',
        name: 'Book',
        component: Book
      },
      {
        path: '/upload',
        component: upload
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/register',
    name:'register',
    component:register
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router