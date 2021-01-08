<template>
  <v-card>
    <v-card-title>Now Playing</v-card-title>
    <v-card-text>
      <div class="video-container">
        <div ref="player" />
      </div>
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
      doneBuffering: true,
      videoCued: true,
    };
  },
  computed: {
    ...mapGetters({ videoId: "getCurrentVideoId" }),
  },
  watch: {
    videoId(id) {
      // TODO: can we validate this?
      this.doneBuffering = false;
      this.videoCued = false;
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
      } else if (event.data === YT.PlayerState.BUFFERING) {
        this.doneBuffering = true;
      } else if (event.data === YT.PlayerState.CUED) {
        this.videoCued = true;
      } else if (event.data === YT.PlayerState.UNSTARTED) {
        // If the video was loaded but unstarted, that means it is blocked
        if (this.doneBuffering && this.videoCued) {
          this.nextVideo();
        }
      }
    },
    initializePlayer() {
      if (this.initializingPlayer) {
        return;
      }
      const container = this.$refs.player;
      const playerParams = {
        videoId: this.videoId,
        events: {
          onReady: () => {
            this.player.playVideo();
          },
          onStateChange: this.handlePlayerStateChange,
        },
        width: "100%",
        height: "100%",
        origin: window.origin,
      };

      // YT API is already loaded
      if (typeof YT !== typeof undefined && YT) {
        this.player = new YT.Player(container, playerParams);
        return;
      }

      this.initializingPlayer = true;

      // Load the youtube iframe API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player(container, playerParams);
        this.initializingPlayer = false;
      };
    },
  },
};
</script>

<style>
.video-container {
  float: none;
  clear: both;
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>