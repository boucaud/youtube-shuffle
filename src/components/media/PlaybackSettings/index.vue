<template>
  <v-card>
    <v-card-title> Controls </v-card-title>
    <v-card-text>
      <v-switch label="Loop after last video" v-model="loop"></v-switch>
      <v-switch
        label="Automatically play next video"
        v-model="autoPlayNextVideo"
      ></v-switch>
      <v-switch label="Dark theme" v-model="darkTheme"></v-switch>
      <v-btn @click="shuffleVideos">Shuffle the list again</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PlaybackSettings",
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
        this.$vuetify.theme.dark = value;
        this.$store.commit("setDarkTheme", value);
      },
    },
  },
  methods: { ...mapActions(["shuffleVideos"]) },
};
</script>

<style>
</style>