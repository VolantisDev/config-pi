<template>
  <v-list>
    <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
      <v-list-tile slot="item">
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-item v-for="subItem in item.items" v-bind:key="subItem.title">
        <v-list-tile :router="true" :href="subItem.route">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import EventBus from '../../event-bus.js'

export default {
  name: 'sidebar_menu',
  data () {
    return {
      items: [
        {
          action: 'home',
          title: 'Home',
          items: [
            {
              action: 'dashboard',
              title: 'Dashboard',
              route: '/dashboard'
            }
          ]
        },
        {
          action: 'developer_board',
          title: 'System',
          items: [
            {
              action: 'info',
              title: 'System Info',
              route: '/system/info'
            },
            {
              action: 'settings_ethernet',
              title: 'Hostname',
              route: '/system/hostname'
            },
            {
              action: 'network_wifi',
              title: 'Wifi',
              route: '/system/wifi'
            },
            {
              action: 'router',
              title: 'UPnP',
              route: '/system/upnp'
            },
            {
              action: 'account_circle',
              title: 'Users',
              route: '/system/users'
            }
          ]
        },
        {
          action: 'dns',
          title: 'Services',
          items: [
            {
              action: 'security',
              title: 'Firewall',
              route: '/services/firewall'
            }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          items: [
            {
              action: 'phonelink_setup',
              title: 'Config Portal',
              route: '/settings/config-portal'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenuItem (location) {
      this.$router.push(location)
      EventBus.$emit('close-left-sidenav')
    }
  }
}
</script>

<style lang="scss">

</style>
