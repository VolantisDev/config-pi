<template lang="html">
  <div class="wifi-network card">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item">
          <a :class="enabled_class" href="#">{{ enabled ? 'Enabled' : 'Disabled' }}</a>
        </li>
      </ul>
    </div>
    <div class="card-block">
      <h4 class="card-title">{{ ssid }}</h4>
      <p class="card-text"><i :class="lock_icon"></i> {{ encrypted_title }}, {{ frequency }} GHz</p>
      <div class="progress progress-xs my-1">
        <div :class="progress_bar_class" role="progressbar" :style="progress_bar_style"
          :aria-valuenow="item.quality" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <small class="text-muted">Network strength: {{ quality }}%</small>
    </div>
  </div>
</template>

<script>
function getQualityClass (quality) {
  var bgClass = 'disabled'

  if (quality <= 0) {
    // Leave it disabled
  } else if (quality < 25) {
    bgClass = 'danger'
  } else if (quality < 50) {
    bgClass = 'warning'
  } else if (quality < 75) {
    bgClass = 'info'
  } else {
    bgClass = 'success'
  }

  return 'progress-bar bg-' + bgClass
}

export default {
  name: 'wifi_network',
  props: [ 'wifi_interface', 'ssid', 'quality', 'frequency', 'encrypted' ],
  data () {
    return {
      enabled: false
    }
  },
  computed: {
    encrypted_title () { return this.encrypted ? 'Encrypted' : 'Not encrypted' },
    lock_icon () { return this.encrypted ? 'fa fa-lock' : 'fa fa-unlock-alt' },
    progress_bar_class () { return getQualityClass(this.quality) },
    progress_bar_style () { return 'width: ' + this.quality + '%' },
    enabled_class () { return this.enabled ? 'nav-link enabled' : 'nav-link' }
  },
  mounted () {
    var parameters = {
      wifi_interface: this.wifi_interface,
      wifi_ssid: this.ssid
    }

    this.axios.post('/api/wifi/isSaved', parameters)
      .then(response => {
        this.enabled = response.data.is_saved
      })
  }
}
</script>

<style>

</style>
