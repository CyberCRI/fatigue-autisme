<template>
  <v-container mb-8>
    <v-row justify="center">
      <v-card color="blue lighten-5" class="py-4 px-10">
        <slot></slot>
        <!-- <v-card-title class="justify-center">Indications</v-card-title> -->
        <!-- <v-card-text> -->
          <!-- <ul>
            <li v-for="p in items" :key="p">{{ p }}</li>
          </ul> -->
        <!-- </v-card-text> -->
      </v-card>

    </v-row>
  </v-container>
</template>

<script>
export default {
  // props: {
  //   items: {
  //     type: Array,
  //     required: true,
  //   },
  // },
};
</script>