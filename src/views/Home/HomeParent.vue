<template>
  <v-card class="pa-md-4 mb-4">
  <!-- <div class="container--fluid justify"> -->
    <loading-overlay :active="isLoading" color="#1976d3" />
    <div class="row">
      <div class="offset-1 col-10">
        <v-row>
          <v-col class="col-12">
            <h2>Bienvenue sur l’espace « Parents » de ce site !</h2>
            <br />
            <p>
              Cher parent,
            </p>
            <p>
              Vous et votre enfant avez accepté de prendre part à l’étude «
              Évaluation de la fatigabilité mentale chez les lycéens présentant
              une condition du spectre autistique », menée par Dr Morgane
              Aubineau, chercheuse postdoctorale au Centre de Recherche
              Interdisciplinaire. Nous vous en remercions beaucoup.
            </p>
          </v-col>
        </v-row>
        <v-row>
            <!-- <v-col>
                <v-card class="pa-md-4 mb-4"> -->
                    <PresentId :parentId="this.$store.state.auth.user.parentId" />
                <!-- </v-card>
            </v-col> -->
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p>
              Ci-dessous, vous trouverez les deux documents à compléter, dans
              l’ordre :
            </p>
            <p>
              (1) La fiche de renseignements, qui recueille des informations
              sociobiographiques concernant votre enfant, ainsi que des données
              relatives à son parcours scolaire, diagnostique et
              d’accompagnement.
            </p>
            <p>
              (2) Le questionnaire sur votre perception de la fatigue mentale de
              votre enfant et sur son rythme de vie.
            </p>
            <p>
              Toutes ces données sont strictement confidentielles, elles seront
              stockées sur un serveur sécurisé, anonymisées et intégralement
              chiffrées. Votre anonymat et celui de votre enfant sont donc
              garantis en tout temps. Ces informations sont détaillées dans la <a href="https://fatigue-autisme.org/notice-information.pdf" target="_blank">notice d’information.</a>
            </p>
            <p>
              Avant de commencer, prenez le temps de bien lire le <a href="https://fatigue-autisme.org/guide-du-participant.pdf" target="_blank">guide du
              participant</a>, afin d’être certain.e d’avoir toutes les informations
              nécessaires à disposition.
            </p>
            <p>
              Pour toute question, n’hésitez pas à prendre contact avec nous, à
              l’adresse suivante :
              <a href="mailto:etude.autisme@protonmail.com"
                >etude.autisme@protonmail.com</a
              >
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-sm-6 center">
            <v-btn
              class="btn primary bouton"
              @click="$router.push('/ficherenseignement')"
              v-if="!renseignement"
              >fiche de renseignements</v-btn
            >
          </v-col>
          <v-col class="col-sm-6 center">
            <v-btn
              class="btn primary bouton"
              @click="$router.push('/questionnaire')"
              v-if="!questionaire"
            >
              questionnaire
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
  <!-- </div> -->
</template>

<script>
import PresentId from '../../components/Home/Parent/PresentId.vue';
import axios from "axios";

export default {
  components: {
      PresentId
      },
  data() {
    return {
      isLoading: false,
      renseignement: false,
      questionaire: false
    };
  },
  mixins: [],
  methods: {
    initialize() {
      this.isLoading = true;
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            "/renseignement/" +
            this.$store.state.auth.user.userId,
          {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + this.$store.state.auth.user.token
            }
          }
        )
        .then(response => {
          if (response.data.length != 0) {
            this.renseignement = true;
          }
          axios
            .get(
              process.env.VUE_APP_ROOT_API +
                "/questionnaire/" +
                this.$store.state.auth.user.userId,
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + this.$store.state.auth.user.token
                }
              }
            )
            .then(response => {
              this.isLoading = false;
              if (response.data[0].questionnaire6) {
                this.questionaire = true;
              }
            })
            .catch(error => {
              this.isLoading = false;
              console.log(error);
            });
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    }
  },
  created() {
    if (this.$store.state.auth.user.consent == "false" || !this.$store.state.auth.user.consent) {
      this.$router.push({ path: "/consentement" });
    } else {
      this.initialize();
    }
  },
  computed: {}
};
</script>
<style scoped>
.center {
  text-align: center;
}
.bouton {
  width: 300px;
}
.justify {
  text-align: justify ;
}
</style>
