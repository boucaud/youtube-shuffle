<template>
  <v-container fluid :class="$style.container">
    <v-row>
      <v-col lg="6" md="8" width="100%">
        <v-container flex :style="{ padding: 0 }">
          <v-row dense>
            <v-col>
              <slot name="playlist-information" my-8 />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <slot name="player" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <slot name="controls" my-8 />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col lg="6" md="4">
        <slot name="playlist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResponsiveLayout",
};
</script>

<style module>
.container {
  overflow-x: hidden;
}
</style>