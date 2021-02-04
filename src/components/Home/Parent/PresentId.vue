<template>
  <v-container mb-8>
    <v-row justify="center">
      <v-card color="blue lighten-5" class="py-6 px-6">
        <!-- <v-card-text> -->
          <p>
            Voici votre identifiant personnel:
            <span class="font-weight-bold">{{ parentId }}</span>
          </p>
          <p>
            Veuillez le communiquer à votre enfant afin qu'il puisse valider son
            inscription.
          </p>
        <!-- </v-card-text> -->
      </v-card>

    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    parentId: {
      type: String,
      required: true,
    },
  },
};
</script>