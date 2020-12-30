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
      <v-container fluid>
        <template v-if="urlIdArray && urlIdArray.length">
          <v-layout>
            <v-col>
              <YoutubeVideo />
              <PlaybackSettings />
            </v-col>
            <v-col>
              <!-- TODO: can just pass the index directly... -->
              <YoutubePlaylist />
            </v-col>
          </v-layout>
        </template>
        <URLInput v-else />
      </v-container>
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

import { mapGetters } from "vuex";

export default {
  name: "YoutubeShuffle",
  components: {
    PlaybackSettings,
    URLInput,
    YoutubePlaylist,
    YoutubeVideo,
  },
  data: () => ({
    urlIdArray: null, // TODO: store ?
  }),
  computed: { ...mapGetters({ darkTheme: "getDarkTheme" }) },
  watch: {
    darkTheme(val) {
      this.$vuetify.theme.dark = val;
    },
  },
  mounted() {
    const search = window.location.search;
    if (search && search.length) {
      const params = new URLSearchParams(search);
      if (params.has("id")) {
        const idList = params.getAll("id");
        if (idList && idList.length) {
          this.urlIdArray = idList;
        }
      }
    }

    this.$vuetify.theme.dark = this.darkTheme;
  },
};
</script>

<style>
</style>