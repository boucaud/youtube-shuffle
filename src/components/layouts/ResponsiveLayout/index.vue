<template>
  <v-container fluid :class="$style.container">
    <v-row>
      <v-col lg="6" md="8" sm="12">
        <slot name="player" />
        <slot name="controls" />
      </v-col>
      <v-spacer />
      <v-col lg="6" md="4" sm="12">
        <slot name="playlist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResponsiveLayout",
};
</script>

<style module>
.container {
  overflow-x: hidden;
}
</style>