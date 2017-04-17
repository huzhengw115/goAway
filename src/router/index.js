import Vue from 'vue'
import Router from 'vue-router'
import begin from '../pages/begin'
import home from '../pages/home'
import game from '../pages/game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: begin
    }, {
      path: '/home',
      component: home
    }, {
      path: '/game',
      component: game
    }
  ]
})
