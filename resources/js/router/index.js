import { createRouter, createWebHistory } from 'vue-router'
import IndexScreen from '../views/IndexScreen.vue'
import AuthScreen from '../views/AuthScreen.vue'
import FindARideScreen from '../views/FindRideScreen.vue'
import axios from 'axios'
import ConfrimRide from '../views/ConfrimRide.vue'
import WaitingScreen from '../views/WaitingScreen.vue'
import DriveScreen from '../views/DriveScreen.vue'
import DriverSignUpScreen from '../views/DriverSignUpScreen.vue'
import NavigateScreen from '../views/NavigateScreen.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexScreen
    },
    {
      path : '/login',
      name: 'login',
      component: AuthScreen 
    },
    {
      path: '/ride',
      name: 'ride',
      component: FindARideScreen
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfrimRide
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: WaitingScreen
    },
    {
      path: '/drive',
      name: 'drive',
      component: DriveScreen
    },
    {
      path:'/driver',
      name:'driver',
      component:DriverSignUpScreen
    },
    {
      path:'/navigate',
      name:'navigate',
      component:NavigateScreen
    }
  ]
})

router.beforeEach((to,from)=>{
  if (to.name == 'login') {
    return true;
  }
  if (!localStorage.getItem('token')) {
    return {
      name : 'login'
    }
  }


  checkTokenAuthencity()
})


const checkTokenAuthencity = () => {
  axios.get('http://localhost/api/users',{
    headers : {
      Authorization : "Bearer ${localStorage.getItem('token')}"
    }
  }).then((response) => {})
  .catch((error) => {
    localStorage.removeItem('token')
    router.push({
      name : 'login'
    })
  })
}

export default router
