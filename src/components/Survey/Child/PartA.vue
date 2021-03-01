<template>
  <section>
    <Header :id="0" :valueProgress="percentageCompletion" />

    <br />
    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row  justify="center">
        <v-col cols="11" sm="10">
        <h1 class="text-center">La fatigue mentale au quotidien</h1>
        </v-col>  
      </v-row>

      <v-row justify="center" class="ma-10" v-if="errors.length > 0">
        <v-col sm="9" class="error-borders pa-4">
          Certaines questions ci-dessous nécessitent une réponse afin de valider
          cette partie.
        </v-col>
      </v-row>

      <v-row class="ma-5" cols="12">
        <h3>
          1. Pouvez-vous estimer l’intensité de votre fatigue mentale dans les
          situations <span style="white-space: nowrap">suivantes :</span>
        </h3>
      </v-row>

      <Indications>
        <ul>
          <li v-for="p in ratingLabels1" :key="p">{{ p }}</li>
        </ul>
      </Indications>

      <!-- RADIO BUTTONS -->
      <v-row justify="center">
        <v-col cols="10">
          <v-row
            align="center"
            v-for="q in questionsA1"
            :key="q.question"
            v-bind:class="{ 'error-borders': errors.includes(q.model) }"
          >
            <v-col sm="12" md="6" cols="12"
              ><span v-html="q.question"></span
            ></v-col>
            <v-col sm="12" md="6" cols="12">
              <v-radio-group v-model="$data[q.model]" row>
                <v-radio
                  v-for="i in valuesA1"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <section id="tired" v-if="areYouTired">
        <v-row justify="center">
          <v-col cols="10" sm="6">
            <div class="rounded-lg text-center green lighten-4 pa-4">
              Si vous vous sentez actuellement très fatigué.e, n’hésitez pas à
              compléter ce questionnaire en plusieurs fois.
            </div>
          </v-col>
        </v-row>
      </section>

      <section id="A11" v-if="relevantA11">
        <v-row class="ma-8" sm="12" v-if="relevantA11">
          <h4>
            1.1 Pouvez-vous évaluer, à l’aide de la jauge, l’intensité de cette
            fatigue <span style="white-space: nowrap">mentale :</span>
          </h4>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" sm="4">
            Durant la journée où vous avez été
            <strong :class="this.$store.state.settings.accentTextClass"
              >le / la plus</strong
            >
            fatigué.e
            <strong :class="this.$store.state.settings.accentTextClass"
              >la semaine passée</strong
            >
          </v-col>
          <v-col sm="6" cols="12">
            <v-slider
              v-model="A11a"
              thumb-label="always"
              min="0"
              max="100"
              :color="A11aTouched ? 'primary' : 'grey darken-1'"
              :track-color="A11aTouched ? 'primary' : 'grey darken-1'"
              @change="A11aTouched = true"
            >
              <template v-slot:prepend>Aucune fatigue</template>
              <template v-slot:append>
                Aussi fatigué.e qu’il est possible de l’être</template
              >
            </v-slider>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="4" cols="12">
            Durant la journée où vous avez été
            <strong :class="this.$store.state.settings.accentTextClass"
              >le / la moins</strong
            >
            fatigué.e
            <strong :class="this.$store.state.settings.accentTextClass"
              >la semaine passée</strong
            >
          </v-col>
          <v-col sm="6" cols="12">
            <v-slider
              v-model="A11b"
              thumb-label="always"
              min="0"
              max="100"
              :color="A11bTouched ? 'primary' : 'grey darken-1'"
              :track-color="A11bTouched ? 'primary' : 'grey darken-1'"
              @change="A11bTouched = true"
            >
              <template v-slot:prepend> Aucune fatigue </template>
              <template v-slot:append>
                Aussi fatigué.e qu’il est possible de l’être
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          2. Depuis que vous êtes entré.e <span style="white-space: nowrap">au lycée :</span>
        </h3>
      </v-row>
      <v-row justify="center">
        <v-col
          sm="10"
          cols="6"
          v-bind:class="{ 'error-borders': errors.includes('A2') }"
        >
          <v-radio-group v-model="A2">
            <v-radio label="Je suis moins fatigué.e qu’avant" value="Je suis moins fatigué.e qu’avant"></v-radio>
            <v-radio label="Je ne suis ni plus, ni moins fatigué.e qu’avant" value="Je ne suis ni plus, ni moins fatigué.e qu’avant"></v-radio>
            <v-radio label="Je suis plus fatigué.e qu’avant" value="Je suis plus fatigué.e qu’avant"></v-radio>
            <v-radio label="Je ne sais pas" value="Je ne sais pas"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          3.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lorsque vous vivez des périodes de fatigue mentale</strong
          >, à quel point les situations suivantes vous demandent-elles
          <strong :class="this.$store.state.settings.accentTextClass"
            >plus d’efforts que d’habitude</strong
          >
          :
        </h3>
      </v-row>

      <Indications>
        <ul>
          <li v-for="p in ratingLabels2" :key="p">{{ p }}</li>
        </ul>
      </Indications>

      <!-- RADIO BUTTONS -->
      <v-row justify="center">
        <v-col cols="10">
          <v-row
            align="center"
            v-for="q in questionsA3"
            :key="q.question"
            v-bind:class="{ 'error-borders': errors.includes(q.model) }"
          >
            <v-col md="7" cols="12">{{ q.question }}</v-col>
            <v-col md="5" cols="12">
              <v-radio-group v-model="$data[q.model]" row>
                <v-radio
                  v-for="i in valuesA3"
                  :key="i"
                  :label="i"
                  :value="i"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          4. De façon générale, avez-vous le sentiment de devoir fournir
          davantage d’efforts que les autres jeunes de votre âge dans
          <strong :class="this.$store.state.settings.accentTextClass"
            >certaines</strong
          >
          situations de la vie quotidienne ?
        </h3>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="6"
          sm="10"
          v-bind:class="{ 'error-borders': errors.includes('A4') }"
        >
          <v-radio-group v-model="A4">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui" value="Oui"></v-radio>
            <v-radio label="Je ne sais pas" value="Je ne sais pas"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section id="A41" v-if="relevantA41">
        <v-row class="ma-5" sm="12">
          <h4>
            4.1 Si oui, souhaitez-vous
            <span style="white-space: nowrap">préciser :</span>
          </h4>
        </v-row>
        <TextArea v-model="A41" />
      </section>

      <v-row justify="center">
        <v-btn class="btn primary bouton ma-4" @click="save">
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn class="btn primary bouton ma-4" @click="nextPart">
          Accéder à la partie B
        </v-btn>
      </v-row>
      <v-row justify="center">
        <v-col sm="6">
          <v-alert outlined type="success" text v-if="showSuccess">
            Vos réponses ont bien été enregistrées.
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
    </v-card>
    <!-- </v-expansion-panel-content> -->
  </section>
</template>

<script>
import Indications from "../../Indications.vue";
import Header from "../Header.vue";
import TextArea from "../TextArea.vue";
import { mapActions } from "vuex";
export default {
  name: "SurveyChildPartA",
  data() {
    return {
      activeErrors: false,
      showSuccess: false,
      alertErrorMessage: "",
      A1a: "",
      A1b: "",
      A1c: "",
      A1d: "",
      A11a: 0,
      A11aTouched: false,
      A11b: 0,
      A11bTouched: false,
      A2: "",
      A3a: "",
      A3b: "",
      A3c: "",
      A3d: "",
      A3e: "",
      A3f: "",
      A3g: "",
      A3h: "",
      A3i: "",
      A3j: "",
      A3k: "",
      A3l: "",
      A4: "",
      A41: "",
      ratingLabels1: [
        "1- Inexistante",
        "2- Minime ou peu importante",
        "3- Moyennement importante",
        "4- Importante",
        "5- Extrêmement importante",
      ],
      ratingLabels2: [
        "1- Cela ne me demande pas plus d’efforts que d’habitude",
        "2- Cela me demande plus d’efforts que d’habitude",
        "3- Cela me demande trop d’efforts, au point que je ne peux pas le faire",
        "n/a- Cela ne me concerne pas ou je ne parviens pas à évaluer la situation",
      ],
      valuesA1: ["1", "2", "3", "4", "5"],
      valuesA3: ["1", "2", "3", "n/a"],
      questionsA1: [
        {
          question: `En moyenne, sur la <strong class="${this.$store.state.settings.accentTextClass}">dernière</strong> semaine scolaire :`,
          model: "A1a",
        },
        {
          question: `Au cours du <strong class="${this.$store.state.settings.accentTextClass}">dernier</strong> week-end :`,
          model: "A1b",
        },
        {
          question: `Lorsque vous êtes en <span style="white-space: nowrap;">vacances :</span>`,
          model: "A1c",
        },
        {
          question: `Au moment précis où vous complétez ce <span style="white-space: nowrap;">questionnaire :</span>`,
          model: "A1d",
        },
      ],
      questionsA3: [
        {
          question:
            "Vous préparer pour la journée (déjeuner, se laver, faire son sac, etc.)",
          model: "A3a",
        },
        {
          question:
            "Prendre les transports en commun / faire le trajet jusqu’au lycée",
          model: "A3b",
        },
        {
          question:
            "Suivre une journée de cours (compréhension, participation, attention)",
          model: "A3c",
        },
        {
          question:
            "Interagir avec les élèves du lycée (incluant les travaux de groupe)",
          model: "A3d",
        },
        {
          question:
            "Interagir avec les enseignant.e.s et autres adultes du lycée",
          model: "A3e",
        },
        {
          question: "Faire vos devoirs une fois de retour à la maison",
          model: "A3f",
        },
        {
          question:
            "Participer à la vie de famille (repas, discussion, jeux, tâches ménagères, etc.)",
          model: "A3g",
        },
        {
          question:
            "Vous investir dans vos activités extrascolaires (sport, musique, club ou association, etc.)",
          model: "A3h",
        },
        { question: "Vous consacrer à vos passions", model: "A3i" },
        { question: "Voir et échanger avec vos amis", model: "A3j" },
        {
          question:
            "Vous repérer au niveau spatial (représentation mentale des lieux) et temporel (situer les événements les uns par rapport aux autres, avoir la notion du temps qui passe, etc.)",
          model: "A3k",
        },
        {
          question:
            "Vous exprimer (articuler, trouver vos mots, vous faire comprendre, etc.)",
          model: "A3l",
        },
      ],
    };
  },
  computed: {
    errors() {
      const errors = [];
      if (!this.activeErrors) {
        return errors;
      }
      for (const id in this.completions) {
        if (!this.completions[id]) {
          errors.push(id);
        }
      }
      return errors;
    },
    relevantA11() {
      return this.A1a > 1 || this.A1b > 1 || this.A1d > 1;
    },
    relevantA41() {
      return this.A4 === "Oui";
    },
    areYouTired() {
      return this.A1d >= 2;
    },
    completions() {
      return {
        A1a: this.A1a != "",
        A1b: this.A1b != "",
        A1c: this.A1c != "",
        A1d: this.A1d != "",
        A2: this.A2 != "",
        A3a: this.A3a != "",
        A3b: this.A3b != "",
        A3c: this.A3d != "",
        A3d: this.A3d != "",
        A3e: this.A3e != "",
        A3f: this.A3f != "",
        A3g: this.A3g != "",
        A3h: this.A3h != "",
        A3i: this.A3i != "",
        A3j: this.A3j != "",
        A3k: this.A3k != "",
        A3l: this.A3l != "",
        A4: this.A4 != "",
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter((a) => a);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      return {
        A1a: this.A1a,
        A1b: this.A1b,
        A1c: this.A1c,
        A1d: this.A1d,

        A11a: this.A11a,
        A11aTouched: this.A11aTouched,
        A11b: this.A11b,
        A11bTouched: this.A11bTouched,

        A2: this.A2,
        A3a: this.A3a,
        A3b: this.A3b,
        A3c: this.A3c,
        A3d: this.A3d,
        A3e: this.A3e,
        A3f: this.A3f,
        A3g: this.A3g,
        A3h: this.A3h,
        A3i: this.A3i,
        A3j: this.A3j,
        A3k: this.A3k,
        A3l: this.A3l,

        A4: this.A4,
        A41: this.A41,
      };
    },
  },
  methods: {
    ...mapActions(["saveChildQuestionnaire"]),
    save() {
      this.alertErrorMessage = "";
      this.showSuccess = false;

      this.saveChildQuestionnaire(this.answers).then(
        () => {
          this.showSuccess = true;
        },
        (error) => {
          this.alertErrorMessage = "Une erreur est survenue";
          console.log(error);
        }
      );
    },
    nextPart() {
      this.activeErrors = true;
      this.alertErrorMessage = "";

      if (this.errors.length > 0) {
        window.scrollTo(0, 0);
      } else {
        //TODO REMOVE THIS
        if (this.$store.state.auth.fakeLoggedIn) {
          this.$router.push("/enfants/questionnaire/partB");
        } else {
          const returnAnswers = this.answers
          returnAnswers.finishedA = true
          this.saveChildQuestionnaire(returnAnswers).then(
            () => {
              this.$router.push("/enfants/questionnaire/partB");
            },
            (error) => {
              this.alertErrorMessage = "Une erreur est survenue";
              console.log(error);
            }
          );
        }
      }
    },
  },
  components: {
    Indications,
    Header,
    TextArea,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.A1a = this.$store.state.childQuestionnaire.A1a || "";
    this.A1b = this.$store.state.childQuestionnaire.A1b || "";
    this.A1c = this.$store.state.childQuestionnaire.A1c || "";
    this.A1d = this.$store.state.childQuestionnaire.A1d || "";
    this.A11a = this.$store.state.childQuestionnaire.A11a || 0;
    this.A11aTouched =
      this.$store.state.childQuestionnaire.A11aTouched || false;
    this.A11b = this.$store.state.childQuestionnaire.A11b || 0;
    this.A11bTouched =
      this.$store.state.childQuestionnaire.A11bTouched || false;
    this.A2 = this.$store.state.childQuestionnaire.A2 || "";
    this.A3a = this.$store.state.childQuestionnaire.A3a || "";
    this.A3b = this.$store.state.childQuestionnaire.A3b || "";
    this.A3c = this.$store.state.childQuestionnaire.A3c || "";
    this.A3d = this.$store.state.childQuestionnaire.A3d || "";
    this.A3e = this.$store.state.childQuestionnaire.A3e || "";
    this.A3f = this.$store.state.childQuestionnaire.A3f || "";
    this.A3g = this.$store.state.childQuestionnaire.A3g || "";
    this.A3h = this.$store.state.childQuestionnaire.A3h || "";
    this.A3i = this.$store.state.childQuestionnaire.A3i || "";
    this.A3j = this.$store.state.childQuestionnaire.A3j || "";
    this.A3k = this.$store.state.childQuestionnaire.A3k || "";
    this.A3l = this.$store.state.childQuestionnaire.A3l || "";
    this.A4 = this.$store.state.childQuestionnaire.A4 || "";
    this.A41 = this.$store.state.childQuestionnaire.A41 || "";
  },
};
</script>