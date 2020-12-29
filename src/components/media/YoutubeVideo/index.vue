<template>
  <v-card>
    <v-card-title> Now Playing: </v-card-title>
    <v-card-text>
      <a :href="videoUrl">Link to video</a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "YoutubeVideo",
  props: {
    videoId: String,
  },
  computed: {
    videoUrl() {
      return `${this.videoId}`;
    },
  },
};
</script>

<style>
</style>