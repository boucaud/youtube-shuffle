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
              <span> {{ playlistInformation[id].title }} </span>
              <v-spacer />
              <v-btn icon @click="removePlaylist(id)">
                <v-icon>{{ removeIcon }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text class="py-1">
              <span>{{ playlistInformation[id].channel }}</span>
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiCloseCircleOutline } from "@mdi/js";

export default {
  name: "PlaylistInformation",
  data: () => ({
    removeIcon: mdiCloseCircleOutline,
  }),
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
    ...mapActions(["fetchPlaylistInformation", "redirectToIdArray"]),
    removePlaylist(id) {
      this.redirectToIdArray({
        idArray: this.urlIdArray.filter((idInArray) => idInArray !== id),
      });
    },
  },
};
</script>