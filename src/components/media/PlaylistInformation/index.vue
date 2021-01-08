<template>
  <v-card>
    <v-card-title> Playing From </v-card-title>
    <v-card-text>
      <v-slide-group>
        <v-slide-item
          v-for="(id, i) in Object.keys(playlistInformation)"
          :key="i"
          v-slot:default="{
            /*active, toggle*/
          }"
        >
          <v-card elevation="4" class="ma-1">
            <v-card-title class="py-0">
              {{ playlistInformation[id].title }}
            </v-card-title>
            <v-card-text class="py-1">
              {{ playlistInformation[id].channel }}
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PlaylistInformation",
  computed: {
    ...mapGetters({
      urlIdArray: "getUrlIdArray",
      playlistInformation: "getPlaylistInformation",
    }),
  },
  mounted() {
    this.fetchPlaylistInformation();
  },
  watch: {
    urlIdArray() {
      this.fetchPlaylistInformation();
    },
  },
  methods: {
    ...mapActions(["fetchPlaylistInformation"]),
  },
};
</script>