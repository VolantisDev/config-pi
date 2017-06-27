<template lang="html">
  <div class="wifi-networks">
    <div class="wifi-networks-actions mb-2">
      <button type="button" class="btn btn-primary">Scan networks</button>
      <label :class="switch_class">
        <input type="checkbox" class="switch-input" :checked="wifi_enabled">
        <span class="switch-label" data-on="On" data-off="Off"></span>
        <span class="switch-handle"></span>
      </label>
    </div>
    <div class="row">
      <div v-for="item in scan_results" class="col-sm-6">
        <WifiNetwork
          :wifi-interface="wifi_interface"
          :ssid="item.ssid"
          :quality="item.quality"
          :frequency="item.frequency"
          :encrypted="item.encrypted"/>
      </div>
      <div v-if="!scan_results" class="col-sm-12">
        <NoWifiNetworksFound/>
      </div>
    </div>
  </div>
</template>

<script>
import WifiNetwork from './WifiNetwork'
import NoWifiNetworksFound from './NoWifiNetworksFound'

export default {
  name: 'wifi_networks',
  components: { WifiNetwork, NoWifiNetworksFound },
  data () {
    return {
      wifi_interface: null,
      wifi_enabled: false,
      scan_results: []
    }
  },
  computed: {
    switch_class () { return 'float-right switch switch-text switch-' + (this.wifi_enabled ? 'primary' : 'danger') + '-outline-alt' }
  },
  mounted () {
    this.axios.get('/api/wifi/getInterface')
      .then(response => {
        this.wifi_interface = response.data.wifi_interface

        if (this.wifi_interface) {
          this.axios.get('/api/wifi/isEnabled/' + this.wifi_interface)
            .then(response => {
              this.wifi_enabled = response.data.is_enabled || false
            })

          this.axios.get('/api/wifi/scan')
            .then(response => {
              // this.scan_results = response.data.scan_results || []
            })
        }
      })
  }
}
</script>

<style>

</style>
