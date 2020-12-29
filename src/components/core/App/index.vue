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
        <URLInput />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import URLInput from "@components/selection/URLInput";

export default {
  name: "YoutubeShuffle",
  components: {
    URLInput,
  },
  data: () => ({}),
  mounted: () => {},
};
</script>

<style>
</style>