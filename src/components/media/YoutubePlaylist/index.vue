<template>
  <v-card>
    <v-card-title> Current Mix </v-card-title>
    <v-card-text>
      <v-list
        :style="{ overflowY: 'auto', maxHeight: '80vh' }"
        v-if="videoArray"
      >
        <v-list-item-group mandatory v-model="activeVideoIndex">
          <v-list-item v-for="(videoItem, i) in videoArray" :key="i">
            <!-- TODO: scale this properly, use LOD -->
            <v-list-item-avatar tile min-height="10vh"
              ><v-img
                :src="`https://img.youtube.com/vi/${videoItem.id}/mqdefault.jpg`"
                min-height="10vh"
            /></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ videoItem.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                videoItem.channel
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-progress-circular v-else indeterminate />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  // TODO: we dont handle the case where a playlist is empty for now
  name: "YoutubePlaylist",
  data: () => ({
    activeVideoIndex: 0,
  }),
  computed: {
    ...mapGetters({
      currentVideoIndex: "getCurrentVideoIndex",
      videoArray: "getVideoArray",
    }),
  },
  watch: {
    currentVideoIndex(index) {
      this.activeVideoIndex = index;
    },
    activeVideoIndex(index) {
      this.setVideoIndex(index);
    },
  },
  methods: {
    ...mapMutations({
      setVideoIndex: "setVideoIndex",
    }),
  },
};
</script>