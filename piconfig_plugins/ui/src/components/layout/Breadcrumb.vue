<template>
  <v-breadcrumbs icons divider="chevron_right">
    <v-breadcrumbs-item
      v-for="(item, index) in list"
      :key="item"
      :disabled="item.disabled"
      :href="!isLast(index) ? item.path : null"
      :router="true">
      {{ showName(item) }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    separator: String
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>

<style lang="css">
  .breadcrumbs {
    justify-content: left;
  }
</style>
