<template>
  <v-app>
    <component v-bind:is="$store.getters.layout"></component>
  </v-app>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import Authorize from "@/mixins/Authorize.ts";

export default {
  name: "App",
  mixins: [Authorize],
  components: {
    "app-layout": AppLayout,
    "simple-layout": SimpleLayout
  },
  data: () => ({
    //
  })
};
</script>

<style>
.v-app-bar {
  height: 75px !important;
}

</style>