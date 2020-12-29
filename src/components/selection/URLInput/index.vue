<template>
  <v-card v-if="urlIdList && urlIdList.length">
    <v-card-text>
      <p v-for="(id, i) in urlIdList" :key="i">{{ id }}</p>
    </v-card-text>
  </v-card>

  <v-card v-else>
    <v-card-title>Input the playlists you want to play</v-card-title>
    <v-card-text>
      Each line should have one playlist URL, or playlist id
      <v-textarea v-model="rawURLList" />
      <v-btn @click="onValidated">Shuffle all videos in these playlists</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  parseInputListToPlaylistIdArray,
  buildURLFromIdArray,
} from "@helpers/inputList";

export default {
  name: "URLInput",
  data: () => ({
    rawURLList: "",
    urlIdList: null,
  }),
  mounted() {
    const search = window.location.search;
    if (search && search.length) {
      const params = new URLSearchParams(search);
      if (params.has("id[]")) {
        const idList = params.getAll("id[]");
        if (idList && idList.length) {
          this.urlIdList = idList;
        }
      }
    }
  },
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