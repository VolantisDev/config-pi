<template>
  <v-list>
    <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
      <v-list-tile slot="item" :router="true" :href="item.route && !item.items ? item.route : null">
        <v-list-tile-action>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="item.items">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-item v-for="subItem in item.items" v-bind:key="subItem.title">
        <v-list-tile :router="true" :href="subItem.route ? subItem.route : null">
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
import EventBus from '@/event-bus.js'
import menuProcessor from '@/router/menu-processor'
import store from '@/store'

export default {
  name: 'main_menu',
  data () {
    return {
      items: menuProcessor(store.state.routes)
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
