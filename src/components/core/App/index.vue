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
            :videoId="videoArray[currentVideoIndex].id"
            @videoEnded="nextVideo()"
          />
          <!-- TODO: can just pass the index directly... -->
          <YoutubePlaylist
            :currentVideoIndex="currentVideoIndex"
            :videoArray="videoArray"
            @videoChosen="setVideoIndex"
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
    videoArray: [
      {
        id: "KS2JZlhnN7c",
        name: "video name 1",
        channel: "Channel 1",
      },
      {
        id: "53I6fcFXqxo",
        name: "video name 2",
        channel: "Channel 2",
      },
      {
        id: "XYr5IC-mGi4",
        name: "video name 3",
        channel: "Channel 3",
      },
      {
        id: "8Lyvv_bhzD0",
        name: "video name 4",
        channel: "Channel 4",
      },
    ],
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
      if (this.currentVideoIndex < this.videoArray.length - 1 && this.loop) {
        this.currentVideoIndex++;
      } else if (this.loop) {
        this.currentVideoIndex = 0;
      }
    },
    setVideoIndex(index) {
      if (index >= 0 && index < this.videoArray.length) {
        this.currentVideoIndex = index;
      }
    },
  },
};
</script>

<style>
</style>