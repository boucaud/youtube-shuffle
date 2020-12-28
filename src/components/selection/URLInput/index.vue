<template>
  <v-card>
    <v-card-title>Input the playlists you want to play</v-card-title>
    <v-card-text>
      Each line should have one playlist URL, or playlist id
      <v-textarea v-model="rawURLList" />
      <v-btn>Shuffle all videos in these playlists</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "URLInput",
  data: () => ({
    rawURLList: "",
  }),
};
</script>

<style>
</style>