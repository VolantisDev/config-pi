<template>
  <div class="animated fadeIn">
    <p>The configuration portal is a wireless access point (AP) that allows you to connect to
      and configure your pi directly, even if your pi isn't connected to your network.</p>

    <p>For this to work, your pi must have a wireless interface capable of running as an AP (most are).</p>

    <p>The recommended configuration is <strong>Auto</strong>, which enables the config portal only when
    an existing internet connection is not available.</p>
  </div>
</template>

<script>
export default {
  name: 'config_portal'
}
</script>
