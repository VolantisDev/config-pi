import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import System from '@/views/System'
import Info from '@/views/system/Info'
import Wifi from '@/views/system/Wifi'
import Hostname from '@/views/system/Hostname'
import UPnP from '@/views/system/UPnP'
import Users from '@/views/system/Users'
import Services from '@/views/Services'
import Firewall from '@/views/services/Firewall'
import Settings from '@/views/Settings'
import ConfigPortal from '@/views/settings/ConfigPortal'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/dashboard',
  name: 'Home',
  component: Full,
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/system',
      name: 'System',
      component: System,
      children: [
        {
          path: '/system/info',
          name: 'Info',
          component: Info
        },
        {
          path: '/system/hostname',
          name: 'Hostname',
          component: Hostname
        },
        {
          path: 'wifi',
          name: 'Wifi',
          component: Wifi
        },
        {
          path: 'upnp',
          name: 'UPnP',
          component: UPnP
        },
        {
          path: 'firewall',
          name: 'Firewall',
          component: Firewall
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
        }
      ]
    },
    {
      path: 'services',
      name: 'Services',
      component: Services,
      children: []
    },
    {
      path: 'settings',
      name: 'Settings',
      component: Settings,
      children: [
        {
          path: 'config-portal',
          name: 'Config Portal',
          component: ConfigPortal
        }
      ]
    }
  ]
}]

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routes
})
