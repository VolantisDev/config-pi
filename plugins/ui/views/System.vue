<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <p>Use this screen to configure your pi. You can switch
            between the various sections easily in the footer.</p>
        </v-card-text>
      </v-card>
    </v-flex>

    <router-view></router-view>
  </v-layout>
</template>

<script>
export default {
  name: 'system'
}
</script>
