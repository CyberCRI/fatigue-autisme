<template>
  <div class="sticky-card">
    <v-container>
      <v-card class="pa-6 md-4 mb-4 justify-center">
        <v-row justify="center" align="center">
          <template v-for="(l, index) in ['A', 'B', 'C', 'D', 'E']">
            <section v-if="index != id" :key="l">
              <v-avatar :color="color(index)" class="mr-1" :size="size(index)">
                <span class="white--text headline">{{ l }}</span>
              </v-avatar>
            </section>
            <section v-else :key="l">
              <v-progress-circular
                :rotate="360"
                :size="46"
                :width="6"
                :value="valueProgress"
                color="teal"
                class="mr-1">
                {{ letter }}
              </v-progress-circular>
            </section>
          </template>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SurveyHeader",
  props: {
    id: {
      type: Number,
      required: true,
    },
    valueProgress: Number,
  },
  computed: {
    letter() {
      return {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E'
      }[this.id]
    }
  },
  methods: {
    size(idx) {
      if (idx === this.id) {
        return 40;
      }
      return 32;
    },
    color(idx) {
      if (idx < this.id) {
        return "teal";
      }
      if (idx > this.id) {
        return "grey lighten-2";
      }
      return "grey darken-2";
    },
  },
};
</script>

<style scoped>
.sticky-card {
  position: fixed;
  top: 60px;
  width: 100% !important;
  left: 0%;
  display: flex;
  align-items: center;
  z-index: 1;
}
</style>
