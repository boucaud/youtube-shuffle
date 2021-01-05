<template>
  <v-card>
    <v-card-title> Controls </v-card-title>
    <v-card-text>
      <v-btn @click="nextVideo()">Next >></v-btn>
      <v-switch label="Loop after last video" v-model="loop"></v-switch>
      <v-switch
        label="Automatically play next video"
        v-model="autoPlayNextVideo"
      ></v-switch>
      <v-switch label="Dark theme" v-model="darkTheme"></v-switch>
      <v-btn @click="shuffleList" :enabled="!shuffling"
        >Shuffle the list again</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PlaybackSettings",
  data() {
    return {
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