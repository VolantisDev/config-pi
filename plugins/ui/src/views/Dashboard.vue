<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <p><strong>Welcome to Pi Config!</strong></p>

          <p>Take a look at the basics below, and check the sidebar for all of the
            configuration options you can use to configure your Pi.</p>
        </v-card-text>
      </v-card>
    </v-flex>

    <router-view></router-view>
  </v-layout>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>
