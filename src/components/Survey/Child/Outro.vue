<template>
  <v-card class="pa-md-4 mb-4">
    <v-row justify="center">
      <v-col cols="11" sm="10">
        <h3>Merci pour votre participation!</h3>
        <p>Vos réponses ont bien été enregistrées.</p>

        <v-card color="blue lighten-5" class="py-6 px-6 mb-4">
          <h3>
            Votre avis est précieux pour la recherche, faites-nous part de vos
            commentaires!
          </h3>

          <p>
            Si vous souhaitez nous faire part de votre retour critique
            concernant le contenu ou le format du questionnaire,
            <strong :class="this.$store.state.settings.accentTextClass"
              >votre contribution sera très appréciée et très utile</strong
            >
            pour élaborer un outil efficace d’évaluation de la fatigue
            cognitive.
          </p>

          <p>Pour cela, trois possibilités:</p>
          <ol>
            <li>
              Ecrivez votre commentaire dans la zone de texte en bas de cette
              page et cliquez sur "Envoyer".
            </li>
            <li>
              Envoyez un e-mail à
              <a href="mailto: etude.autisme@protonmail.com"
                >l’adresse email de l’étude</a
              >
              (dans le corps du texte ou en pièce-jointe, à votre convenance).
            </li>
            <li>
              Oralement : contactez-nous à
              <a href="mailto: etude.autisme@protonmail.com"
                >l’adresse email de l’étude</a
              >
              pour que nous organisions un échange en visioconférence à une date
              qui vous conviendra.
            </li>
          </ol>
        </v-card>

        <v-row class="ma-5" sm="12">
          <h4>Mon commentaire:</h4>
        </v-row>
        <TextArea v-model="myComment" />
        <v-row justify="center">
          <v-btn class="btn primary bouton ma-0" @click="send"> Envoyer </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col sm="6">
            <v-alert outlined type="success" text v-if="showSuccess">
              Votre commentaire a bien été envoyé.
            </v-alert>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="6">
            <v-alert outlined type="error" text v-if="alertErrorMessage">
              {{ alertErrorMessage }}
            </v-alert>
          </v-col>
        </v-row>
      </v-col></v-row
    ></v-card
  >
</template>

<script>
import TextArea from "../TextArea.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showSuccess: false,
      alertErrorMessage: "",
      myComment: "",
    };
  },
  methods: {
    ...mapActions(["sendComment"]),
    send() {
      if (!this.myComment) {
        return;
      }
      this.alertErrorMessage = "";
      this.showSuccess = false;
      this.sendComment(this.myComment).then(
        () => {
          this.showSuccess = true;
          this.myComment = "";
        },
        (error) => {
          this.alertErrorMessage = "Une erreur est survenue";
          console.log(error);
        }
      );
    },
  },
  components: {
    TextArea,
  },
  mounted() {
    window.scroll(0, 0);
  }
};
</script>