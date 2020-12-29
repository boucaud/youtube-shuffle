<template>
  <v-card>
    <v-card-title>Input the playlists you want to play</v-card-title>
    <v-card-text>
      Each line should have one playlist URL, or playlist id
      <v-textarea v-model="rawURLList" />
      <v-btn @click="onValidated">Shuffle all videos in these playlists</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { parseInputListToPlaylistIdArray } from "@helpers/inputList";

export default {
  name: "URLInput",
  data: () => ({
    rawURLList: "",
  }),
  methods: {
    onValidated() {
      const list = parseInputListToPlaylistIdArray(this.rawURLList);
      if (!list || list.length === 0) {
        // TODO: show error message
        return;
      }
      console.log(list);
    },
  },
};
</script>

<style>
</style>