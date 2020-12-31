<template>
  <v-app>
    <!-- <v-navigation-drawer app>
  </v-navigation-drawer> -->

    <v-app-bar app>
      <!-- -->
      Youtube shuffler
    </v-app-bar>

    <!-- Provides the application the proper gutter -->
    <v-main>
      <component v-if="urlIdArray && urlIdArray.length" :is="layout">
        <template v-slot:player>
          <YoutubeVideo />
        </template>
        <template v-slot:playlist>
          <YoutubePlaylist />
        </template>
        <template v-slot:controls>
          <PlaybackSettings />
        </template>
      </component>
      <URLInput v-else />
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import PlaybackSettings from "@components/media/PlaybackSettings";
import URLInput from "@components/selection/URLInput";
import YoutubePlaylist from "@components/media/YoutubePlaylist";
import YoutubeVideo from "@components/media/YoutubeVideo";

import HorizontalLayout from "@components/layouts/HorizontalLayout";
import VerticalLayout from "@components/layouts/VerticalLayout";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "YoutubeShuffle",
  components: {
    HorizontalLayout,
    VerticalLayout,
    PlaybackSettings,
    URLInput,
    YoutubePlaylist,
    YoutubeVideo,
  },
  computed: {
    ...mapGetters({ darkTheme: "getDarkTheme", urlIdArray: "getUrlIdArray" }),
    layout() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return "VerticalLayout";
      }
      return "HorizontalLayout";
    },
  },
  watch: {
    darkTheme(val) {
      this.$vuetify.theme.dark = val;
    },
    urlIdArray() {
      this.requestVideoArray();
    },
  },
  mounted() {
    this.handleLocation();
    this.$vuetify.theme.dark = this.darkTheme;
  },
  methods: {
    ...mapActions(["handleLocation", "requestVideoArray"]),
  },
};
</script>

<style>
</style>