<template>
  <v-app>
    <!-- <v-navigation-drawer app>
  </v-navigation-drawer> -->

    <v-app-bar app>
      <!-- -->
      <v-toolbar-title
        ><a
          href="/"
          :style="{
            color: 'inherit',
            textDecoration: 'inherit',
          }"
          >Youtube-shuffle</a
        ></v-toolbar-title
      >
      <v-spacer />
      <span>shuffle and mix large Youtube playlists</span>
      <v-btn
        icon
        href="https://github.com/boucaud/youtube-shuffle"
        target="_blank"
        rel="noopener"
      >
        <v-icon>{{ githubIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Provides the application the proper gutter -->
    <v-main>
      <ResponsiveLayout v-if="urlIdArray && urlIdArray.length">
        <template v-slot:player>
          <YoutubeVideo />
        </template>
        <template v-slot:playlist-information>
          <PlaylistInformation />
        </template>
        <template v-slot:playlist>
          <YoutubePlaylist />
        </template>
        <template v-slot:controls>
          <PlaybackSettings />
        </template>
      </ResponsiveLayout>
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
import PlaylistInformation from "@components/media/PlaylistInformation";

import ResponsiveLayout from "@components/layouts/ResponsiveLayout";

import { mapActions, mapGetters } from "vuex";

import { mdiGithub } from "@mdi/js";

export default {
  name: "YoutubeShuffle",
  components: {
    ResponsiveLayout,
    PlaybackSettings,
    PlaylistInformation,
    URLInput,
    YoutubePlaylist,
    YoutubeVideo,
  },
  data: () => ({
    githubIcon: mdiGithub,
    origin: window.origin,
  }),
  computed: {
    ...mapGetters({ darkTheme: "getDarkTheme", urlIdArray: "getUrlIdArray" }),
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