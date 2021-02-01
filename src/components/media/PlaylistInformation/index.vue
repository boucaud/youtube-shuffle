<template>
  <v-card>
    <v-card-title> Playing From </v-card-title>
    <v-card-text>
      <v-slide-group>
        <v-slide-item>
          <v-card elevation="4" class="ma-1">
            <v-card-title>
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon large v-bind="attrs" v-on="on">
                    <v-icon>{{ addIcon }}</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title> Add a new playlist </v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="Playlist ID or URL"
                      v-model="newPlaylistInput"
                      :rules="rules"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text @click="addPlaylist(newPlaylistInput)">
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-card-title>
          </v-card>
        </v-slide-item>
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
import { mdiCloseCircleOutline, mdiPlusCircleOutline } from "@mdi/js";
import { parseInputListToPlaylistIdArray } from "@helpers/inputList";

export default {
  name: "PlaylistInformation",
  data: () => ({
    removeIcon: mdiCloseCircleOutline,
    addIcon: mdiPlusCircleOutline,
    newPlaylistInput: "",
    rules: [() => !!parseInputListToPlaylistIdArray(this.newPlaylistInput)],
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
    addPlaylist(input) {
      const idArray = parseInputListToPlaylistIdArray(input);
      if (idArray) {
        this.redirectToIdArray({ idArray: [...this.urlIdArray, ...idArray] });
      }
    },
  },
};
</script>