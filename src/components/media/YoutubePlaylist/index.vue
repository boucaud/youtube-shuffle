<template>
  <v-card :style="{ height: '100%' }">
    <v-card-title>
      {{ `Current Mix (${activeVideoIndex + 1}/${numberOfItems})` }}
    </v-card-title>
    <v-card-text :style="{ height: '100%', maxHeight: '85vh' }">
      <v-list
        :style="{ overflowY: 'auto', maxHeight: '100%' }"
        v-if="videoArray && numberOfItemsToDisplay"
      >
        <v-list-item-group mandatory v-model="activeVideoIndex">
          <v-list-item
            v-for="i in numberOfItemsToDisplay"
            :key="i"
            :style="{ minHeight: '7vh' }"
          >
            <!-- TODO: scale this properly, use LOD -->
            <v-list-item-avatar
              ><v-img
                :aspect-ratio="16 / 9"
                :lazy-src="require('./youtube.png')"
                :src="`https://img.youtube.com/vi/${
                  videoArray[i - 1].id
                }/mqdefault.jpg`"
            /></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                videoArray[i - 1].title
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                videoArray[i - 1].channel
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="numberOfItemsToDisplay < numberOfItems"
            :key="numberOfItemsToDisplay + 1"
          >
            <v-list-item-title>
              Load {{ increment }} more items...
            </v-list-item-title>
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
    previousIndex: 0,
    maxItems: 50,
    increment: 50,
  }),
  computed: {
    ...mapGetters({
      currentVideoIndex: "getCurrentVideoIndex",
      videoArray: "getVideoArray",
    }),
    numberOfItemsToDisplay() {
      return Math.min(
        this.videoArray ? this.videoArray.length : 0,
        this.maxItems
      );
    },
    numberOfItems() {
      return this.videoArray ? this.videoArray.length : 0;
    },
  },
  watch: {
    currentVideoIndex(index) {
      this.activeVideoIndex = index;
    },
    activeVideoIndex(index) {
      if (index === this.numberOfItemsToDisplay) {
        this.maxItems += this.increment;
        this.activeVideoIndex = this.previousIndex;
        return;
      }
      this.previousIndex = index;
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