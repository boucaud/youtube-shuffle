<template>
  <v-container>
    <v-card>
      <v-card-title>Input the playlists you want to play</v-card-title>
      <v-card-text>
        The youtube playlist randomizer is not working properly. This website aims to provide a working youtube playlist randomizer alternative.
        Each line should have one playlist URL, or playlist id. Note: The
        playlists need to be public and listed.
        <v-textarea v-model="rawURLList" />
        <v-btn @click="onValidated"
          >Shuffle all videos in these playlists</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  parseInputListToPlaylistIdArray,
  buildURLFromIdArray,
} from "@helpers/inputList";

export default {
  name: "URLInput",
  data: () => ({
    rawURLList: `PL6NdkXsPL07KiewBDpJC1dFvxEubnNOp1
PL06diOotXAJLhZjxE_cbYWbsXmdsvA_22
`,
  }),
  methods: {
    onValidated() {
      const list = parseInputListToPlaylistIdArray(this.rawURLList);
      if (!list || list.length === 0) {
        // TODO: show error message
        return;
      }
      const url = buildURLFromIdArray(list); // TODO: check max size
      window.location.href = url;
    },
  },
};
</script>

<style>
</style>