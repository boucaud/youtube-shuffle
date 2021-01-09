<template>
  <v-card>
    <v-card-title> Controls </v-card-title>
    <v-card-text>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="nextVideo()" v-bind="attrs" v-on="on"
            ><v-icon>{{ nextIcon }}</v-icon></v-btn
          >
        </template>
        <span>Next Video</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            @click="shuffleList"
            :enabled="!shuffling"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              {{ shuffleIcon }}
            </v-icon>
          </v-btn>
        </template>
        <span>Shuffle the list again</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            v-model="loop"
            @click="loop = !loop"
          >
            <v-icon>{{ repeatIcon }}</v-icon>
          </v-btn>
        </template>
        <span>Repeat All</span>
      </v-tooltip>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            v-model="loopVideo"
            @click="loopVideo = !loopVideo"
            ><v-icon>{{ repeatOnceIcon }}</v-icon></v-btn
          >
        </template>
        <span>Repeat this video</span>
      </v-tooltip> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :input-value="autoPlayNextVideo"
            @click="autoPlayNextVideo = !autoPlayNextVideo"
            ><v-icon>{{ autoPlayIcon }}</v-icon></v-btn
          >
        </template>
        <span>Automatically play next videos</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            v-model="darkTheme"
            @click="darkTheme = !darkTheme"
          >
            <v-icon>{{ darkModeIcon }}</v-icon>
          </v-btn>
        </template>
        <span>Dark Mode</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  mdiSkipNext,
  mdiShuffleVariant,
  mdiRepeat,
  mdiRepeatOnce,
  mdiAnimationPlay,
  mdiWeatherNight,
} from "@mdi/js";

export default {
  name: "PlaybackSettings",
  data() {
    return {
      nextIcon: mdiSkipNext,
      shuffleIcon: mdiShuffleVariant,
      repeatIcon: mdiRepeat,
      repeatOnceIcon: mdiRepeatOnce,
      autoPlayIcon: mdiAnimationPlay,
      darkModeIcon: mdiWeatherNight,

      shuffling: false,
    };
  },
  computed: {
    ...mapState(["loop", "autoPlayNextVideo", "darkTheme"]),
    loop: {
      get() {
        return this.$store.getters.getLoop;
      },
      set(value) {
        this.$store.commit("setLoop", value);
      },
    },
    loopVideo: {
      get() {
        return this.$store.getters.getLoopVideo;
      },
      set(value) {
        this.$store.commit("setLoopVideo", value);
      },
    },
    autoPlayNextVideo: {
      get() {
        return this.$store.getters.getAutoPlayNextVideo;
      },
      set(value) {
        this.$store.commit("setAutoPlayNextVideo", value);
      },
    },
    darkTheme: {
      get() {
        return this.$store.getters.getDarkTheme;
      },
      set(value) {
        this.$store.commit("setDarkTheme", value);
      },
    },
  },
  methods: {
    ...mapActions(["shuffleVideos", "nextVideo"]),
    async shuffleList() {
      if (!this.shuffling) {
        this.shuffling = true;
        this.shuffleVideos().then(() => {
          this.shuffling = false;
        });
      }
    },
  },
};
</script>

<style>
</style>