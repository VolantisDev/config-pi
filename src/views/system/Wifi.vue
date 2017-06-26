<template>
  <div class="animated fadeIn">
    <p>Use this screen to set your saved Wifi networks and configure other wifi settings.</p>

    <WifiNetworks></WifiNetworks>
  </div>
</template>

<script>
import WifiNetworks from '@/components/wifi/WifiNetworks'

export default {
  name: 'wifi',
  components: { WifiNetworks }
}
</script>
