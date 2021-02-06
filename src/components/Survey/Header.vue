<template>
  <div class="sticky-card">
    <v-container>
      <v-card class="pa-6 md-4 mb-4 justify-center">
        <v-row justify="center">
              <h2 class="mr-10">{{ title }}</h2>
              <v-progress-circular
                :rotate="360"
                :size="40"
                :width="3"
                :value="valueProgress"
                color="teal"
                >{{ `${valueProgress}%` }}
              </v-progress-circular>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SurveyHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    valueProgress: Number,
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
