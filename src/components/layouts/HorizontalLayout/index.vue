<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <slot name="player" />
        <slot name="controls" />
      </v-col>
      <v-col>
        <slot name="playlist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HorizontalLayout",
};
</script>

<style>
</style>