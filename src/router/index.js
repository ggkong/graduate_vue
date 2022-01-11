import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About'
import Book from '../views/Book'
import Index from '../views/Index'
import NewClub from '../views/NewClub'
import upload from '../views/UpLoadTest'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/newclub',
    name: 'NewClub',
    component: NewClub
  },
  {
    path: '/about',
    name: 'About',
    component: About
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

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
