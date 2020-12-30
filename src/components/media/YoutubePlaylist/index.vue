<template>
  <v-card>
    <v-card-title> Current Mix </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-group mandatory v-model="activeVideoIndex">
          <v-list-item v-for="(id, i) in videoIdArray" :key="i">
            <!-- <v-list-item-avatar></v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title>{{ id }}</v-list-item-title>
              <v-list-item-subtitle>{{ id }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "YoutubePlaylist",
  props: {
    currentVideoIndex: Number,
    videoIdArray: Array,
  },
  data: () => ({
    activeVideoIndex: 0,
  }),
  watch: {
    currentVideoIndex(index) {
      console.log("change video");
      this.activeVideoIndex = index;
    },
    activeVideoIndex(index) {
      this.$emit("videoChosen", index);
    },
  },
};
</script>