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
          <YoutubeVideo
            :videoId="videoIdArray[currentVideoIndex]"
            @videoEnded="nextVideo()"
          />
          <!-- TODO: can just pass the index directly... -->
          <YoutubePlaylist
            :currentVideoId="videoIdArray[currentVideoIndex]"
            :videoIdArray="videoIdArray"
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
    currentVideoIndex: 0,
    videoIdArray: ["KS2JZlhnN7c", "53I6fcFXqxo", "XYr5IC-mGi4", "8Lyvv_bhzD0"],
    loop: true,
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
  methods: {
    nextVideo() {
      if (this.currentVideoIndex < this.videoIdArray.length - 1 && this.loop) {
        this.currentVideoIndex++;
      } else if (this.loop) {
        this.currentVideoIndex = 0;
      }
    },
  },
};
</script>

<style>
</style>