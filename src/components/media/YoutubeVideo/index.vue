<template>
  <v-card>
    <v-card-title> Now Playing: </v-card-title>
    <v-card-text>
      <div ref="player" />
      <v-progress-circular indeterminate v-if="!this.videoId || !this.player" />
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters, mapActions } from "vuex";

export default {
  name: "YoutubeVideo",
  data: function () {
    return {
      player: null,
      initializingPlayer: false,
    };
  },
  computed: {
    ...mapGetters({ videoId: "getCurrentVideoId" }),
  },
  watch: {
    videoId(id) {
      // TODO: can we validate this?
      if (this.player) {
        this.player.cueVideoById(id);
        this.player.playVideo(); // check that it worked ? if not, skip ?
      } else if (!this.initializingPlayer) {
        this.initializePlayer();
      }
    },
  },
  mounted() {
    if (this.videoId) {
      this.initializePlayer();
    }
  },
  methods: {
    ...mapActions({ nextVideo: "nextVideo" }),
    handleVideoEnded() {
      this.nextVideo();
    },
    handlePlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        this.handleVideoEnded();
      }
    },
    initializePlayer() {
      if (this.initializingPlayer) {
        return;
      }
      this.initializingPlayer = true;
      // Load the youtube iframe API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      const container = this.$refs.player;
      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player(container, {
          videoId: this.videoId,
          events: {
            onReady: () => {
              this.player.playVideo();
            },
            onStateChange: this.handlePlayerStateChange,
          },
        });
        this.initializingPlayer = false;
      };
    },
  },
};
</script>

<style>
</style>