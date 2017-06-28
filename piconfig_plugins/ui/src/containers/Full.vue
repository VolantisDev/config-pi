<template>
  <v-app>
    <v-navigation-drawer persistent v-model="drawer" enable-resize-watcher light>
      <MainMenu></MainMenu>
    </v-navigation-drawer>
    <v-toolbar light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Pi Config</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon light @click.native.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <Breadcrumb :list="list"></Breadcrumb>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import EventBus from '@/event-bus'
import Breadcrumb from '@/components/layout/Breadcrumb'
import MainMenu from '@/components/layout/MainMenu'
import AppFooter from '@/components/layout/AppFooter'

export default {
  name: 'full',
  components: {
    Breadcrumb,
    MainMenu,
    AppFooter
  },
  data () {
    return {
      drawer: true,
      drawerRight: true,
      right: null,
      left: null
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  methods: {
    toggleLeftSidenav () {
      EventBus.$emit('toggle-left-sidenav')
    },
    toggleRightSidenav () {
      EventBus.$emit('toggle-right-sidenav')
    }
  }
}
</script>

<style lang="css">
  .app-body {
    padding: 0 1rem;
  }
</style>
