<template>
  <div class="elevation-3 pa-5 primary white--text"
    style="border-radius: 3px; width: 40vw">
    <h3>{{ this.$store.state.indicators.selectedIndicator ? this.$store.state.indicators.selectedIndicator.city : 'Start Tour' }}</h3>
    <p><small v-if="this.$store.state.indicators.selectedIndicator">{{ this.$store.state.indicators.selectedIndicator.description }}</small></p>
    <v-icon color="white" class="mr-3" @click="playback
      ? pauseTour()
      : startTour()">
        {{ playback
          ? 'mdi-pause-circle-outline'
          : 'mdi-play-circle-outline' }}
    </v-icon>
    <v-icon color="white" class="mx-3" @click="previousItem()">mdi-menu-left</v-icon>
    <v-icon color="white" class="mx-3" @click="nextItem()">mdi-menu-right</v-icon>
    <v-icon color="white" class="ml-3" @click="closeTour()">mdi-close-circle</v-icon>
  </div>
</template>

<script>
export default {
  data: () => ({
    map: null,
    playback: false,
    currentTourItem: 0,
    tourStops: [
      'IT9-E13b',
      'SE9-E5',
      'DE11-E10a3',
      'World-N1',
    ],
  }),
  mounted() {
    // setTimeout(() => this.startTour(), 3000);
  },
  methods: {
    startTour() {
      this.$store.commit('config/SET_TOUR_PLAYBACK', true);
      this.nextItem();
      this.playback = setInterval(() => {
        this.nextItem();
      }, 10000);
    },
    pauseTour() {
      this.playback = false;
      this.$store.commit('config/SET_TOUR_PLAYBACK', false);
    },
    previousItem() {
      if (this.currentTourItem === 0) {
        this.currentTourItem = this.tourStops.length - 1;
      } else {
        this.currentTourItem--;
      }
      this.setPOI(this.tourStops[this.currentTourItem]);
    },
    nextItem() {
      if (this.currentTourItem === this.tourStops.length - 1) {
        this.currentTourItem = 0;
      } else {
        this.currentTourItem++;
      }
      this.setPOI(this.tourStops[this.currentTourItem]);
    },
    closeTour() {
      this.playback = false;
      this.$store.commit('config/SET_TOUR_PLAYBACK', false);
    },
    setPOI(poi) {
      const aoiId = poi.split('-')[0];
      const indicatorCode = poi.split('-')[1];
      const selectedFeature = this.$store.state.features.allFeatures.find((f) => {
        const { indicatorObject } = f.properties;
        return indicatorObject.aoiID === aoiId
          && indicatorObject.indicator === indicatorCode;
      });
      this.$store.commit('indicators/SET_SELECTED_INDICATOR', selectedFeature.properties.indicatorObject);
    },
  },
};
</script>
