<template>
  <section>
    <Header :id="3" :valueProgress="percentageCompletion" />

    <br />
    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row  justify="center">
        <v-col cols="10" sm="10">
        <h1 class="text-center">Répercussions sur le fonctionnement cognitif et émotionnel</h1>
        </v-col>
      </v-row>

      <v-row justify="center" class="ma-10" v-if="errors.length > 0">
        <v-col sm="9" class="error-borders pa-4">
          Certaines questions ci-dessous nécessitent une réponse afin de valider
          cette partie.
        </v-col>
      </v-row>

      <v-row class="ma-5" sm="12">
        <h3>
          1.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue cognitive importante</strong
          >, avez-vous l’impression de « perdre » temporairement certaines de
          vos capacités, compétences ou
          <span style="white-space: nowrap">habiletés :</span>
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col cols="6" sm="10">
          <v-radio-group
            v-model="D1"
            v-bind:class="{ 'error-borders': errors.includes('D1') }"
          >
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui, un peu" value="Oui, un peu"></v-radio>
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantD11">
        <v-row class="ma-5" sm="12">
          <h4>1.1 Souhaitez-vous préciser :</h4>
        </v-row>
        <TextArea v-model="D11" />
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          2.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue cognitive importante</strong
          >, avez-vous constaté des changements au niveau de votre
          <span style="white-space: nowrap">mémoire :</span>
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col cols="6" sm="10">
          <v-radio-group
            v-model="D2"
            v-bind:class="{ 'error-borders': errors.includes('D2') }"
          >
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui, un peu" value="Oui, un peu"></v-radio>
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantD21">
        <v-row class="ma-5" sm="12">
          <h4>2.1 Souhaitez-vous préciser :</h4>
        </v-row>

        <TextArea v-model="D21" />
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          3.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue mentale importante</strong
          >, pouvez-vous estimer à quel point les activités ou situations
          scolaires suivantes vous demandent
          <strong :class="this.$store.state.settings.accentTextClass"
            >plus d’efforts que d’habitude</strong
          >
          :
        </h3>
      </v-row>

      <Indications>
        <ul>
          <li v-for="p in ratingLabelsD3" :key="p">{{ p }}</li>
        </ul>
      </Indications>

      <v-row justify="center">
        <v-col cols="11" sm="10">
          <v-row
            align="center"
            v-for="q in questionsD3"
            :key="q.question"
            v-bind:class="{ 'error-borders': errors.includes(q.model) }"
          >
            <v-col cols="12" md="6"><span v-html="q.question"></span></v-col>
            <v-col cols="12" md="6">
              <v-radio-group v-model="$data[q.model]" row>
                <v-radio
                  v-for="i in valuesD3"
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
          4.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors des périodes de fatigue mentale importante</strong
          >, avez-vous constaté des changements au niveau de votre attention,
          lors de tâches ou d’activités
          <strong :class="this.$store.state.settings.accentTextClass"
            >non scolaires</strong
          >
          :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col cols="6" sm="10">
          <v-radio-group
            v-model="D4"
            v-bind:class="{ 'error-borders': errors.includes('D4') }"
          >
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui, un peu" value="Oui, un peu"></v-radio>
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantD41">
        <v-row class="ma-5" sm="12">
          <h4>4.1 Souhaitez-vous préciser :</h4>
        </v-row>
        <TextArea v-model="D41" />
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          5.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue importante</strong
          >, avez-vous l’impression d’être plus lent.e pour réaliser différentes
          tâches du quotidien, qu’elles soient scolaires
          <span style="white-space: nowrap">ou non :</span>
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col cols="6" sm="10">
          <v-radio-group
            v-model="D5"
            v-bind:class="{ 'error-borders': errors.includes('D5') }"
          >
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui, un peu" value="Oui, un peu"></v-radio>
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <section v-if="relevantD51">
        <v-row class="ma-5" sm="12">
          <h4>5.1 Souhaitez-vous préciser :</h4>
        </v-row>
        <TextArea v-model="D51" />
      </section>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          6.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue importante</strong
          >, avez-vous constaté des changements au niveau de votre gestion des
          <span style="white-space: nowrap">émotions :</span>
        </h3>
      </v-row>

      <v-row justify="center" v-for="q in questionsD6" :key="q.question">
        <v-col cols="11" sm="10">
          <v-row align="center">
            <v-col cols="12" sm="5"><span v-html="q.question"></span></v-col>
            <v-col
              cols="12"
              sm="7"
              v-bind:class="{ 'error-borders': errors.includes(q.model) }"
            >
              <v-slider
                v-model="$data[q.model]"
                thumb-label="always"
                min="0"
                max="100"
                :color="
                  $data[q.model + 'Touched'] ? 'primary' : 'grey darken-1'
                "
                :track-color="
                  $data[q.model + 'Touched'] ? 'primary' : 'grey darken-1'
                "
                @change="$data[q.model + 'Touched'] = true"
              >
                <template v-slot:prepend>Pas de changement</template>
                <template v-slot:append>Changement très important</template>
              </v-slider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn class="btn primary bouton ma-4" @click="save">
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn class="btn primary bouton ma-4" @click="nextPart">
          Accéder à la partie E
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
  </section>
</template>

<script>
import Indications from "../../Indications.vue";
import Header from "../Header.vue";
import TextArea from "../TextArea.vue";
import { mapActions } from "vuex";
export default {
  name: "SurveyChildPartD",
  data() {
    return {
      activeErrors: false,
      showSuccess: false,
      alertErrorMessage: "",
      D1: "",
      D11: "",
      D2: "",
      D21: "",
      D3a: "",
      D3b: "",
      D3c: "",
      D3d: "",
      D3e: "",
      D3f: "",
      D3g: "",
      D3h: "",
      D3i: "",
      D3j: "",
      D3k: "",
      D3l: "",
      D4: "",
      D41: "",
      D5: "",
      D51: "",
      D6a: "",
      D6aTouched: false,
      D6b: 0,
      D6bTouched: false,
      D6c: 0,
      D6cTouched: false,
      D6d: 0,
      D6dTouched: false,
      D6e: 0,
      D6eTouched: false,
      D6f: 0,
      D6fTouched: false,
      ratingLabelsD3: [
        "1- Cela ne me demande pas plus d’efforts que d’habitude",
        "2- Cela me demande plus d’efforts que d’habitude",
        "3- Cela me demande beaucoup plus d’efforts que d’habitude",
        "4- L’effort demandé est trop important : je ne parviens plus à le faire",
        "n/a- Cela ne me concerne pas ou je ne parviens pas à évaluer la situation",
      ],
      valuesD3: ["1", "2", "3", "4", "n/a"],
      questionsD3: [
        {
          question: "Écouter le cours tout en prenant des notes",
          model: "D3a",
        },
        {
          question: "Gérer les changements d’emploi du temps ou les imprévus",
          model: "D3b",
        },
        {
          question:
            "S’organiser dans ses affaires scolaires (avoir le matériel requis, trier ses cours, etc.)",
          model: "D3c",
        },
        // {
        //   question: "De façon générale (du lundi matin au dimanche soir)",
        //   model: "D3d",
        // },
        {
          question:
            "Demander de l’aide à un.e enseignant.e ou un.e élève en cas de besoin",
          model: "D3d",
        },
        {
          question:
            "Gérer les temps de pauses (interclasse, récréation, pause-déjeuner)",
          model: "D3e",
        },
        { question: "Travailler en équipe", model: "D3f" },
        { question: "Gérer l’environnement sensoriel", model: "D3g" },
        {
          question:
            "Gérer l’anxiété ou le stress liés à une situation d’examen",
          model: "D3h",
        },
        {
          question:
            "Structurer la rédaction d’un devoir ou la résolution d’un problème",
          model: "D3i",
        },
        {
          question:
            "Comprendre les consignes et attentes d’un devoir ou examen (notamment les aspects implicites)",
          model: "D3j",
        },
        {
          question:
            "S’exprimer à l’oral, spontanément ou lorsque vous êtes interrogé.e",
          model: "D3k",
        },
      ],
      questionsD6: [
        { question: "Anxiété et stress", model: "D6a" },
        { question: "Frustration", model: "D6b" },
        { question: "Irritabilité, agressivité, impulsivité", model: "D6c" },
        { question: "Estime de soi", model: "D6d" },
        { question: "Tristesse, peine", model: "D6e" },
        { question: "Motivation, joie, enthousiasme", model: "D6f" },
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
    relevantD11() {
      return this.D1.includes("Oui");
    },
    relevantD21() {
      return this.D2.includes("Oui");
    },
    relevantD41() {
      return this.D4.includes("Oui");
    },
    relevantD51() {
      return this.D5.includes("Oui");
    },
    completions() {
      return {
        D1: this.D1 != "",
        // D11: this.D11 != "",
        D2: this.D2 != "",
        // D21: this.D21 != "",
        D3a: this.D3a != "",
        D3b: this.D3b != "",
        D3c: this.D3c != "",
        D3d: this.D3d != "",
        D3e: this.D3e != "",
        D3f: this.D3f != "",
        D3g: this.D3g != "",
        D3h: this.D3h != "",
        D3i: this.D3i != "",
        D3j: this.D3j != "",
        D3k: this.D3k != "",
        // D3l: this.D3l != "",
        D4: this.D4 != "",
        // D41: this.D41 != "",
        D5: this.D5 != "",
        D6a: this.D6aTouched,
        D6b: this.D6bTouched,
        D6c: this.D6cTouched,
        D6d: this.D6dTouched,
        D6e: this.D6eTouched,
        D6f: this.D6fTouched,
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter((a) => a);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      return {
        D1: this.D1,
        D11: this.D11,
        D2: this.D2,
        D21: this.D21,
        D3a: this.D3a,
        D3b: this.D3b,
        D3c: this.D3c,
        D3d: this.D3d,
        D3e: this.D3e,
        D3f: this.D3f,
        D3g: this.D3g,
        D3h: this.D3h,
        D3i: this.D3i,
        D3j: this.D3j,
        D3k: this.D3k,
        // D3l: this.D3l,
        D4: this.D4,
        D41: this.D41,
        D5: this.D5,
        D51: this.D51,
        D6a: this.D6a,
        D6aTouched: this.D6aTouched,
        D6b: this.D6b,
        D6bTouched: this.D6bTouched,
        D6c: this.D6c,
        D6cTouched: this.D6cTouched,
        D6d: this.D6d,
        D6dTouched: this.D6dTouched,
        D6e: this.D6e,
        D6eTouched: this.D6eTouched,
        D6f: this.D6f,
        D6fTouched: this.D6fTouched,
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
          this.$router.push("/enfants/questionnaire/partE");
        } else {
          const returnAnswers = this.answers
          returnAnswers.finishedD = true
          this.saveChildQuestionnaire(returnAnswers).then(
            () => {
              this.$router.push("/enfants/questionnaire/partE");
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
    window.scrollTo(0, 0, "smooth");
    this.D1 = this.$store.state.childQuestionnaire.D1 || "";
    this.D11 = this.$store.state.childQuestionnaire.D11 || "";
    this.D2 = this.$store.state.childQuestionnaire.D2 || "";
    this.D21 = this.$store.state.childQuestionnaire.D21 || "";
    this.D3a = this.$store.state.childQuestionnaire.D3a || "";
    this.D3b = this.$store.state.childQuestionnaire.D3b || "";
    this.D3c = this.$store.state.childQuestionnaire.D3c || "";
    this.D3d = this.$store.state.childQuestionnaire.D3d || "";
    this.D3e = this.$store.state.childQuestionnaire.D3e || "";
    this.D3f = this.$store.state.childQuestionnaire.D3f || "";
    this.D3g = this.$store.state.childQuestionnaire.D3g || "";
    this.D3h = this.$store.state.childQuestionnaire.D3h || "";
    this.D3i = this.$store.state.childQuestionnaire.D3i || "";
    this.D3j = this.$store.state.childQuestionnaire.D3j || "";
    this.D3k = this.$store.state.childQuestionnaire.D3k || "";
    // this.D3l = this.$store.state.childQuestionnaire.D3l || "";
    this.D4 = this.$store.state.childQuestionnaire.D4 || "";
    this.D41 = this.$store.state.childQuestionnaire.D41 || "";
    this.D5 = this.$store.state.childQuestionnaire.D5 || "";
    this.D51 = this.$store.state.childQuestionnaire.D51 || "";
    this.D6a = this.$store.state.childQuestionnaire.D6a || 0;
    this.D6aTouched = this.$store.state.childQuestionnaire.D6aTouched || false;
    this.D6b = this.$store.state.childQuestionnaire.D6b || 0;
    this.D6bTouched = this.$store.state.childQuestionnaire.D6bTouched || false;
    this.D6c = this.$store.state.childQuestionnaire.D6c || 0;
    this.D6cTouched = this.$store.state.childQuestionnaire.D6cTouched || false;
    this.D6d = this.$store.state.childQuestionnaire.D6d || 0;
    this.D6dTouched = this.$store.state.childQuestionnaire.D6dTouched || false;
    this.D6e = this.$store.state.childQuestionnaire.D6e || 0;
    this.D6eTouched = this.$store.state.childQuestionnaire.D6eTouched || false;
    this.D6f = this.$store.state.childQuestionnaire.D6f || 0;
    this.D6fTouched = this.$store.state.childQuestionnaire.D6fTouched || false;
  },
};
</script>
