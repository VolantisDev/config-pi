<template>
  <div class="app-footer">
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="home" @click="clickMenuItem('/')">Home</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="developer_board" @click="clickMenuItem('/system')">System</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="dns" @click="clickMenuItem('/services')">Services</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="settings" @click="clickMenuItem('/settings')">Settings</md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>
// import EventBus from '@/event-bus.js'

export default {
  name: 'app_footer',
  methods: {
    clickMenuItem (location) {
      this.$router.push(location)
    }
  }
}
</script>

<style lang="css">
  .app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
