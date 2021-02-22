<template>
  <v-card class="pa-md-4 mb-4">
    <v-row justify="center">
      <v-col cols="11" sm="10">
        <v-card color="blue lighten-5" class="py-6 px-6 mb-4">
          <h2>Important :</h2>
          <p>
            Ce questionnaire a pour principal objectif de recueillir votre
            témoignage et votre perception de la fatigue <span style="white-space: nowrap;">mentale :</span> il n’y a donc
            pas de bonnes ou de mauvaises réponses.
          </p>
          <p>
            Lorsque la réponse est une zone de texte libre, sentez-vous libre de
            préciser tout ce que vous souhaitez, et ce qui vous semble
            important. Ne vous inquiétez pas pour la qualité de la rédaction ou
            l’orthographe !
          </p>
          <p>Voici un exemple de zone de texte libre que vous rencontrerez au cours de ce questionnaire:</p>
          <TextArea></TextArea>
          <p>Certaines questions présentent une jauge pour permettre d'entrer la réponse.
            Tant que vous n'avez pas cliqué dessus, nous considérerons que vous n'avez pas encore répondu à la question et son aspect sera grisé.
            Elle devient bleu par la suite. Il est possible d'entrer n'importe quelle valeur entre 0 et 100.</p><p>Voici un exemple de jauge:
          </p>
          <v-row justify="center">
          <v-col sm="6" cols="12">
            <v-slider
              v-model="sliderValue"
              thumb-label="always"
              min="0"
              max="100"
              :color="sliderTouched ? 'primary' : 'grey darken-1'"
              :track-color="sliderTouched ? 'primary' : 'grey darken-1'"
              @change="sliderTouched = true"
            >
            </v-slider>
          </v-col>
        </v-row>
          <p>
            Compléter ce questionnaire prend
            <span class="blue--text"
              >en moyenne de 20 à 30 minutes. N’hésitez pas à faire une pause,
              ou à y répondre en plusieurs fois si le souhaitez.</span
            >
            Pour cela, il vous suffit de cliquer sur «Enregistrer et terminer plus tard» au bas de la page sur laquelle vous vous trouvez. Vos réponses
            seront enregistrées et vous pourrez reprendre là où vous vous étiez
            arrêté la prochaine fois que vous vous connecterez sur le site.
          </p>
        </v-card>
        <p>Vous trouverez dans le <a href="https://fatigue-autisme.org/guide-du-participant.pdf" target="_blank">guide du
              participant</a> toutes les informations nécessaires relatives à ce questionnaire.</p>
        <v-row justify="center">
          <v-btn
            class="btn primary bouton ma-4"
            @click="$router.push('/enfants/questionnaire/partA')"
          >
            Commencer le questionnaire
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TextArea from '../TextArea.vue';
export default {
  data() {
    return {
      sliderTouched: false,
      sliderValue: 0
    }
  },
  components: {
    TextArea
  },
  mounted() {
    window.scroll(0, 0);
  }
}
</script>