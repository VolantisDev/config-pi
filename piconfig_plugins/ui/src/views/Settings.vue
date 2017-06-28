<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <p>Use this screen to configure Pi Config itself without having to
            modify configuration files.</p>
        </v-card-text>
      </v-card>
    </v-flex>

    <router-view></router-view>
  </v-layout>
</template>

<script>
export default {
  name: 'settings'
}
</script>
