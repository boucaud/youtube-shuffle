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
          <YoutubeVideo :videoId="'XYr5IC-mGi4'" />
          <YoutubePlaylist
            :currentVideoId="'XYr5IC-mGi4'"
            :videoIdArray="[
              'KS2JZlhnN7c',
              '53I6fcFXqxo',
              'XYr5IC-mGi4',
              '8Lyvv_bhzD0',
            ]"
          />
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
import URLInput from "@components/selection/URLInput";
import YoutubePlaylist from "@components/media/YoutubePlaylist";
import YoutubeVideo from "@components/media/YoutubeVideo";

export default {
  name: "YoutubeShuffle",
  components: {
    URLInput,
    YoutubePlaylist,
    YoutubeVideo,
  },
  data: () => ({
    urlIdArray: null, // TODO: store ?
  }),
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
  },
};
</script>

<style>
</style>