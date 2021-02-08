<template>
  <section>
    <Header
      :title="`D. Répercussions sur le fonctionnement cognitif et émotionnel`"
      :valueProgress="percentageCompletion"
    />

    <br />
    <br />
    <br />
    <v-card class="pa-md-4 mb-4">
      <v-row class="ma-5" sm="12">
        <h3>
          1. Lors de périodes de fatigue cognitive importante, avez-vous
          l’impression de « perdre » temporairement certaines de vos capacités,
          compétences ou habiletés :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="D1">
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
          2. Lors de périodes de fatigue cognitive importante, avez-vous
          constaté des changements au niveau de votre mémoire :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="D2">
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
        <v-col sm="10">
          <v-row align="center" v-for="q in questionsD3" :key="q.question">
            <v-col sm="6"><span v-html="q.question"></span></v-col>
            <v-col sm="6">
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
          4. Lors des périodes de fatigue mentale importante, avez-vous constaté
          des changements au niveau de votre attention, lors de tâches ou
          d’activités
          <strong :class="this.$store.state.settings.accentTextClass"
            >non scolaires</strong
          >
          :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="D4">
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
          5. Lors de périodes de fatigue importante, avez-vous l’impression
          d’être plus lent.e pour réaliser différentes tâches du quotidien,
          qu’elles soient scolaires ou non :
        </h3>
      </v-row>

      <v-row justify="center">
        <v-col sm="10">
          <v-radio-group v-model="D5">
            <v-radio label="Non" value="Non"></v-radio>
            <v-radio label="Oui, un peu" value="Oui, un peu"></v-radio>
            <v-radio label="Oui, beaucoup" value="Oui, beaucoup"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-divider class="ma-4"></v-divider>

      <v-row class="ma-5" sm="12">
        <h3>
          6.
          <strong :class="this.$store.state.settings.accentTextClass"
            >Lors de périodes de fatigue importante</strong
          >, avez-vous constaté des changements au niveau de votre gestion des
          émotions :
        </h3>
      </v-row>

      <v-row justify="center" v-for="q in questionsD6" :key="q.question">
        <v-col sm="10">
          <v-row align="center">
            <v-col sm="5"><span v-html="q.question"></span></v-col>
            <v-col sm="7">
              <v-slider
                v-model="q.model"
                thumb-label="always"
                min="0"
                max="100"
              >
                <template v-slot:prepend>Pas de changement</template>
                <template v-slot:append>Changement très important</template>
              </v-slider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partE')"
        >
          Enregistrer et terminer plus tard
        </v-btn>
        <v-btn
          class="btn primary bouton ma-4"
          @click="$router.push('/enfants/questionnaire/partE')"
        >
          Accéder à la partie E
        </v-btn>
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
      D6a: "",
      D6b: "",
      D6c: "",
      D6d: "",
      D6e: "",
      D6f: "",
      ratingLabelsD3: [
        "1- Cela ne me demande pas plus d’efforts que d’habitude",
        "2- Cela me demande plus d’efforts que d’habitude",
        "3- Cela me demande beaucoup plus d’efforts que d’habitude",
        "4- L’effort demandé est trop important : je ne parviens plus à le faire",
        "n/a- Cela ne me concerne pas ou je ne parviens pas à évaluer la situation"
      ],
      valuesD3: ["1", "2", "3", "4", "n/a"],
      questionsD3: [
        {
          question: "Écouter le cours tout en prenant des notes",
          model: "D3a"
        },
        {
          question: "Gérer les changements d’emploi du temps ou les imprévus",
          model: "D3b"
        },
        {
          question:
            "S’organiser dans ses affaires scolaires (avoir le matériel requis, trier ses cours, etc.)",
          model: "D3c"
        },
        {
          question: "De façon générale (du lundi matin au dimanche soir)",
          model: "D3d"
        },
        {
          question:
            "Demander de l’aide à un.e enseignant.e ou un.e élève en cas de besoin",
          model: "D3e"
        },
        {
          question:
            "Gérer les temps de pauses (interclasse, récréation, pause-déjeuner)",
          model: "D3f"
        },
        { question: "Travailler en équipe", model: "D3g" },
        { question: "Gérer l’environnement sensoriel", model: "D3h" },
        {
          question:
            "Gérer l’anxiété ou le stress liés à une situation d’examen",
          model: "D3i"
        },
        {
          question:
            "Structurer la rédaction d’un devoir ou la résolution d’un problème",
          model: "D3j"
        },
        {
          question:
            "Comprendre les consignes et attentes d’un devoir ou examen (notamment les aspects implicites)",
          model: "D3k"
        },
        {
          question:
            "S’exprimer à l’oral, spontanément ou lorsque vous êtes interrogé.e",
          model: "D3l"
        }
      ],
      questionsD6: [
        { question: "Anxiété et stress", model: "D6a" },
        { question: "Frustration", model: "D6b" },
        { question: "Irritabilité, agressivité, impulsivité", model: "D6c" },
        { question: "Estime de soi", model: "D6d" },
        { question: "Tristesse, peine", model: "D6e" },
        { question: "Motivation, joie, enthousiasme", model: "D6f" }
      ]
    };
  },
  computed: {
    relevantD11() {
      return this.D1.includes("Oui");
    },
    relevantD21() {
      return this.D2.includes("Oui");
    },
    relevantD41() {
      return this.D4.includes("Oui");
    },
    completions() {
      console.log(this.A3a);
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
        D3l: this.D3l != "",
        D4: this.D4 != "",
        // D41: this.D41 != "",
        D5: this.D5 != ""
      };
    },
    percentageCompletion() {
      const size = Object.keys(this.completions).length;
      const areOk = Object.values(this.completions).filter(a => a);
      console.log(areOk);
      return parseInt((areOk.length / size) * 100.0);
    },
    answers() {
      console.log("TODO");
      return {
        D1: this.D1
      };
    }
  },
  methods: {
    ...mapActions(["saveChildQuestionnaire"]),
    save() {
      this.saveChildQuestionnaire(this.answers);
    }
  },
  components: {
    Indications,
    Header,
    TextArea
  },
  mounted() {
    console.log("part D mounted");
    window.scrollTo(0, 0);
    this.D1 = this.$store.state.childQuestionnaire.D1 || "";
    console.log("TODO");
  }
};
</script>
