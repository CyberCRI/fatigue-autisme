<template>
<section>
  <v-card class="pa-md-4 mb-4">
    <h1 class="text-center">Bienvenue sur l'espace lycéen.ne.s</h1>
  <br>
    <!-- Text accueil enfant -->
    <Intro />

    <!-- link guide du participant -->

    <!-- acceder au questionnaire -->
    <v-row justify="center">
      <v-btn
        class="btn primary bouton ma-4"
        @click="$router.push('/enfants/questionnaire/intro')"
      >
        Accéder au questionnaire
      </v-btn>
    </v-row>
  </v-card>
</section>
</template>

<script>
import Intro from "@/components/Home/Child/Intro";
export default {
  components: {
    Intro,
  },
  created() {
    if (!this.$store.getters.consent) {
      this.$router.push({ path: "/consentementEnfant" });
    }
  },
  mounted() {
    window.scroll(0, 0);
  }
};
</script>