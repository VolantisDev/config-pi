import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

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

import routerProcessor from './router-processor'

Vue.use(Router)

export default () => {
  const routes = Object.assign({
    home: {
      parent: null,
      icon: 'home',
      route: {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: Full
      }
    },
    dashboard: {
      parent: 'home',
      icon: 'dashboard',
      route: {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    },
    system: {
      parent: 'home',
      icon: 'developer_board',
      route: {
        path: 'system',
        name: 'System',
        component: System
      }
    },
    system_info: {
      parent: 'system',
      icon: 'info',
      route: {
        path: 'info',
        name: 'Info',
        component: Info
      }
    },
    system_hostname: {
      parent: 'system',
      icon: 'settings_ethernet',
      route: {
        path: 'hostname',
        name: 'Hostname',
        component: Hostname
      }
    },
    system_wifi: {
      parent: 'system',
      icon: 'network_wifi',
      route: {
        path: 'wifi',
        name: 'Wifi',
        component: Wifi
      }
    },
    system_upnp: {
      parent: 'system',
      icon: 'router',
      route: {
        path: 'upnp',
        name: 'UPnP',
        component: UPnP
      }
    },
    system_users: {
      parent: 'system',
      icon: 'account_circle',
      route: {
        path: 'users',
        name: 'Users',
        component: Users
      }
    },
    services: {
      parent: 'home',
      icon: 'dns',
      route: {
        path: 'services',
        name: 'Services',
        component: Services
      }
    },
    services_firewall: {
      parent: 'services',
      icon: 'security',
      route: {
        path: 'firewall',
        name: 'Firewall',
        component: Firewall
      }
    },
    settings: {
      parent: 'home',
      icon: 'settings',
      route: {
        path: 'settings',
        name: 'Settings',
        component: Settings
      }
    },
    settings_config_portal: {
      parent: 'settings',
      icon: 'phonelink_setup',
      route: {
        path: 'config-portal',
        name: 'Config Portal',
        component: ConfigPortal
      }
    }
  }, store.state.routes)

  store.commit('setRoutes', routes)

  return new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: routerProcessor(routes)
  })
}
