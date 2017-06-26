<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <p>Use this section to configure your pi's services.</p>
        </v-card-text>
      </v-card>
    </v-flex>

    <router-view></router-view>
  </v-layout>
</template>

<script>
export default {
  name: 'services'
}
</script>
