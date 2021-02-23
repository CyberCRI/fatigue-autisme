<template>
  <div class="progress-bar">
    <v-progress-linear class="progress-line" :value="progression"></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "ProgressionBar",
  props: {
    progression: Number
  }
};
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 60px;
  left: 0px;
  width: 100% !important;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  z-index: 1;
  border-bottom: 1px solid #ddd;
}
.progress-line {
  width: 85%;
  margin: auto;
}
</style>
