<template>
  <div>
    <slot name="player" />
    <v-divider />
    <slot name="controls" />
    <v-divider />
    <slot name="playlist" />
  </div>
</template>

<script>
export default {
  name: "VerticalLayout",
};
</script>

<style>
</style>