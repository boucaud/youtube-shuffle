<template>
  <v-card>
    <v-card-title> Current Mix </v-card-title>
    <v-card-text>
      <template v-for="(id, i) in videoIdArray">
        <p v-if="id === currentVideoId" :key="i">{{ `Now playing: ${id}` }}</p>
        <p v-else :key="i">{{ id }}</p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "YoutubePlaylist",
  props: {
    currentVideoId: String,
    videoIdArray: Array,
  },
};
</script>